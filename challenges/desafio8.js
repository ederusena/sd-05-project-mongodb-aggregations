db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "uniao",
    },
  },
  { $unwind: "$uniao" },
  { $match: { "uniao.airplane": { $in: ["747", "380"] } } },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $project: { _id: 1, totalRotas: 1 } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
