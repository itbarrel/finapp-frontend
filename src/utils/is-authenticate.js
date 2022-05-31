import { CookieService } from "../services/storage.service";

export const IsAuthenticate = () => {
  const token = CookieService.getToken();
  const validate = token ? true : false;
  return validate;
};
