import User from "../../models/user.js";

export const authern = async (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).send({
      code: 400,
      message: "Token Not Found!",
    });
  }

  const userData = await User.all();

  const currentToken = userData.find((user) => user.token === token);

  if (!currentToken) {
    return res.status(404).send({
      code: 404,
      message: "UnAuthorized!",
    });
  }

  return next();
};
