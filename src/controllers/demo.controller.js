// Error Handling
const { AppError, httpCode } = require("../util/appError.util");

// exports.validateCredentials = async (username, password) => {
//   const tokens = await getAccessTokens(username, password);

//   if (
//     tokens.response &&
//     tokens.response.data &&
//     tokens.response.data.cdErrorCode &&
//     tokens.response.data.cdErrorCode == "PASSWORD_INCORRECT"
//   ) {
//     throw new AppError(
//       "BAD REQUEST",
//       httpCode.BAD_REQUEST,
//       "The email or password that you entered is incorrect."
//     );
//   }

//   if (!tokens.accessToken || !tokens.idToken)
//     throw new AppError(
//       "BAD REQUEST",
//       httpCode.BAD_REQUEST,
//       "User doesn't exists"
//     );

//   const { sub: appId, roles } = getIdFromAccessToken(tokens.accessToken);
//   console.log(getIdFromAccessToken(tokens.accessToken));
//   // Get user info from appId
//   const user = await getUserProfileById(appId);
//   if (user.attributes.deactivated)
//     throw new AppError(
//       "FORBIDDEN",
//       httpCode.FORBIDDEN,
//       "Account deactivated. Please contact a MyWayfinder administrator to reinstate access."
//     );

//   return { ...user, roles };
// };

// exports.login = async (user) => {
//   const {
//     email,
//     identities,
//     attributes: { mfaMethod }
//   } = user;

//   const phone = getPhone(identities);

//   let method = mfaMethod;

//   if (phone === null) {
//     method = "email";
//   }
//   // Sending MFA token to designated email when using test accounts
//   if (email.includes("@cbo.com") || email.includes("@test.com")) {
//     email = "eric.t.kane@ibm.com"; // TODO eric.t.kane@ibm.com
//   }

//   return { phone, method: method };
// };

// exports.setMfa = async (username, password, method, bannerUrl) => {
//   const tokens = await getAccessTokens(username, password);
//   const { sub: appId } = getIdFromAccessToken(tokens.accessToken);

//   // Get user info from appId
//   const user = await getUserProfileById(appId);

//   if (user.attributes.deactivated)
//     throw new AppError(
//       "FORBIDDEN",
//       httpCode.FORBIDDEN,
//       "Account deactivated. Please contact a MyWayfinder administrator to reinstate access."
//     );

//   const {
//     email,
//     identities,
//     attributes: { mfaSecret }
//   } = user;

//   const phone = getPhone(identities);

//   let to = "";
//   if (method === "email") {
//     to = email;
//   } else {
//     to = phone;
//   }

//   // check if returns fail
//   const otpResponse = await sendOTP({
//     secret: mfaSecret,
//     method: method,
//     to,
//     bannerUrl
//   });

//   if (!!otpResponse) {
//     // send back success response including method the code was sent to (redacted if text message)
//     const message =
//       method === "text"
//         ? "Code sent to xxx-xxx-" + phone.slice(-4)
//         : "Code sent to " +
//           email +
//           " Please check your spam inbox for Access Code";
//     return { success: true, message, tokens };
//   }
//   return { success: true, otpResponse, tokens };
// };

// exports.verifyMfa = async (accessToken, mfaCode) => {
//   //Validate User and mfaCode
//   const { sub: appId, roles } = getIdFromAccessToken(accessToken);
//   const {
//     attributes: { mfaSecret, firstLogin, unreadFeedCount },
//     ...user
//   } = await getUserProfileById(appId);

//   const verified = verifyToken(mfaSecret, mfaCode);
//   if (!verified) {
//     throw new AppError("BAD REQUEST", httpCode.BAD_REQUEST, "Invalid Token!");
//   }

//   //const notifications = await getNotificationsByRecipientId(appId);
//   const eventName = "Login";
//   const eventSummary = " logged in.";
//   const relatedObjectId = "N/A";

//   await addClientLongitudinalRecord(
//     user.id,
//     user.name,
//     eventName,
//     eventSummary,
//     relatedObjectId
//   );

//   return {
//     id: user.id,
//     givenName: user.given_name,
//     name: user.name,
//     firstLogin: firstLogin,
//     isAdmin: roles && roles.includes("admin"),
//     isSuper: roles && roles.includes("super_admin"),
//     unreadFeedCount: unreadFeedCount
//   };
// };

// exports.getAccount = async (patientId, { appId, cloudId }) => {
//   const { phoneNumbers } = await getCloudDirectoryUser(cloudId);

//   const { firstName, lastName, phoneList, addressList, ...patientData } =
//     await getPatientById(patientId);

//   // to be decided on
//   let mobilePhone = phoneNumbers.find(
//     ({ type }) => type.toLowerCase() === "mobile"
//   );
//   mobilePhone = mobilePhone ? mobilePhone.value : "";

//   let homeAddress = addressList.find(
//     ({ label }) => label.toLowerCase() === "home"
//   );
//   homeAddress = homeAddress ? homeAddress.address : "";

//   const {
//     attributes: { mfaMethod, photoId, notificationMethod }
//   } = await getUserProfileById(patientID);

//   let image = null;
//   if (photoId) {
//     const { MIMETYPE, DATA } = await getPhoto(photoId);
//     if (MIMETYPE) {
//       image = `data:${MIMETYPE};base64,${DATA}`;
//     } else {
//       image = "";
//     }
//   }

//   return {
//     ...patientData,
//     givenName: firstName,
//     familyName: lastName,
//     phone: mobilePhone,
//     address: homeAddress,
//     image: image,
//     mfaPreference: mfaMethod || "",
//     notificationPreference: notificationMethod || ""
//   };
// };

// exports.createAccount = async (email, password) => {
//   const signupDetails = {
//     active: true,
//     emails: [{ value: email, primary: true }],
//     userName: email,
//     password
//   };

//   const { id } = await addUser(signupDetails);
//   if (id) {
//     return true;
//   }
//   return false;
// };

// exports.updateMfaPreferneces = async (
//   appId,
//   method,
//   viaSettings = false,
//   cloudId = ""
// ) => {
//   // Get user info from appId
//   // CloudID:  1a351fd1-2b59-48e9-987b-c3335eb1c73f
//   try {
//     const user = await getUserProfileById(appId);

//     if (user.attributes.deactivated)
//       throw new AppError(
//         "FORBIDDEN",
//         httpCode.FORBIDDEN,
//         "Account deactivated. Please contact a MyWayfinder administrator to reinstate access."
//       );

//     if (viaSettings) {
//       if (method === "text") {
//         const { phoneNumbers } = await getCloudDirectoryUser(cloudId);
//         let phone = phoneNumbers.length === 0 ? "" : phoneNumbers[0].value;
//         if (!phone) {
//           throw new AppError(
//             "BAD REQUEST",
//             httpCode.BAD_REQUEST,
//             "No phone number on file"
//           );
//         }
//       }
//     }

//     const { attributes } = user;

//     await updateUserAttributes(appId, {
//       ...attributes,
//       mfaMethod: method
//     });

//     return { success: true, mfaPreference: method };
//   } catch (e) {
//     throw new Error(e);
//   }
//   // return res.status(200).json({ mfaPreference: req.body.mfaPreference });
// };
