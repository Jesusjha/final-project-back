//Account:
import { signup, updateAccout } from "./AccountController.js";

//Personal:
import {
  followSomeone,
  getMyFollowers,
  getMyFollowing,
  getMyLikedSongs,
} from "./PersonalController.js";

//Song:
import {
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  createSongWithCloudinary,
  likeASong,
  deleteLike,
  playSong,
} from "./SongController.js";

//Album:
import { getAllAlbums, createAlbum } from "./AlbumController.js";

//Playlist
import {
  createPlaylist,
  updatePlaylistInfoById,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getAllPlaylists,
  getPlaylistById,
  deletePlaylist,
  followPlaylist,
} from "./PlaylistController.js";

//Genre
import { getAllGenres, getGenreById } from "./GenreController.js";

//Search
import search from "./SeachController.js";

//User - for future use
import {
  getAllUsers,
  updateCurrentUser,
  getCurrentUser,
  deleteUser,
} from "./UserController.js";

export {
  signup,
  updateAccout,
  followSomeone,
  getMyFollowers,
  getMyFollowing,
  getMyLikedSongs,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  createSongWithCloudinary,
  likeASong,
  deleteLike,
  playSong,
  getAllAlbums,
  createAlbum,
  getAllGenres,
  getGenreById,
  createPlaylist,
  updatePlaylistInfoById,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getAllPlaylists,
  getPlaylistById,
  deletePlaylist,
  followPlaylist,
  search,
  getAllUsers,
  updateCurrentUser,
  getCurrentUser,
  deleteUser,
};
