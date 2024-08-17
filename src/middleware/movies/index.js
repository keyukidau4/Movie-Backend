export const checkParam = (req, res, next) => {
  // console.log(req.params.genre);
  if (!req.params.genre) {
    return res.status(400).send({
      code: 400,
      message: "Request Failed! Not found genre param",
    });
  }

  next();
};
