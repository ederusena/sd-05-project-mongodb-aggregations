db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 3600000] }, 2] },
      // $divide: https://docs.mongodb.com/manual/reference/operator/aggregation/divide/
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
