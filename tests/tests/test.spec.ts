import {expect, test} from '@playwright/test';

const invalidCredentials = {
  email: 'false@demo.com',
  password: 'false123',
};

const validCredentials = {
  email: 'admin@demo.com',
  password: 'admin123',
};

test('invalid login', async ({page}) => {
  await page.goto('/');

  await page.getByRole('textbox', {name: '* Email'}).fill(invalidCredentials.email);
  await page.getByRole('textbox', {name: '* Password'}).fill(invalidCredentials.password);

  await page.getByRole('button', {name: 'Log In'}).click();

  const alert = page.getByRole('alert');

  await expect(alert).toBeVisible();
  await expect(alert).toContainText('No account with this email has been registered.');

});