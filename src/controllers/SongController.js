import SongModel from "../models/Song.js";
import cloudinary from "../../cloudinary.js";
import dotenv from "dotenv";
import { Mongoose, Schema } from "mongoose";
dotenv.config();

const getAllSongs = async (req, res, next) => {
  try {
    const songs = await SongModel.find({})
      .populate("artist")
      .populate({
        path: "uploadedBy",
        select: ["username", "firstName", "lastName", "avatar", "email"],
      })
      .populate("album")
      .populate("likedBY")
      .lean()
      .exec();
    res.status(200).send({ songs: songs });
  } catch (error) {
    next(error);
  }
};

const createSong = async (req, res, next) => {
  const {
    title,
    artist,
    fileUrl,
    imageUrl,
    released,
    duration,
    album,
    genre,
    user,
  } = req.body;
  try {
    const newSong = await SongModel.create({
      title,
      artist,
      fileUrl,
      imageUrl,
      released,
      duration,
      album,
      genre,
      user,
    });
    res.status(201).send({ success: "Song was created", createdSong: newSong });
  } catch (error) {
    next(error);
  }
};

export const createSongWithCloudinary = async (req, res, next) => {
  const songPath = req.files.video[0].path;
  const thumbnailPath = req.files.image[0].path;
  const title = req.body.title;
  const uploadedBy = req.headers.user;

  try {
    const uploadedSong = await cloudinary.uploader.upload(songPath, {
      folder: "songs",
      resource_type: "video",
    });

    const uploadThummail = await cloudinary.uploader.upload(thumbnailPath, {
      folder: "images",
      resource_type: "image",
    });

    const { url: songUrl, duration, public_id } = uploadedSong;
    const { url: thumbnailUrl } = uploadThummail;

    const newSong = await SongModel.create({
      title: title,
      fileUrl: songUrl,
      thumbnail: thumbnailUrl,
      duration: duration,
      cloudinaryId: public_id,
      uploadedBy,
    });
    res.status(200).send({ newSong });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
    next();
  }
};

const updateSong = async (req, res, next) => {
  const { title, released, album, genre } = req.body;
  const { id } = req.params;
  try {
    const songToUpdate = await SongModel.findOneAndUpdate(
      { id: id },
      {
        $set: {
          title,
          released,
          album,
          genre,
        },
      },
    );
    res.status(201).send({
      success: "Song was updated",
    });
  } catch (error) {
    next(error);
  }
};

const deleteSong = async (req, res, next) => {
  const { id } = req.params;

  try {
    const songToDelete = await SongModel.findOneAndDelete({ _id: id });
    res.status(200).send({ success: "Song was deleted" });
  } catch (error) {
    next(error);
  }
};

// Likes

const likeASong = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const conditions = { _id: id, likedBY: { $ne: userId } };
    const update = {
      $addToSet: { likedBY: userId },
    };
    const song = await SongModel.findByIdAndUpdate(conditions, update);

    res.status(200).send(song);
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong",
      errorMsg: error.message,
    });
  }
};

const deleteLike = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const conditions = { _id: id, likedBY: { $in: userId } };
    const update = {
      $pull: { likedBY: userId },
    };
    const song = await SongModel.findByIdAndUpdate(conditions, update);

    res.status(200).send(song);
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong",
      errorMsg: error.message,
    });
  }
};

const SongControllerActions = {
  getAllSongs,
  createSong,
  updateSong,
  deleteSong,
  createSongWithCloudinary,
  likeASong,
  deleteLike,
};

export default SongControllerActions;
