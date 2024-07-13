import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

    //screen.debug()

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()

    const likes = screen.queryByText(`likes: ${blog.likes}`)
    expect(likes).toBeNull()

    const url = screen.queryByText(`${blog.url}`)
    expect(url).toBeNull()
  })

  test('full view state', async () => {
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

    const mockHandler = vi.fn()

    render(<Blog
      key={blog.id}
      blog={blog}
      //addLikes={addLikes}
      //removeBlog={removeBlog}
      user={user}
    />)

    const loggedUser = userEvent.setup()
    const button = screen.getByText('view')
    await loggedUser.click(button)

    //screen.debug()

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()

    const likes = screen.queryByText(`likes: ${blog.likes}`)
    expect(likes).toBeDefined()

    const url = screen.queryByText(`${blog.url}`)
    expect(url).toBeDefined()
  })

  test('like button functionality', async () => {
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

    const mockHandler = vi.fn()

    render(<Blog
      key={blog.id}
      blog={blog}
      addLikes={mockHandler}
      //removeBlog={removeBlog}
      user={user}
    />)

    const loggedUser = userEvent.setup()
    const buttonView = screen.getByText('view')
    await loggedUser.click(buttonView)

    const buttonLike = screen.getByText('like')
    await loggedUser.click(buttonLike)
    await loggedUser.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})