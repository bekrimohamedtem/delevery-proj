// TODO: Utiliser api.js quand les APIs seront prêtes
// import api from "./api";

// Pour le moment, on utilise des données locales (useState)
// Les méthodes retournent des promesses mockées pour garder la compatibilité
export const colisService = {
  // Ces méthodes seront remplacées par de vrais appels API plus tard
  getAll: () => Promise.resolve({ data: [] }),
  getById: (id) => Promise.resolve({ data: null }),
  create: (data) => Promise.resolve({ data }),
  update: (id, data) => Promise.resolve({ data }),
  delete: (id) => Promise.resolve({ data: { id } }),
  filter: (filters) => Promise.resolve({ data: [] }),
};

