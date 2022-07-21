import movies from "../movies.json";
const fs = require("fs").promises;
import path from "path";

const ROUTE_CACHE_PATH = path.resolve(
  path.join(process.cwd(), "pages/api/movies.json")
);

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "DELETE") {
    const newMovies = movies.filter((movie) => movie.id != id);
    const err = await fs.writeFile(
      "pages/api/movies.json",
      JSON.stringify(newMovies, null, 2)
    );
    if (err) res.status(200).json(0);
    else res.status(200).json(1);
  } else
    res.status(200).json({ movie: movies.find((movie) => movie.id == id) });
}
