import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const NewBlogForm = ({ user, newBlogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleBlogCreate = (event) => {
    event.preventDefault()

    dispatch(createBlog({ title, author, url, likes: 0, user }))

    dispatch(setNotification({
      message: `a new blog ${title} by ${author} added`,
      success: true,
    }))

    setTitle('')
    setAuthor('')
    setUrl('')

    newBlogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex'
        }}
      >
        <Box
          sx={{
            '& .MuiTextField-root': { m: 0.3, width: '25ch' },
            '& .MuiButton-root': { m: 0.3 },
            border: '1px solid #ccc',
            padding: 2,
            borderRadius: 1
          }}
          component="form"
          noValidate
        >
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'left' }}>
            Create New
          </Typography>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <TextField
                label="title"
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                size="small"
                autoComplete="on"
                data-testid="input_title"
              />
            </Grid>
            <Grid item>
              <TextField
                label="author"
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
                size="small"
                autoComplete="on"
                data-testid="input_author"
              />
            </Grid>
            <Grid item>
              <TextField
                label="url"
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
                size="small"
                autoComplete="on"
                data-testid="input_url"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit" disableElevation onClick={handleBlogCreate}>
              create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default NewBlogForm
