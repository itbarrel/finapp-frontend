import React, { memo, useState } from "react";
import { Row, Col } from "antd";
import withLayout from "../../layouts/app-layout";
import TaskList from "../../components/resources/task/table";
import AddTask from "../../components/resources/task/form-model";
import SEO from "../../components/seo";
import Widget from "../../components/Widget";

const Task = memo(() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <SEO title={"Tasks"} />
      <Widget title="Tasks">
        <Row justify="end">
          <Col span={4}>
            <AddTask
              title={"Add Task"}
              visible={visible}
              setVisible={setVisible}
            />
          </Col>
        </Row>
        <TaskList />
      </Widget>
    </>
  );
});

Task.displayName = Task;
export default withLayout(Task);
