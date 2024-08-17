import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    watchedMovieId: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("users", UserSchema);

export const createUser = (users) => UserModel.create(users);

export const findUserById = (id) => UserModel.findById(id);

export const deleteUserById = (id) => UserModel.deleteUserById(id);

export const getUserByEmail = (email) => UserModel.find({ email });

export const addWatchedMovie = async (id, movieId) => {
  const user = await UserModel.findById(id);

  const movieList = user.watchedMovieId;

  if (movieList.includes(movieId)) {
    return movieList;
  }

  movieList.push(movieId);

  return movieList;
};
