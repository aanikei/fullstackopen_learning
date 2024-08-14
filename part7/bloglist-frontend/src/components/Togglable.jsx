import { useState, forwardRef, useImperativeHandle } from 'react'

import Button from '@mui/material/Button'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" sx={{ mt: 2 }} type="submit" disableElevation onClick={toggleVisibility}>
          {props.buttonOpen}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" type="submit" disableElevation onClick={toggleVisibility}>
          {props.buttonClose}
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
