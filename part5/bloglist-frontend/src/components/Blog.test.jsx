import { render, screen } from '@testing-library/react'
import Blog from './Blog'
describe('<Blog />', () => {
  test('initial state', () => {
    const blog = {
      'title': 'Test Blog',
      'author': 'Test Author',
      'url': 'https://abc.xyz',
      'likes': 0,
      'id': '667d801e70ca74add7a8724d',
      'user': '667d801e70ca74add7a8724c'
    }

    const user = {
      'username': 'testuser23',
      'name': 'User 23',
      'id': '667d801e70ca74add7a8724c'
    }

    render(<Blog
      key={blog.id}
      blog={blog}
      //addLikes={addLikes}
      //removeBlog={removeBlog}
      user={user}
    />)

    screen.debug()

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()

    const likes = screen.queryByText(`likes: ${blog.likes}`)
    expect(likes).toBeNull()

    const url = screen.queryByText(`${blog.url}`)
    expect(url).toBeNull()
  })
})