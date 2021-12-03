const express = require("express");
const router = express.Router();

//error handlers
const asyncHandler = require("../util/asyncHandler.util");
const { AppError, httpCode } = require("../util/appError.util");

// Middleware
const { hasRole } = require("../middleware/hasRole");

//
// const {
//   validateCredentials,
//   login,
//   setMfa,
//   updateMfaPreferneces,
//   verifyMfa,
//   getAccount,
//   createAccount
// } = require("../controllers/user.controller.v2");

const Logger = require("../lib/winston");

// Base
// router.post(
//   "/",
//   asyncHandler(async (req, res, next) => {})
// );

// router.post(
//   "/login",
//   asyncHandler(async (req, res, next) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       throw new AppError(
//         "BAD REQUEST",
//         httpCode.BAD_REQUEST,
//         "Either the username or password is incorrect!"
//       );
//     }
//     const user = await validateCredentials(username, password);
//     if (user.attributes.hasOwnProperty("orgId")) {
//       throw new AppError(
//         "FORBIDDEN",
//         httpCode.FORBIDDEN,
//         "You are trying to log into the wrong portal"
//       );
//     }
//     const response = await login(user);
//     return res.status(httpCode.OK).json(response);
//   })
// );

// router.post(
//   "/provider-login",
//   asyncHandler(async (req, res, next) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       throw new AppError(
//         "BAD REQUEST",
//         httpCode.BAD_REQUEST,
//         "Either the username or password is incorrect!"
//       );
//     }
//     const user = await validateCredentials(username, password);
//     if (
//       !user.attributes.hasOwnProperty("orgId") &&
//       !user.roles.includes("super_admin")
//     ) {
//       throw new AppError(
//         "FORBIDDEN",
//         httpCode.FORBIDDEN,
//         "You are trying to log into the wrong portal"
//       );
//     }
//     const response = await login(user);
//     return res.status(httpCode.OK).json(response);
//   })
// );

// router.post(
//   "/login/set-mfa",
//   asyncHandler(async (req, res, next) => {
//     const { username, password, method } = req.body;

//     if (!username || !password) {
//       throw new AppError(
//         "BAD REQUEST",
//         httpCode.BAD_REQUEST,
//         "Either the username or password is incorrect!"
//       );
//     }

//     if (!method) {
//       throw new AppError(
//         "BAD REQUEST",
//         httpCode.BAD_REQUEST,
//         "MFA method not specified!"
//       );
//     }

//     const bannerUrl =
//       req.protocol + "://" + req.get("host") + "/static/MyWayFinderBanner.png";

//     const { tokens, ...response } = await setMfa(
//       username,
//       password,
//       method,
//       bannerUrl
//     );

//     req.session.accessToken = tokens.accessToken;
//     req.session.idToken = tokens.idToken;
//     req.session.exp = tokens.expiresIn;

//     res.status(httpCode.OK).json(response);
//   })
// );

// router.post(
//   "/login/verify-token",
//   asyncHandler(async (req, res, next) => {
//     const { token: mfaCode, method } = req.body;
//     const { sub: appId } = getIdFromAccessToken(req.session.accessToken);

//     if (!mfaCode)
//       throw new AppError("FORBIDDEN", httpCode.FORBIDDEN, "Invalid Token!");

//     const { accessToken, idToken, exp } = req.session;
//     const currentDate = new Date().getTime();
//     const expiresIn = currentDate + exp * 1000;
//     const response = await verifyMfa(accessToken, mfaCode);

//     await updateMfaPreferneces(appId, method);

//     res.status(httpCode.OK).json({
//       ...response,
//       accessToken,
//       idToken,
//       expiresIn
//     });
//   })
// );

module.exports = router;
