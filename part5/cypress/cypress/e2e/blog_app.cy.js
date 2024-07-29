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
    const title = 'La NASA y SpaceX han dado más detalles acerca del USDV, la nave que terminará con la Estación Espacial Internacional'
    const author = '@Wicho'
    const url = 'https://www.microsiervos.com/archivo/espacio/nasa-spacex-detalles-nave-terminara-estacion-espacial.html'

    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'secret123' })
    })

    it('A blog can be created', () => {
      cy.createBlog({ title, author, url })
    })

    it('A blog can be liked', () => {
      cy.createBlog({ title, author, url })
      cy.get('button').contains('view').click()
      cy.get('button').contains('like').click()
      cy.contains('likes: 1')
    })

    it('A user who added the blog can delete it', () => {
      cy.createBlog({ title, author, url })
      cy.get('button').contains('view').click()
      cy.get('button').contains('remove').click()
      cy.contains(`${title} ${author}`).should('not.exist')
    })

    it('A user who did not add the blog cannot delete it', () => {
      cy.createBlog({ title, author, url })
      cy.get('button').contains('logout').click()

      const user = {
        name: 'test user 2',
        username: 'testuser2',
        password: 'secret123'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.login({ username: 'testuser2', password: 'secret123' })

      cy.get('button').contains('view').click()
      cy.get('button').contains('remove').should('not.exist')
    })
      
    it('The blogs are arranged in the order according to the likes', () => {
      const blogs = [
        { title, author, url },
        { title: 'Una actualización fallida del antivirus CrowdStrike para Windows causa el caos informático en todo el mundo', author: '@Wicho', url: 'https://www.microsiervos.com/archivo/ordenadores/crowdstrike-windows-caos-informatico.html' }, 
        { title: 'Una subida a la cima del monte Everest en 45 minutos con un dron: del primer campamento base a más allá de los 8.849 metros de altitud', author: '@Alvy', url: 'https://www.microsiervos.com/archivo/mundoreal/subida-cima-monte-everest-en-45-minutos-con-un-dron.html' }
      ]

      for(let i = 0; i < 3; i++) {
        cy.createBlog({ title: blogs[i].title, author: blogs[i].author, url: blogs[i].url })
        cy.contains(`${blogs[i].title} ${blogs[i].author}`)
          .children('button')
          .contains('view')
          .click()

        for(let n = 0; n < i + 1; n++) {
          cy.contains(`${blogs[i].title} ${blogs[i].author}`)
            .parent()
            .find('button')
            .contains('like')
            .click()

          cy.contains(`${blogs[i].title} ${blogs[i].author}`)
            .parent()
            .contains(`likes: ${n + 1}`)
        }
      }
      
      cy.get('[data-testid="bloglist"]').children().eq(0).should('contain', `${blogs[2].title} ${blogs[2].author}`)
      cy.get('[data-testid="bloglist"]').children().eq(1).should('contain', `${blogs[1].title} ${blogs[1].author}`)
      cy.get('[data-testid="bloglist"]').children().eq(2).should('contain', `${blogs[0].title} ${blogs[0].author}`)
    })
  })
})
