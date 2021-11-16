import { memo } from "react";
import withLayout from "../../../layouts/app-layout";
import Widget from "../../../components/Widget";
import SEO from "../../../components/seo";

const Dashboard = memo(() => {
  return (
    <>
      <SEO title={"Main Dashboard"} />
      <Widget title="Dashboard">
        <h1>DashBoard </h1>
      </Widget>
    </>
  );
});

Dashboard.displayName = Dashboard;

export default withLayout(Dashboard);
