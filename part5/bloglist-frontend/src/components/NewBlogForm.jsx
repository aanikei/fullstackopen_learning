const NewBlogForm = ({title, handleTitleChange,
                      author, handleAuthorChange,
                      url, handleUrlChange,
                      handleBlogCreate}) => (
  <div>
  <h2>Create New</h2>
  <form>
    <div>
      <div>
        title: 
          <input
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author: 
          <input
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url: 
          <input
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button onClick={handleBlogCreate} type="submit">create</button>
    </div>   
  </form>
  </div>
)

export default NewBlogForm
