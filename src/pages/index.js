import { memo } from "react";
import asyncComponent from "../utils/asyncComponent";
import { CookieService } from "../services/storage.service";

const Login = asyncComponent(() => import("../pages/auth/login"));
const Dashboard = asyncComponent(() => import("../pages/secure/dashboard/main")
);

const Home = memo(() => {
  const token = CookieService.getToken();

  return token ? <Dashboard /> : <Login />;
});

Home.displayName = Home;

export default Home;
