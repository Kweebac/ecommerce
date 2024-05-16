import { RequestHandler } from "express";

const getUser: RequestHandler = (req, res) => {
  res.json(req.user);
};

export { getUser };
