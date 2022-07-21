import movies from "../movies.json";

export default async function handler(req, res) {
  const {
    slug: [id, location],
  } = req.query;

  const movie = movies.find((movie) => movie.id == id);

  const details = {};
  const l = movie.location.find((l) => l.value == location);
  details["location"] = l?.label;
  details["theatre"] = l?.theatre;
  details["timings"] = l?.timings;

  res.status(200).json({ details });
}
