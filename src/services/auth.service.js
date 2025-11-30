// TODO: Utiliser api.js quand les APIs seront prêtes
export const authService = {
  login: (email, password) => Promise.resolve({ data: { token: "mock-token" } }),
  logout: () => Promise.resolve(),
  forgotPassword: (email) => Promise.resolve({ data: { message: "Email sent" } }),
};


