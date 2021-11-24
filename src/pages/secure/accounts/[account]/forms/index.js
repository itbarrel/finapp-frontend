import React, { Fragment, memo, useEffect, useState } from "react";
import { Col, Row, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { sNO_RESULT_FOUND_BY } from "../../../../../constants/messages";
import withLayout from "../../../../../layouts/app-layout";
import NotFound from "../../../../../components/helpers/errors";
import Form from '../../../../../components/resources/dynamicForm/form-card'
import { getKey } from '../../../../../utils/keyGenerator'
import { getFormTypesList, getFormTypes } from "../../../../../store/slices/resources/dynamicForm";
import { getFormSubmissions, getCompletedFormSubmissions } from "../../../../../store/slices/resources/formSubmissions";
import { log } from '../../../../../utils/console-log'
import config from '../../../../../configs'
import Widget from "../../../../../components/Widget";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const List = memo(() => {
  const list = useSelector(({ resources }) => resources?.DynamicForm?.accounts);
  const formTypes = useSelector(({ resources }) => resources?.DynamicForm?.formType);
  const loginUser = useSelector(({ auth }) => auth.user);
  const [isLoading] = useState(false);
  const dispatch = useDispatch();
  let token = config.dynamicFormToken
  const router = useRouter()
  const { account } = router.query
  const [selected, setSelected] = useState(list.find((elem) => elem.name == account))

  useEffect(() => {
    dispatch(getFormSubmissions({ parentId: loginUser.id }))
    dispatch(getCompletedFormSubmissions({ parentId: loginUser.id, status: 'completed' }))

    // dispatch(getFormTypesList(token))
    // dispatch(getFormTypes(token))
  }, [])

  return (
    <>
      <Widget styleName={"gx-card-widget"} align="middle">
        <Row justify="space-between">
          <div>
            <h3 className='gx-my-0 gx-mt-2 gx-ml-2'>{selected.name || ''} Form List</h3>
          </div>
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
                  <Form type={'formType'} form={form} slug={account} submissions={true} selectedAccount={selected} />
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
