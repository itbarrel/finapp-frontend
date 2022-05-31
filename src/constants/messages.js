// Player Registration
export const eSOMETHING_WRONG = "Something went wrong";
export const eOPPS = "Oops! Something went wrong";
export const eEMAIL_USER =
  "The provided email address has already been registered";
export const eEMAIL =
  "A Player has already been registered with the provided email address";
export const eTwitch =
  "A Player has already been registered with the provided twitch channel";
export const eNick =
  "A Player has already been registered with the provided Game Name";
export const eRE_SUBMIT = `${eSOMETHING_WRONG}, Please review your application and resubmit`;
export const eRE_SIGNUP = `${eSOMETHING_WRONG}, Please check email/password and resubmit`;
export const eEMAILORPASS = "Either email or password is not correct";
export const eEMAILNOTEXIST = "No account found against provided email address";
export const eRESET_PASS_LINK_EXPIRE = "This password reset link is expired.";
export const eNAMEREQUIRED = "Name field required";
export const ePROFILE_NOT_UPDATED = `Profile not update. Please resubmit request`;
export const eCURRENT_PASS_NOT_VALID =
  "Provided current password is not correct";

// Form validation error message
export const vName = "Please enter your name";
export const vEmail = "Please enter a valid email";
export const vPass = "Please enter a valid password";
export const vPassword =
  "Minimum 8 characters, combination of letters and number required as password";
export const vNEW_AND_CONFIRM_PASS_MISMATCH =
  "New password and Confirm password should be same";

// success alert messages
export const sRESET_PASS_EMAIL_SENT =
  "Password reset link emailed at your email";
export const sPROFILE_UPDATED = `Profile updated successfully`;
export const sPASS_CHANGE_SUCCESS = "Password changed successfully";
export const sNO_RESULT_FOUND = "No result found";
export const sNO_RESULT_FOUND_BY = "No results found ";
export const sNO_FOLLOWING_FOUND = "You are not following any player";
export const sNO_FOLLOWER_FOUND =
  "You are not follered by any one. follower case ";
export const sNO_RECORDING_FOUND = "No recorded match available yet";
export const sNO_NOTIFICATION = "You have no new notification";
export const sNO_RELATED_MEDIA = "No related content found";
export const sNO_BRACKETS = "Brackets not generated yet";

// over-ride api messages - this is from backend we will override these messages.
// better way we will make a map here for replacing the messages.
export const oRESET_PASS_TOKEN_EXPIRE = "This password reset token is invalid.";

// Footer Text
export const FOOTER_TEXT = "Copyright CrisisHub © 2021.";
