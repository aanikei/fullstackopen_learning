const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  const title = 'History of the Peloponnesian War'
  const author = 'Thucydides'
  const url = 'https://www.gutenberg.org/files/7142/7142-h/7142-h.htm'

  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'test user',
        username: 'testuser',
        password: 'secret123'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'secret123')

      await expect(page.getByLabel('username')).toBeHidden()
      await expect(page.getByLabel('password')).toBeHidden()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
      await expect(page.getByText('test user logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'secret12')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'secret123')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, title, author, url)

      await expect(page.getByText(`a new blog ${title} by ${author} added`)).toBeVisible()
      await expect(page.getByText(`${title} ${author}`).and(page.locator('div:visible'))).toBeVisible()
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, title, author, url)

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes: 0')).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })    
  })
})