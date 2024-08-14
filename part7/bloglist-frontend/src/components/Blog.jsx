import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'

import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

const Blog = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const addLikes = (blogToLike) => {
    dispatch(likeBlog(blogToLike))
  }

  const blogs = useSelector(state => {
    return state.blogs
  })

  let { id } = useParams()

  const addComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(id, comment))
    setComment('')
  }

  let blog = []

  if (blogs && blogs.length > 0) {
    blog = blogs.find(i => i.id === id)
  } else {
    return null
  }

  return (
    <div>
      <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {blog.title}
        </Typography>
        <Link variant="body1" display="block" gutterBottom href={blog.url}>
          {blog.url}
        </Link>
        <Typography variant="body1" display="block" gutterBottom>
          {blog.likes} likes
          <Button variant="contained" size="small" onClick={() => addLikes(blog)} sx={{ ml: 1 }}>
          like
          </Button>
        </Typography>
        <Typography variant="body2" color="textSecondary">
        added by {blog.user === undefined ? 'unknown' : blog.user.name}
        </Typography>
      </Box>

      <Typography variant="h5" sx={{ mb: 2, textAlign: 'left' }}>
        comments
      </Typography>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 0.3, width: '25ch' },
          '& .MuiButton-root': { m: 0.3 },
          border: '1px solid #ccc',
          padding: 2,
          borderRadius: 1,
        }}
        component="form"
        noValidate
      >
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              label="comment"
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              size="small"
              autoComplete="on"
              data-testid="input_title"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" disableElevation onClick={addComment}>
            create
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <nav aria-label="blogs">
          <List>
            {blog.comments.map((comment, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText primary={comment} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </div>
  )
}

export default Blog
