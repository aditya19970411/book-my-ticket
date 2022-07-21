import movies from "../movies.json";
import fs from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    const {} = req.body;
    const newMovie = {};
    const newMovies = [...movies, newMovie];
    fs.writeFile(
      "pages/api/movies.json",
      JSON.stringify(newMovies, null, 2),
      (err) => {
        if (err) console.log(err);
        else res.status(200).json({ movie: newMovie, added: "success" });
      }
    );
  } else res.status(200).json({ movies });
}
