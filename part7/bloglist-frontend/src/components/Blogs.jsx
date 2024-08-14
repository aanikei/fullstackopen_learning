import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

const Blogs = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="blogs">
        <List>
          {blogs.map((blog) => (
            <ListItem key={blog.id} disablePadding>
              <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
                <ListItemText primary={blog.title + ' ' + blog.author} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  )
}

export default Blogs