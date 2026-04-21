export const users = {
  admin: {
    email: process.env.E2E_ADMIN_EMAIL ?? 'admin@demo.com',
    password: process.env.E2E_ADMIN_PASSWORD ?? 'admin123',
  },
  invalid: {
    email: 'false@demo.com',
    password: 'false123',
  },
};
