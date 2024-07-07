const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.success ? "success" : "error"}>
      {message.message}
    </div>
  )
}

export default Notification
