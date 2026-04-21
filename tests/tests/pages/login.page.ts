import type {Page} from '@playwright/test';

export class LoginPage {
  readonly emailInput;
  readonly passwordInput;
  readonly submitButton;
  readonly alert;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByRole('textbox', {name: '* Email'});
    this.passwordInput = page.getByRole('textbox', {name: '* Password'});
    this.submitButton = page.getByRole('button', {name: 'Log In'});
    this.alert = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
