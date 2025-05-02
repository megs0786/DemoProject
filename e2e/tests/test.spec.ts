import { test, expect, request } from 'playwright/test';
import { loginDetails } from './sharedlogindetails';

let apiContext: any;
test.beforeAll(async () => {
  apiContext = await request.newContext();
});

test('login page title', async ({ page }) => {
  await page.goto('http://localhost:4209/login');
  await expect(page).toHaveTitle(/DemoProject/);
});

test('Sign up redirect to registartion page', async ({ page, request }) => {
  await page.goto('http://localhost:4209/login');
  await page.getByText('Sign Up').click();
  await page.goto('http://localhost:4209/registration');
  await page.locator('#name').fill('testing');
  await page.locator('#email').fill('testing@gmail.com');
  await page.locator('#password').fill('testing');
  await page.getByRole('button').click();
  const body = {
    fullname: 'testing',
    emailId: 'testing@gmail.com',
    password: 'testing',
  };
  const response = await request.post(
    'https://projectapi.gerasim.in/api/UserApp/CreateNewUser',
    { data: body },
  );
  expect(response.status()).toBe(200);
  await page.goto('http://localhost:4209/login');
});

test('login has field with email and password', async ({ page }) => {
  await page.goto('http://localhost:4209/login');
  await page.locator('#email').fill('test@gmail.com');
  await page.locator('#password').fill('testing');
  await page.getByRole('button').click();
});
test('login button call post API', async ({ page, request, context }) => {
  await page.goto('http://localhost:4209/login');
  await page.locator('#email').fill('test@gmail.com');
  await page.locator('#password').fill('testing');
  await page.getByRole('button').click();
  const body = {
    EmailId: 'test11@dummy.com',
    Password: '1234',
  };
  // no need of above logic as we are directly sending the payload in API
  const userDetails = new loginDetails(apiContext);
  const userDet = await userDetails.getuserDetails();
  await page.addInitScript((val) => {
    return window.localStorage.setItem('userDetails', JSON.stringify(val));
  }, userDet);
  await userDetails.getUsers();
  await page.goto('http://localhost:4209/home');
  await page.locator('select').selectOption('admin');
  await page.goto('http://localhost:4209/userdetails');
  await page.locator('table tr td').last().textContent();

  const userRole = (await page.locator('#user-role').innerText()).toUpperCase();
  expect(userRole).toContain('ADMIN - ROLE');
});
