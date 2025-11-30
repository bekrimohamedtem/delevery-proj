// TODO: Utiliser api.js quand les APIs seront prêtes
export const stockService = {
  getAll: () => Promise.resolve({ data: [] }),
  getMovements: () => Promise.resolve({ data: [] }),
  create: (data) => Promise.resolve({ data }),
  update: (id, data) => Promise.resolve({ data }),
  delete: (id) => Promise.resolve({ data: { id } }),
};


