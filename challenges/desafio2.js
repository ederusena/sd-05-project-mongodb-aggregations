db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      languages: { $all: ["English", "Spanish"] },
      rated: { $in: ["PG", "G"] },
      genres: { $nin: ["Crime", "Horror"] },
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
]);
