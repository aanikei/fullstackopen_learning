import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

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
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <nav aria-label="blogs">
          <List>
            {data.map((title) => (
              <ListItem key={title.id} disablePadding>
                <ListItemButton>
                  <ListItemText primary={title.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </div>
  )
}

export default User