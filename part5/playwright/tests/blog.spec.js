const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  const title = 'La NASA y SpaceX han dado más detalles acerca del USDV, la nave que terminará con la Estación Espacial Internacional'
  const author = '@Wicho'
  const url = 'https://www.microsiervos.com/archivo/espacio/nasa-spacex-detalles-nave-terminara-estacion-espacial.html'

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
    
    test('a user who added the blog can delete it', async ({ page }) => {
      await createBlog(page, title, author, url)

      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', dialog => {
        console.log(dialog.message());
        dialog.accept();
      })

      await page.getByRole('button', { name: 'remove' }).click('click')      
      await page.waitForTimeout(1000)

      await expect(page.getByText(`${title} ${author}`)).toBeHidden()
    })
    
    test('a user who did not add the blog cannot delete it', async ({ page, request }) => {
      await createBlog(page, title, author, url)

      await page.getByRole('button', { name: 'logout' }).click()

      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'test user 2',
          username: 'testuser2',
          password: 'secret123'
        }
      })

      await loginWith(page, 'testuser2', 'secret123')

      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('button', { name: 'remove' })).toBeHidden()
    })  

    test('the blogs are arranged in the order according to the likes', async ({ page }) => {
      const blogs = [
        { title, author, url },
        { title: 'Una actualización fallida del antivirus CrowdStrike para Windows causa el caos informático en todo el mundo', author: '@Wicho', url: 'https://www.microsiervos.com/archivo/ordenadores/crowdstrike-windows-caos-informatico.html' }, 
        { title: 'Una subida a la cima del monte Everest en 45 minutos con un dron: del primer campamento base a más allá de los 8.849 metros de altitud', author: '@Alvy', url: 'https://www.microsiervos.com/archivo/mundoreal/subida-cima-monte-everest-en-45-minutos-con-un-dron.html' }
      ]
      await createBlog(page, blogs[0].title, blogs[0].author, blogs[0].url)
      await createBlog(page, blogs[1].title, blogs[1].author, blogs[1].url)
      await createBlog(page, blogs[2].title, blogs[2].author, blogs[2].url)

      for (let i = 0; i < blogs.length; i++) {
        await page.getByTestId('bloglist')
          .locator('div')
          //.filter({ hasText: new RegExp(`${blogs[i].title} ${blogs[i].author}`, 'g') })
          .filter({ hasText: `${blogs[i].title} ${blogs[i].author}` })
          .getByRole('button', { name: 'view' }).click()

        for (let j = 1; j <= i + 1 ; j++) {
          await page.getByTestId('bloglist')
            .locator('div')
            //.filter({ hasText: new RegExp(`${blogs[i].title} ${blogs[i].author}`, 'g') })
            .filter({ hasText: `${blogs[i].title} ${blogs[i].author}` })
            .getByRole('button', { name: 'like' }).click()

          await page.getByTestId('bloglist')
            .locator('div')
            //.filter({ hasText: new RegExp(`${blogs[i].title} ${blogs[i].author}`, 'g') })
            .filter({ hasText: `${blogs[i].title} ${blogs[i].author}` })
            .getByText(j).waitFor()
        }
      }

      await expect(page.locator('div > span.likes')).toHaveText(['likes: 3', 'likes: 2', 'likes: 1']);
    })
  })
})