import { expect, test } from "@playwright/test";

import { routes } from "../api/routes";
import { users } from "../fixtures/users";
import { LoginPage } from "../pages/login.page";

test("invalid login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const responsePromise = page.waitForResponse(routes.auth.login);

  await loginPage.goto();
  await loginPage.login(users.invalid.email, users.invalid.password);

  const response = await responsePromise;
  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body.message).toContain(
    "No account with this email has been registered.",
  );

  await expect(loginPage.alert).toBeVisible();
  await expect(loginPage.alert).toContainText(
    "No account with this email has been registered.",
  );
});

test("valid login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const responsePromise = page.waitForResponse(routes.auth.login);

  await loginPage.goto();
  await loginPage.login(users.admin.email, users.admin.password);

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.message).toContain("Successfully login user");

  await expect(loginPage.alert).toBeHidden();
  await expect(loginPage.submitButton).not.toBeVisible();
});
