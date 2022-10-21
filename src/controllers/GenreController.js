import GenreModel from "../models/Genre.js";

const getAllGenres = async (req, res, next) => {
  try {
    const genres = await GenreModel.find({}).populate({
      path: "songs",
    });
    res.status(200).send(genres);
  } catch (error) {
    res.status(500).send({
      error: "something went wrong",
      errorMsg: error.message,
    });
  }
};

const getGenreById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const genre = await GenreModel.findById(id).populate({
      path: "songs",
      select: ["_id", "title", "fileUrl", "imageUrl", "duration"],
      populate: { path: "artist", select: ["artistName"] },
    });

    res.status(200).send(genre);
  } catch (error) {
    res.status(500).send({
      error: "something went wrong",
      errorMsg: error.message,
    });
  }
};

export { getAllGenres, getGenreById };
