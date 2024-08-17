import { register } from "../controllers/user/index.js";

export default (router) => {
  router.post("/user/register", register);
};
