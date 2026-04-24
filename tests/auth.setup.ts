import { expect, test as setup } from "@playwright/test";
import { routes } from "./api/routes";
import { users } from "./fixtures/users";
import fs from "node:fs";
import path from "node:path";

const authFile = path.join(__dirname, ".auth", "user.json");

setup("authenticate", async ({ page, request }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  const response = await request.post(routes.auth.loginAPI, {
    form: {
      email: users.admin.email,
      password: users.admin.password,
      remember: true,
    },
  });
  await expect(response).toBeOK();

  const body = await response.json();
  const authState = {
    current: body.result,
    isLoggedIn: true,
    isLoading: false,
    isSuccess: true,
  };

  await page.goto("/");
  await page.evaluate((state) => {
    window.localStorage.setItem("auth", JSON.stringify(state));
    window.localStorage.removeItem("isLogout");
  }, authState);

  await page.context().storageState({ path: authFile });
});
