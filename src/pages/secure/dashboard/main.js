import { memo, useEffect } from "react";
import withLayout from "../../../layouts/app-layout";
import Widget from "../../../components/Widget";
import SEO from "../../../components/seo";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../../store/slices/resources/dynamicForm";
import ENV from "../../../configs/";


const Dashboard = memo(() => {
  const dispatch = useDispatch();
  const accounts = useSelector(({ resources }) => resources?.DynamicForm?.accounts);
  const { isDynamicFormsPublic } = useSelector(({ auth }) => auth.domain);

  const token = ENV.dynamicFormToken;

  console.log('asdfasdf ============================================================', accounts)

  useEffect(() => {
    if (isDynamicFormsPublic) {
      dispatch(getAccounts(token));
    }
  }, [])

  return (
    <>
      <SEO title={"Main Dashboard"} />
      <Widget title="Dashboard">
        <h1>DashBoard </h1>.
      </Widget>
    </>
  );
});

Dashboard.displayName = Dashboard;

export default withLayout(Dashboard);
