import React, { memo, useState } from "react";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import SEO from "../../../components/seo";
import withLayout from "../../../layouts/app-layout";
import Incidents from "../../../components/cards/Card";
import ActionBar from "../../../components/dashboard/incidents/action-bar";
import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import NotFound from "../../../components/helpers/errors";

const IncidentDashboard = memo(() => {
  const incidentList = useSelector(({ resources }) => resources.Incidents.list);
  const [isLoading] = useState(false);

  return (
    <>
      <SEO title={"Incidents Dashboard"} />
      <ActionBar />
      <Row>
        {!isLoading &&
          incidentList &&
          incidentList.length > 0 &&
          incidentList.map((incident) => {
            return (
              <Col xl={6} lg={8} md={12} sm={12} xs={24} key={incident.id}>
                <Incidents
                  title={incident.name}
                  createdAt={incident.createdAt}
                  incident={incident}
                />
              </Col>
            );
          })}
        {!isLoading && !incidentList.length && (
          <>
            <Col span={24} align="middle">
              <NotFound message={<h1>{sNO_RESULT_FOUND_BY}</h1>} />
            </Col>
          </>
        )}
      </Row>
    </>
  );
});

IncidentDashboard.displayName = IncidentDashboard;

export default withLayout(IncidentDashboard);
