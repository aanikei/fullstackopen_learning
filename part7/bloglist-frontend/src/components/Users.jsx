import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  const data = []

  const addBlogs = (value, title) => {
    for (let i in data) {
      if (data[i].name === value) {
        data[i].blogs += 1
        data[i].titles.push(title)
        break
      }
    }
  }

  if (blogs) {
    for (let i = 0; i < blogs.length; i++) {
      //console.log('blogs[i]', blogs[i].user)
      if (blogs[i].user && !data.some(obj => obj.name === blogs[i].user.name)) {
        data.push({ name: blogs[i].user.name,
          id: i, blogs: 1,
          titles: [blogs[i].title],
          userId: blogs[i].user.id
        })
      } else if (blogs[i].user === undefined && !data.some(obj => obj.name === 'unknown')) {
        data.push({ name: 'unknown', id: i, blogs: 1, titles: [blogs[i].title], userId: null })
      } else if (blogs[i].user && data.some(obj => obj.name === blogs[i].user.name)) {
        addBlogs(blogs[i].user.name, blogs[i].title)
      } else if (blogs[i].user === undefined && data.some(obj => obj.name === 'unknown')) {
        addBlogs('unknown', blogs[i].title)
      }
    }
  }

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{ user.userId === null ? user.name : <Link to={`/users/${user.userId}`}>{user.name}</Link>}</td>
              <td>{user.blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users