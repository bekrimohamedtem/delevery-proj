// TODO: Utiliser api.js quand les APIs seront prêtes
export const commercialService = {
  getOffres: () => Promise.resolve({ data: [] }),
  getFactures: () => Promise.resolve({ data: [] }),
  createOffre: (data) => Promise.resolve({ data }),
  updateOffre: (id, data) => Promise.resolve({ data }),
  deleteOffre: (id) => Promise.resolve({ data: { id } }),
};


