// referência: Utilizei apenas a parte de regex do Projeto da Juliette(aluna da turma 5),
//pois o regex que eu fiz não passou.
db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won (?:1(?:[0-9] Oscars| Oscar)|[2-9] Oscars)/ },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
