import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

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
      <Typography variant="h5" component="h3">
        Users
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.userId === null ? user.name : <Link to={`/users/${user.userId}`}>{user.name}</Link>}
                </TableCell>
                <TableCell>{user.blogs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users