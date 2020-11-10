const actorsList = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $addFields: {
      favCast: {
        $setIntersection: [actorsList, "$cast"],
      },
    },
  },
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
      favCast: { $ne: null },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [actorsList, "$cast"],
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
  { $project: { _id: 0, title: 1 } },
]);
