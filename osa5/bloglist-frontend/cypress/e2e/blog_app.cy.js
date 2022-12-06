describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { 
      name: 'testaaja',
      username: 'testi',
      password: 'testi'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
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
      cy.get('#username').type('testi')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('testiotsikko')
      cy.get('#author').type('testikirjoittaja')
      cy.get('#url').type('www.testi.fi')
      cy.get('#create').click()
      cy.contains('testiotsikko testikirjoittaja')
    })
  })
})