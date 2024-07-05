import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// Generate access and refresh tokens with user Id
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Something went wrong"));
  }
};

const changeCurrentUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordValid = await user.verifyPassword(oldPassword);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid credentials"));
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const registerUser = asyncHandler(async (req, res) => {
  // get the user data from the request body
  // validate the user data not empty
  // check if the user already exists
  // create user object -creat entry in db
  // remove password and token from the object
  // check for user creation
  // return the response

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Please provide all the fields"));
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Password must be at least 6 characters"));
  }

  if (!email.includes("@") || !email.includes(".")) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Please provide a valid email"));
  }

  const existedUser = await User.findOne({ email: email.toLowerCase() });

  if (existedUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "User already exists"));
  }

  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Something went wrong"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //get the user data from the req body
  //validate the user data
  //check if the user exists
  //if not exists, redirect to rgister user
  //check if the password is correct
  //generate token
  //send cookie with token

  const { email, password } = req.body;

  if (!email) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Please provide email"));
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "User not found. Please register"));
  }

  const isPasswordValid = await user.verifyPassword(password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshToken = asyncHandler(async (req, res) => {
  const incomingRreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRreshToken) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid credentials"));
  }

  try {
    const decodedToken = jwt.verify(
      incomingRreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Invalid refresh token"));
    }

    if (user.refreshToken !== incomingRreshToken) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Refresh token expired"));
    }

    const option = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", newRefreshToken, option)
      .json(
        new ApiResponse(
          200,
          { accessToken, newRefreshToken },
          "Token refreshed successfully"
        )
      );
  } catch (error) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Unauthorized access"));
  }
});

export {
  registerUser,
  loginUser,
  refreshToken,
  changeCurrentUserPassword,
  logoutUser,
};
