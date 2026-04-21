import {expect, test} from '@playwright/test';

const invalidCredentials = {
  email: 'false@demo.com',
  password: 'false123',
};

const validCredentials = {
  email: 'admin@demo.com',
  password: 'admin123',
};

const routes = {
  login: '**/api/login*',
}


test('invalid login', async ({page}) => {
  const requestPromise = page.waitForResponse(routes.login);
  await page.goto('/');

  await page.getByRole('textbox', {name: '* Email'}).fill(invalidCredentials.email);
  await page.getByRole('textbox', {name: '* Password'}).fill(invalidCredentials.password);

  await page.getByRole('button', {name: 'Log In'}).click();

  const req = await requestPromise;
  expect(req.status()).toBe(404);
  const body = await req.json();
  expect(body.message).toContain('No account with this email has been registered.');

  const alert = page.getByRole('alert');

  await expect(alert).toBeVisible();
  await expect(alert).toContainText('No account with this email has been registered.');

});

test('valid login', async ({page}) => {
  const requestPromise = page.waitForResponse(routes.login);

  await page.goto('/');

  await page.getByRole('textbox', {name: '* Email'}).fill(validCredentials.email);
  await page.getByRole('textbox', {name: '* Password'}).fill(validCredentials.password);

  await page.getByRole('button', {name: 'Log In'}).click();

  const req = await requestPromise;
  expect(req.status()).toBe(200);
  const body = await req.json();
  expect(body.message).toContain('Successfully login user');

  const alert = page.getByRole('alert');

  await expect(alert).toBeHidden();
  await expect(page.getByRole('button', {name: 'Log In'})).not.toBeVisible();
})
