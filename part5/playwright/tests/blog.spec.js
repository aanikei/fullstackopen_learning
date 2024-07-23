const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
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
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('secret123')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByLabel('username')).toBeHidden()
      await expect(page.getByLabel('password')).toBeHidden()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
      await expect(page.getByText('test user logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('secret12')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('secret123')
      await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      const title = 'History of the Peloponnesian War'
      const author = 'Thucydides'

      await page.getByRole('button', { name: 'New Blog' }).click()
      await page.getByLabel('title').fill(title)
      await page.getByLabel('author').fill(author)
      await page.getByLabel('url').fill('https://www.gutenberg.org/files/7142/7142-h/7142-h.htm')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText(`a new blog ${title} by ${author} added`)).toBeVisible()
      await expect(page.getByText(`${title} ${author}`).and(page.locator('div:visible'))).toBeVisible()
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })
  })
})