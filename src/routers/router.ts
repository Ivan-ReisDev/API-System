import { Router, Request, Response } from "express";
import UsersRouter from "./users-router";
import AuthRouter from "./auth-router";

const router = Router();

router.use("/", AuthRouter, UsersRouter);

export default router;