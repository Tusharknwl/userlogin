import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  changeCurrentUserPassword,
  logoutUser,
} from "../controller/user.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/refresh-token").post(refreshToken);
router.route("/change-password").post(verifyToken, changeCurrentUserPassword);

router.route("/logout").post(verifyToken, logoutUser);

export default router;
