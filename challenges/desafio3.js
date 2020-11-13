// ##### Desafio 3

// {SORT}
// e nota IMDB de forma decrescente e o título por ordem alfabética (nesta ordem de desempate).

// O resultado da sua query deve ter o seguinte formato:

// ```javascript
// { "titulo" : "McFarland, USA", "avaliado" : "PG", "notaIMDB" : 7.5,
//  "votosIMDB" : 14091, "ano" : 2015 }
// // Demais documentos
// ```
db.movies.aggregate([
  {
    $match: {
      genres: { $nin: ["Crime", "Horror"] },
      "imdb.rating": { $gte: 7 },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  {
    $sort: {
      ano: -1,
      notaIMDB: -1,
      titulo: 1,
    },
  },
]);
