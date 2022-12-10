describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { 
      name: 'testaaja',
      username: 'testi',
      password: 'testi'
    }
    const user2 = { 
      name: 'testaaja2',
      username: 'testi2',
      password: 'testi2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('login to app')
    //cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testi')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()

      cy.contains('testaaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testi')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testi', password: 'testi' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('testiotsikko')
      cy.get('#author').type('testikirjoittaja')
      cy.get('#url').type('www.testi.fi')
      cy.get('#create').click()
      cy.contains('testiotsikko testikirjoittaja')
      cy.reload()
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testiotsikko')
      cy.get('#author').type('testikirjoittaja')
      cy.get('#url').type('www.testi.fi')
      cy.get('#create').click()
      cy.reload()
      cy.get('#viewButton').click()
      cy.contains('likes 0')
      cy.get('#likeButton').click()
      cy.wait(500)
      cy.contains('likes 1')
      cy.get('#likeButton').click()
      cy.wait(500)
      cy.contains('likes 2')
    })

    it('A blog can only be deleted by the user that made it', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testiotsikko')
      cy.get('#author').type('testikirjoittaja')
      cy.get('#url').type('www.testi.fi')
      cy.get('#create').click()
      cy.reload()
      cy.get('#viewButton').click()
      cy.get('#removeButton').should('exist')
      cy.contains('logout').click()
      cy.reload()
      cy.get('#username').type('testi2')
      cy.get('#password').type('testi2')
      cy.get('#login-button').click()
      cy.get('#viewButton').click()
      cy.get('#removeButton').should('not.be.visible')
    })

    it('Blogs are arranged by likes with the most liked blog at the top', function() {
      cy.createBlog({ title: 'neutraali', author: 'neutraali', url: 'neutraali.fi' })
      cy.createBlog({ title: 'vähiten liketetty', author: 'huonoin', url: 'huonoin.fi' })
      cy.createBlog({ title: 'eniten liketetty', author: 'paras', url: 'paras.fi' })

      cy.contains('neutraali').parent().find('button').contains('view').click()
      for (let i = 0; i < 6; i++) {
        cy.contains('neutraali').parent().find('button').contains('like').click()
        cy.wait(250)
      }
      cy.contains('eniten').parent().find('button').contains('view').click()
      for (let i = 0; i < 11; i++) {
        cy.contains('eniten').parent().find('button').contains('like').click()
        cy.wait(250)
      }
      cy.contains('vähiten').parent().find('button').contains('view').click()
      cy.contains('vähiten').parent().find('button').contains('like').click()
      cy.reload()
      cy.get('.blog').eq(0).should('contain', 'eniten liketetty paras')
      cy.get('.blog').eq(1).should('contain', 'neutraali neutraali')
      cy.get('.blog').eq(2).should('contain', 'vähiten')
    })
  })
})