import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Todo from '../Todos/Todo'

describe('<Todo />', () => {
  it('a single todo is rendered', () => {
    const onClickComplete = jest.fn()
    const onClickDelete = jest.fn()
    const todo = {
      text: 'testi',
      done: false
    }

    render(<Todo onClickComplete={onClickComplete} onClickDelete={onClickDelete} todo={todo} />)

    expect(screen.getByText('testi')).toBeVisible()
    expect(screen.getByText('This todo is not done')).toBeVisible()
  })
})