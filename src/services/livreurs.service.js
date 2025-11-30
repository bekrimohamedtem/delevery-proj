// TODO: Utiliser api.js quand les APIs seront prêtes
export const livreursService = {
  getAll: () => Promise.resolve({ data: [] }),
  getById: (id) => Promise.resolve({ data: null }),
  create: (data) => Promise.resolve({ data }),
  update: (id, data) => Promise.resolve({ data }),
  delete: (id) => Promise.resolve({ data: { id } }),
};


