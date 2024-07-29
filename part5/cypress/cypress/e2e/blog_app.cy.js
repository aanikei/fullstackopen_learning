describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'test user',
      username: 'testuser',
      password: 'secret123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    
    cy.visit('http://localhost:5173/')
  })

  it('Login form is shown', () => {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('input[name="username"]').type('testuser')
      cy.get('input[name="password"]').type('secret123')
      cy.get('button').click()

      cy.contains('New Blog')
    })

    it('fails with wrong credentials', () => {
      cy.get('input[name="username"]').type('testuser')
      cy.get('input[name="password"]').type('secret12')
      cy.get('button').click()

      cy.contains('wrong username or password')
      cy.get('div.error').should('have.css', 'border-color', 'rgb(235, 4, 4)')
    })
  })

  describe('When logged in', () => {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'secret123' })
    })

    it('A blog can be created', () => {
      const title = 'La NASA y SpaceX han dado más detalles acerca del USDV, la nave que terminará con la Estación Espacial Internacional'
      const author = '@Wicho'
      const url = 'https://www.microsiervos.com/archivo/espacio/nasa-spacex-detalles-nave-terminara-estacion-espacial.html'

      cy.createBlog({ title, author, url })
    })
  })
})
