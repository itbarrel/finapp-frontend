import React, { Fragment, memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, Select, Col, Radio } from "antd";
import { validate } from "../../../../../constants/validations";
import { getKey } from "../../../../../utils/keyGenerator";
import withLayout from "../../../../../layouts/app-layout";
import Widget from "../../../../../components/Widget";
import { log } from '../../../../../utils/console-log'
import NotFound from "../../../../../components/helpers/errors";
import { sNO_RESULT_FOUND_BY } from "../../../../../constants/messages";
import parse from 'html-react-parser';
import Router from "next/router";

import { submitFormSubmission, getFormSubmission } from "../../../../../store/slices/resources/formSubmissions";

const { Option } = Select;

const View = memo(() => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { id: formId, account } = router.query
  const list = useSelector(({ resources }) => resources?.DynamicForm?.accounts);
  const { item: submittedData, completed: completedFormSubmissions } = useSelector(({ resources }) => resources?.FormSubmission);

  const loginUser = useSelector(({ auth }) => auth.user);
  const [selectedForm, setSelectedForm] = useState({})
  const [selectedAccount, setSelectedAccount] = useState({})
  const [form] = Form.useForm();

  const isCompleted = (formId) => {
    return completedFormSubmissions.filter((fs) => { return fs.parentId === loginUser.id && fs.formId === formId }).length > 0
  }

  const isNotCompleted = !isCompleted(formId)

  useEffect(() => {
    const findAccount = list.find((element) => element.name == account)
    const findForm = findAccount?.Forms.find((form) => form.id == formId)
    setSelectedForm(findForm)
    setSelectedAccount(findAccount)

    dispatch(getFormSubmission({ formId, parentId: loginUser.id }))
  }, [formId, account])

  useEffect(() => {
    if (submittedData && submittedData.data) {
      form.setFieldsValue(submittedData.data);
    }
  }, [submittedData]);

  const onFinish = (formData) => {
    const dataToSubmit = {
      formId,
      parentId: loginUser.id,
      data: formData
    }
    dispatch(submitFormSubmission(dataToSubmit))
    form.resetFields();
    back();
  };

  const back = () => {
    Router.push(`/secure/accounts/${account}/forms`);
  };

  return (
    <>
      {
        selectedForm?.id == formId &&
        <>
          <Widget>
            <h4>{selectedForm.name || ''} Form Submission - {selectedAccount.name || ''}</h4>
          </Widget>
          <Form onFinish={onFinish} form={form} scrollToFirstError layout={"vertical"} >
            <Widget styleName={"gx-card-widget"} >
              <p className="gx-text-grey gx-fs-xl "> {selectedForm.name} - {selectedForm.type} </p>
              <p className="gx-text-grey gx-fs-md gx-mb-4">{selectedForm.description} </p>
              {
                selectedForm?.fields && selectedForm?.fields.length > 0 && selectedForm?.fields?.map((data, index) => {
                  const { label, label_input, isInput, isLabel, isDescription, isEncryption, input_type, options, ckeditor, model, description } = data
                  const SelectedTextFieldType = {
                    text_field: <Input hidden={isInput ? false : true} />,
                    number_field: <Input hidden={isInput ? false : true} />,
                    text_area: <Input.TextArea rows={5} hidden={isInput ? false : true} />,
                    check_box: <Checkbox.Group>
                      {
                        options?.map((field, index) => {
                          return (
                            <Checkbox key={index} value={field?.input} > {field?.label} </Checkbox>
                          )
                        })
                      }
                    </Checkbox.Group>,
                    select_box: <Select >
                      {
                        options?.map((field, index) => {
                          return (
                            <Fragment key={index}>
                              <Option key={index} value={field?.input}> {field?.label} </Option>
                            </Fragment>
                          )
                        })
                      }
                    </Select>,
                    radio_button: <Radio.Group >
                      {
                        options?.map((field, index) => {
                          return (
                            <Radio key={index} value={field?.input}> {field?.label} </Radio>
                          )
                        })
                      }
                    </Radio.Group>
                  };
                  return (
                    <Fragment key={getKey()}>
                      <Form.Item
                        name={model}
                        label={isLabel ? label : ''}
                      >
                        {SelectedTextFieldType[input_type]}
                      </Form.Item>
                      {(isDescription && description) && (parse(description))}
                    </Fragment>
                  )
                })
              }

              {
                selectedForm?.fields &&
                <Form.Item>
                  <Button type="info" className="gx-ml-3" onClick={back}>
                    Return
                  </Button>
                  {isNotCompleted &&
                    <Button type="primary" htmlType="submit" className="gx-ml-3">
                      Submit
                    </Button>
                  }
                </Form.Item>
              }
            </Widget>
          </Form>
        </>
      }
      {/* {
        selectedForm?.id != formId && (
          <>
            <Col span={24} align="middle">
              <NotFound message={<h1>{sNO_RESULT_FOUND_BY}</h1>} />
            </Col>
          </>
        )
      } */}
    </>
  )
})

View.displayName = View

export default withLayout(View)

