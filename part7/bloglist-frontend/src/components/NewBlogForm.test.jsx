import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  test('correct work', async () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://abc.xyz',
      likes: 0,
      id: '667d801e70ca74add7a8724d',
      user: '667d801e70ca74add7a8724c',
    }

    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<NewBlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByTestId('input_title')
    const inputAuthor = screen.getByTestId('input_author')
    const inputUrl = screen.getByTestId('input_url')
    const createButton = screen.getByText('create')

    await user.type(inputTitle, blog.title)
    await user.type(inputAuthor, blog.author)
    await user.type(inputUrl, blog.url)
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
  })
})
