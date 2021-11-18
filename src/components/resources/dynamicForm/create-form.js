import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import { Form, Input, Button, Col, Row, Select, Alert, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { validateDynamicForm } from "../../../constants/validations";
import { log } from '../../../utils/console-log'
import { getKey } from '../../../utils/keyGenerator'
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import Widget from "../../Widget";
import { getFormTypes, createDynamicForm, updateDynamicForm } from "../../../store/slices/resources/dynamicForm";
import config from '../../../configs'
import Router from "next/router";
// import { CKEditor } from '@ckeditor/ckeditor5-react/dist/ckeditor';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';


const CreateForm = memo(({ selectedFrom }) => {
  const formTypes = useSelector(({ resources }) => resources.DynamicForm.formType);
  const [MultipleFormTypeId, setMultipleFormTypeId] = useState()
  const [MultipleFormType, setMultipleFormType] = useState()
  const [fieldType, setFieldType] = useState('');
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const editorRef = useRef()

  let token = config.dynamicFormToken

  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || []

  const SelectedTextFieldType = {
    text_field: ["string"],
    number_field: ["integer", "float"],
    text_area: ["string"],
    check_box: ["string", "boolean"],
    select_box: ["string", "boolean"],
    radio_button: ["string", "boolean"],
  };

  const handleChangeTextField = (value) => {
    setFieldType(value)
    log('HandleChangeTextField', value)
  };

  const handleMultipleFormType = (typeId) => {
    setMultipleFormTypeId(typeId)
  };

  useEffect(() => {
    const isMultiple = formTypes?.find((form) => form.id == MultipleFormTypeId)
    if (isMultiple?.multiple === false) setMultipleFormType(isMultiple?.multiple)
  }, [MultipleFormTypeId])

  const onFinish = (formData) => {
    const dynamicFormData = {
      ...formData,
      fields: formData.fields || {},
    }
    if (selectedFrom) {
      log("Form Data: update", dynamicFormData);
      dispatch(updateDynamicForm(selectedFrom.id, dynamicFormData, token))
    }
    else {
      log("Form Data: submit", dynamicFormData);
      dispatch(createDynamicForm(dynamicFormData, token))
      form.resetFields();
      Router.push("/secure/dynamicForm/list");
    }
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
    if (selectedFrom) {
      log('Edit form', selectedFrom)
      form.setFieldsValue(selectedFrom)
    }
    dispatch(getFormTypes(token))
  }, [])

  const switchButtons = [
    { Label: 'Label', name: 'isLabel' },
    { Label: 'Input', name: 'isInput' },
    { Label: 'Description', name: 'isDescription' },
    { Label: 'Encryption', name: 'isEncryption' },
  ];
  const inputTypes = [
    { name: 'Text Field', value: 'text_field' },
    { name: 'Number Field', value: 'number_field' },
    { name: 'Text Area', value: 'text_area' },
    { name: 'Check Box', value: 'check_box' },
    { name: 'Select Box', value: 'select_box' },
    { name: 'Radio Button', value: 'radio_button' },
  ];

  return (
    <>
      <Col>
        {
          (MultipleFormType === false) && (
            <Alert
              message="Informational Notes"
              description={`The form type is can have only one form ${MultipleFormType ? 'non multiple' : 'multiple'}`}
              type="info"
              showIcon
              closable
            />
          )
        }
        <Form.Provider>
          <Form name="DynamicForm" onFinish={onFinish} form={form} scrollToFirstError >
            {/* Form Header */}
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
                    name="formTypeId"
                    className="gx-mx-0 gx-my-1"
                    rules={validateDynamicForm.formType}
                  >
                    <Select allowClear onChange={handleMultipleFormType}>
                      {
                        formTypes?.map((form) => {
                          return (
                            <Option key={getKey()} value={form.id}>
                              {form.name}
                            </Option>
                          )
                        })
                      }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label={'Visibility'}
                    hasFeedback
                    name="public"
                    className="gx-mx-0 gx-my-1"
                    rules={validateDynamicForm.visibility}
                  >
                    <Select allowClear>
                      {
                        [{ name: 'Public', value: 'true' }, { name: 'Private', value: 'false' }]?.map((form) => {
                          return (
                            <Option key={getKey()} value={form.value}>
                              {form.name}
                            </Option>
                          )
                        })
                      }
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
            {/* Form Body */}
            <Form.List name={"fields"} >
              {(fields, { add, remove }) => (
                <Fragment >
                  <Row>
                    {fields.map(({ key, name, fieldKey, ...field }, index) => {
                      return (
                        <Fragment key={index}>
                          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item required={false} fieldKey={[fieldKey, 'mainItem']} >
                              <Widget
                                fieldKey={[name, 'card']}
                                styleName={"gx-card-widget gx-ml-3 gx-mb-1"}
                                text="add field"
                                extra={
                                  <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
                                    <li onClick={() => remove(name)}>
                                      <MinusCircleOutlined className="dynamic-delete-button" /> Delete
                                    </li>
                                  </ul>
                                }
                              >
                                <Form.Item
                                  name={[name, "model"]}
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
                                  <Input placeholder="label" />
                                </Form.Item>

                                <Form.Item hasFeedback name={[name, "input_type"]} className="gx-m-1" rules={validateDynamicForm.field.inputType} fieldKey={[fieldKey, 'input_type']} {...field} >
                                  <Select
                                    showSearch={true}
                                    className="gx-pl-0"
                                    onChange={handleChangeTextField}
                                    placeholder="Select input type"

                                  >
                                    {inputTypes.map((item) => {
                                      return (
                                        <Fragment key={getKey()}>
                                          <Option key={item.value} value={item.value}>
                                            {item.name}
                                          </Option>
                                        </Fragment>
                                      )
                                    })}
                                  </Select>
                                </Form.Item>

                                <Form.Item name={[name, "input_data_type"]} className="gx-m-1" rules={validateDynamicForm.field.inputDataType} fieldKey={[fieldKey, 'input_data_types']} {...field}>
                                  <Select className="gx-pl-0" placeholder="Select input data type" >
                                    {SelectedTextFieldType[fieldType]?.map((input) => {
                                      return <Option key={getKey()} value={input} > {input} </Option>
                                    })}
                                  </Select>
                                </Form.Item>

                                {
                                  ((form.getFieldValue()?.fields[index]?.input_type == 'check_box') || (form.getFieldValue()?.fields[index]?.input_type == 'select_box') || (form.getFieldValue()?.fields[index]?.input_type == 'radio_button')) && (
                                    <>
                                      <Form.List name={[name, "options"]}>
                                        {(fields, { add, remove }) => {
                                          return (
                                            <Fragment key={getKey()}>
                                              <Row>
                                                {fields.map(({ key, name, fieldKey, ...field }) => (
                                                  <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                                                    <Form.Item required={false} fieldKey={[fieldKey, `${fieldType}Fields`]} >
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
                                                  Add Options
                                                </Button>
                                              </Form.Item>
                                            </Fragment>
                                          )
                                        }}
                                      </Form.List>
                                    </>
                                  )
                                }
                                <div className="gx-mx-3 gx-px-1"  >
                                  <Form.Item
                                    name={[name, "description"]}
                                    valuePropName='data'
                                    initialValue={''}
                                    fieldKey={[fieldKey, 'description']}
                                    getValueFromEvent={(event, editor) => {
                                      const description = editor.getData();
                                      return description;
                                    }}
                                    {...field}
                                  // rules={[{ required: true, message: 'Please enter the body' }]}
                                  >
                                    <CKEditor editor={ClassicEditor}
                                      config={{
                                        toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'undo', 'redo']
                                      }}
                                    />
                                  </Form.Item>
                                </div>
                                <h4 className={'gx-mx-2'}>Please select which property will show or hide</h4>
                                <div className='gx-d-flex gx-text-nowrap'>
                                  {
                                    switchButtons.map((item) => {
                                      return (
                                        <Fragment>
                                          <div className={'gx-flex gx-mx-4'}>
                                            <Form.Item
                                              name={[name, item.name]}
                                              label={item.Label}
                                              fieldKey={[fieldKey, item.name]}
                                              valuePropName={"checked"}
                                              initialValue={true}
                                              {...field}
                                            >
                                              <Switch
                                                defaultChecked
                                                checkedChildren={item.Label === 'Encryption' ? 'Enable' : 'show'}
                                                unCheckedChildren={item.Label === 'Encryption' ? 'Enable' : 'Hide'}
                                              />
                                            </Form.Item>
                                          </div>
                                        </Fragment>
                                      );
                                    })
                                  }
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
                </Fragment>
              )}
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="gx-ml-3">
                {selectedFrom ? "Update Form" : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </Form.Provider>
      </Col >
    </>
  );
});

CreateForm.displayName = CreateForm;

export default CreateForm;
