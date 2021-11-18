import React, { Fragment, memo, useEffect, useState } from "react";
import { Col, Row, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { sNO_RESULT_FOUND_BY } from "../../../../../constants/messages";
import withLayout from "../../../../../layouts/app-layout";
import NotFound from "../../../../../components/helpers/errors";
import Form from '../../../../../components/resources/dynamicForm/form-card'
import { getKey } from '../../../../../utils/keyGenerator'
import { getFormTypesList, getFormTypes } from "../../../../../store/slices/resources/dynamicForm";
import { log } from '../../../../../utils/console-log'
import config from '../../../../../configs'
import Widget from "../../../../../components/Widget";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const List = memo(() => {
  const list = useSelector(({ resources }) => resources?.DynamicForm?.accounts);
  const formTypes = useSelector(({ resources }) => resources?.DynamicForm?.formType);
  const [isLoading] = useState(false);
  const dispatch = useDispatch();
  let token = config.dynamicFormToken
  const router = useRouter()
  const { account } = router.query
  const [selected, setSelected] = useState(list.find((elem) => elem.name == account))

  useEffect(() => {
    log("Dynamic Form list fetch",)
    log("Dynamic Form Types List fetch", formTypes)
    // dispatch(getFormTypesList(token))
    // dispatch(getFormTypes(token))
  }, [])

  return (
    <>
      <Widget styleName={"gx-card-widget"} align="middle">
        <Row justify="space-between">
          <div>
            <h3 className='gx-my-0 gx-mt-2 gx-ml-2'>Dynamic Form List</h3>
          </div>
          <Link href="/secure/dynamicForm" passHref>
            <Button
              type={'primary'}
              icon={<PlusCircleOutlined />}
              className={"gx-my-0 gx-list-inline gx-ml-auto gx-pl-2 gx-mx-2"}
            >
              Create Dynamic Form
            </Button>
          </Link>
        </Row>
      </Widget>

      <Row>
        {
          selected &&
          selected?.Forms.length > 0 &&
          selected?.Forms.map((form) => {
            return (
              <Fragment key={getKey()}>
                <Col xl={6} lg={8} md={12} sm={12} xs={24} key={form.id}>
                  <Form name={form.name} description={form.description} type={'formType'} id={form.id} form={form} slug={account} />
                </Col>
              </Fragment>
            );
          })
        }

        {/* {
          !isLoading && !list.length && (
            <>
              <Col span={24} align="middle">
                <NotFound message={<h1>{sNO_RESULT_FOUND_BY}</h1>} />
              </Col>
            </>
          )
        } */}
      </Row>
    </>
  );
});

List.displayName = List;

export default withLayout(List);
