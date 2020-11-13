// Desafio 1

// {MATCH}
// imdb.rating deve ser ao menos 7;
// genres não deve conter Crime ou Horror;
// rated deve ser igual a PG ou G;
// languages contém English e Spanish.
// Utilizando a coleção movies, faça um pipeline que retorne todos esses filmes.
db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      languages: { $all: ["English", "Spanish"] },
      rated: { $in: ["PG", "G"] },
    },
  },
]);
// Sua query deve retornar 41 documentos.
