import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  let { id } = useParams()

  const data = []
  let author = null

  if (blogs) {
    console.log(blogs)
    blogs.forEach((e) => {
      console.log('blog', e)
      if (e.user && e.user.id === id) {
        data.push({ title: e.title, id: e.id })
        if (!author) {
          author = e.user.name
        }
      }
    })
  }

  return (
    <div>
      <h2>{author}</h2>
      <h3>added blogs</h3>
      <ul>
        {data.map((title) => (
          <li key={title.id}>
            {title.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User