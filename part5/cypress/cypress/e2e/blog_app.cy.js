describe('Blog app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', () => {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
})