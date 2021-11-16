import React, { Fragment, memo, useState } from "react";
import { Form, Input, Button, Col, Row, Select } from "antd";
import CKEditor from "react-ckeditor-component";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import { validateDynamicForm } from "../../../constants/validations";
import Widget from "../../Widget";
import { add } from '../../../store/slices/resources/dynamicForm'
import { useDispatch } from "react-redux";
import { log } from '../../../utils/console-log'
import { getKey } from '../../../utils/keyGenerator'

const CreateForm = memo(() => {
  const { Option } = Select;
  const [fieldType, setFieldType] = useState('');
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const filterValues = ["Planing", "Incidents", "Simulations"];

  const SelectedTextFieldType = {
    text_field: ["string"],
    number_field: ["integer", "float"],
    text_area: ["string"],
    check_box: ["string", "boolean"],
    select_box: ["string", "boolean"],
    radio_button: ["string", "boolean"],
  };

  const handleChangeTextField = (value) => {
    console.log('HandleChangeTextField ==', value)
    setFieldType(value)
  };

  const handleCkEditor = (value) => {
    log("ckeditor", value);
  };

  const onFinish = (formData) => {
    console.assert(formData);
    const dynamicFormData = {
      id: getKey(),
      ...formData
    }
    log("Form Data: Submit", dynamicFormData);
    dispatch({ type: add.type, payload: dynamicFormData })
  };

  return (
    <>
      <Col>
        <Form.Provider>
          <Form name="DynamicForm" onFinish={onFinish} form={form} scrollToFirstError preserve={false}>
            <Widget styleName={"gx-card-widget"} title="create.form">
              <Row>
                <Col lg={24} md={10} sm={12} xs={24}>
                  <Form.Item
                    name="name"
                    label={<LabelAndTooltip title={"Form.Name"} />}
                    rules={validateDynamicForm.name}
                    className="gx-mx-0 gx-my-1"
                    hasFeedback
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={24} md={10} sm={12} xs={24}>
                  <Form.Item
                    label={<LabelAndTooltip title={"Form.Type"} />}
                    hasFeedback
                    name="type"
                    className="gx-mx-0 gx-my-1"
                    rules={validateDynamicForm.formType}
                  >
                    <Select allowClear showSearch={true}>
                      {filterValues.map((role) => (
                        <Option key={role} value={role}>
                          {role}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Col lg={24}>
                <Form.Item
                  name="description"
                  label={<LabelAndTooltip title={"Form.Description"} />}
                  rules={validateDynamicForm.description}
                  className=" gx-my-1"
                >
                  <Input.TextArea rows={5} />
                </Form.Item>
              </Col>
            </Widget>
            {/* form Fields */}
            <Form.List name={"fields"}>
              {(fields, { add, remove }) => (
                <>
                  <Row>
                    {fields.map(({ key, name, fieldKey, ...field }) => {
                      return (
                        <Fragment key={key}>
                          <Col xl={12} lg={12} md={24} sm={24} xs={24} key={key}>
                            <Form.Item required={false} fieldKey={[fieldKey, 'mainItem']}>
                              <Widget
                                fieldKey={[name, 'card']}
                                styleName={"gx-card-widget gx-ml-3 gx-mb-1"}
                                text=" add field"
                                extra={
                                  <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
                                    <li
                                      onClick={() => {
                                        remove(name);
                                        // setFieldType("");
                                      }}
                                    >
                                      <MinusCircleOutlined className="dynamic-delete-button" /> Delete
                                    </li>
                                  </ul>
                                }
                              >
                                <Form.Item
                                  fieldKey={[fieldKey, 'model']}
                                  className="gx-m-1"
                                  style={{ width: "99%" }}
                                  initialValue={getKey()}
                                  hidden
                                  {...field}
                                />

                                <Form.Item
                                  name={[name, "label"]}
                                  fieldKey={[fieldKey, 'label']}
                                  rules={validateDynamicForm.field.label}
                                  className="gx-m-1"
                                  style={{ width: "99%" }}
                                  {...field}
                                >
                                  <Input placeholder="label" addonAfter={
                                    <Form.Item name={[name, "label_input"]} initialValue='show' fieldKey={[fieldKey, 'label_input']} {...field} noStyle>
                                      <Select>
                                        <Option value="show">Show</Option>
                                        <Option value="hide">Hide</Option>
                                      </Select>
                                    </Form.Item>} />
                                </Form.Item>

                                <Form.Item hasFeedback name={[name, "isInput"]} className="gx-m-1" rules={validateDynamicForm.field.inputType} fieldKey={[fieldKey, 'isInput']} {...field} >
                                  <Select
                                    showSearch={true}
                                    className="gx-pl-0"
                                    placeholder="input field show or hide"
                                    key={key}
                                  >
                                    <Option key={getKey()} value={"show"}>Show</Option>
                                    <Option key={getKey()} value={"hide"}>Hide</Option>
                                  </Select>
                                </Form.Item>


                                <Form.Item hasFeedback name={[name, "input_type"]} className="gx-m-1" rules={validateDynamicForm.field.inputType} fieldKey={[fieldKey, 'input_type']} {...field} >
                                  <Select
                                    showSearch={true}
                                    className="gx-pl-0"
                                    onChange={handleChangeTextField}
                                    placeholder="Select input type"
                                  // key={getKey()}
                                  >
                                    <Option key={"text_field"} value={"text_field"}>
                                      Text Field
                                    </Option>
                                    <Option key={"number_field"} value={"number_field"}>
                                      Number Field
                                    </Option>
                                    <Option key={"text_area"} value={"text_area"}>
                                      Text Area
                                    </Option>
                                    <Option key={"check_box"} value={"check_box"}>
                                      Check Box
                                    </Option>
                                    <Option key={"select_box"} value={"select_box"}>
                                      Select Box
                                    </Option>
                                    <Option key={"radio_button"} value={"radio_button"}>
                                      Radio Button
                                    </Option>
                                  </Select>
                                </Form.Item>

                                {fieldType && (
                                  <Form.Item name={[name, "input_data_type"]} className="gx-m-1" rules={validateDynamicForm.field.inputDataType} fieldKey={[fieldKey, 'input_data_types']} {...field}>
                                    <Select className="gx-pl-0" placeholder="Select input data type">
                                      {SelectedTextFieldType[fieldType].map((input) => {
                                        return <Option key={getKey()} value={input}> {input} </Option>
                                      })}
                                    </Select>
                                  </Form.Item>
                                )}

                                {
                                  (fieldType == "check_box" || fieldType == "select_box" || fieldType == "radio_button") && (
                                    <>
                                      <Form.List name={[name, "options"]} >
                                        {(fields, { add, remove }) => {
                                          const SelectedTextFieldType = {
                                            check_box: 'CheckBox',
                                            select_box: 'SelectBox',
                                            radio_button: 'Radio Button',
                                          };
                                          return (
                                            <>
                                              <Row>
                                                {fields.map(({ key, name, fieldKey, ...field }) => (
                                                  <Col xl={12} lg={12} md={24} sm={24} xs={24} key={key} >
                                                    <Form.Item required={false} fieldKey={[fieldKey, `${fieldType}Fields`]}>
                                                      <Widget
                                                        styleName={
                                                          "gx-bg-light gx-card-widget gx-ml-3 gx-mb-0 gx-mt-1"
                                                        }
                                                        extra={
                                                          <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
                                                            <li
                                                              onClick={() => remove(name)}
                                                              className="gx-pr-3"
                                                            >
                                                              <MinusCircleOutlined className="dynamic-delete-button" />
                                                            </li>
                                                          </ul>
                                                        }
                                                      >
                                                        <Form.Item
                                                          name={[name, "label"]}
                                                          fieldKey={[fieldKey, 'label']}
                                                          rules={validateDynamicForm.field.checkboxLabel}
                                                          className="gx-m-1"
                                                          {...field}
                                                        >
                                                          <Input placeholder="Text" />
                                                        </Form.Item>

                                                        <Form.Item
                                                          name={[name, "input"]}
                                                          fieldKey={[fieldKey, 'input']}
                                                          rules={validateDynamicForm.field.checkboxLabel}
                                                          className="gx-m-1"
                                                          {...field}
                                                        >
                                                          <Input placeholder="Value" />
                                                        </Form.Item>
                                                      </Widget>
                                                    </Form.Item>
                                                  </Col>
                                                ))}
                                              </Row>

                                              <Form.Item>
                                                <Button
                                                  className="gx-ml-3"
                                                  onClick={() => add()}
                                                  icon={<PlusOutlined />}
                                                >
                                                  Add {SelectedTextFieldType[fieldType]}
                                                </Button>
                                              </Form.Item>
                                            </>
                                          )
                                        }}
                                      </Form.List>
                                    </>
                                  )
                                }

                                <div className="gx-m-1 gx-rounded-circle">
                                  <CKEditor
                                    activeClass="p10 gx-rounded-circle gx-rounded-lg"
                                    onChange={handleCkEditor}
                                  />
                                </div>

                              </Widget>
                            </Form.Item>
                          </Col>
                        </Fragment>
                      )
                    })}
                  </Row>

                  <Form.Item>
                    <Button
                      type="light"
                      className="gx-ml-3"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="gx-ml-3">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Form.Provider>
      </Col>
    </>
  );
});

CreateForm.displayName = CreateForm;

export default CreateForm;
