import { createUser } from "../../models/user/index.js";
import { getUserByEmail } from "../../models/user/index.js";

export const register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  if (!email || !password || !name) {
    return res.status(400).send({
      code: 400,
      message: "Email or Password is required",
    });
  }

  const checkUser = await getUserByEmail(email);

  if (checkUser) {
    return res.status(400).send({
      code: 400,
      message: "Account is Existed!",
    });
  }

  const users = {
    name,
    email,
    password,
  };

  const newUser = await createUser(users);

  // loggers.info({ newUser });

  return;
};
