import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import { Form, Input, Button, Col, Row, Select, Alert, Checkbox, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { validateDynamicForm } from "../../../constants/validations";
import { add } from '../../../store/slices/resources/dynamicForm'
import { log } from '../../../utils/console-log'
import { getKey } from '../../../utils/keyGenerator'
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import Widget from "../../Widget";
import { getFormTypes, createDynamicForm, updateDynamicForm, update } from "../../../store/slices/resources/dynamicForm";
import config from '../../../configs'


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
    log('asdf HandleChangeTextField', value)
  };

  const handleMultipleFormType = (typeId) => {
    setMultipleFormTypeId(typeId)
  };

  useEffect(() => {
    const multiple = formTypes?.find((form) => form.id == MultipleFormTypeId)
    // log('asdf ===================== ', multiple?.multiple)
    if (multiple?.multiple === false) setMultipleFormType(multiple?.multiple)

  }, [MultipleFormTypeId])

  const onFinish = (formData) => {
    const dynamicFormData = {
      ...formData,
      fields: formData.fields || {},
    }
    if (selectedFrom) {
      log("asdf Form Data: update", selectedFrom);
      dispatch(updateDynamicForm(selectedFrom.id, dynamicFormData, token))
    }
    // else dispatch(createDynamicForm(dynamicFormData, token))
    else log('asdf >>>', formData)
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
    if (selectedFrom) form.setFieldsValue(selectedFrom)
    // else dispatch(getFormTypes(token))
    // dispatch(getFormTypes(token))
    // else log('asdf get form type ')
  }, [])

  const switchButtons = [
    { Label: 'Label', name: 'isLabel' },
    { Label: 'Input', name: 'isInput' },
    { Label: 'Description', name: 'isDescription' },
    { Label: 'Encryption', name: 'isEncryption' }
  ]

  return (
    <>
      <Col>
        {
          (MultipleFormType === false) ? (
            <Alert
              // message="Informational Notes"
              description="This form type can have only one form"
              type="info"
              showIcon
              closable
              afterClose={true}
            />
          ) : ''
        }
        <Form name="DynamicForm" onFinish={onFinish} >
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
                  <Select allowClear showSearch={true} onChange={handleMultipleFormType}>
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
              <Fragment key={getKey()}>
                <Row>
                  {fields.map(({ key, name, fieldKey, ...field }, index) => {
                    return (
                      <Fragment key={getKey()}>
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

                              {/* initialValue={'text_field'} */}
                              <Form.Item hasFeedback name={[name, "input_type"]} className="gx-m-1" rules={validateDynamicForm.field.inputType} fieldKey={[fieldKey, 'input_type']} {...field} >
                                <Select
                                  showSearch={true}
                                  className="gx-pl-0"
                                  onChange={handleChangeTextField}
                                  placeholder="Select input type"

                                >
                                  {['text_field', "number_field", "text_area", "check_box", "select_box", "radio_button",].map((item) => {
                                    return (
                                      <Fragment key={getKey()}>
                                        <Option key={item} value={item}>
                                          {item}
                                        </Option>
                                      </Fragment>
                                    )
                                  })}
                                </Select>
                              </Form.Item>
                              {/* Data Types */}
                              {
                                fieldType && (
                                  <Form.Item name={[name, "input_data_type"]} onChange={handleChangeTextField} className="gx-m-1" rules={validateDynamicForm.field.inputDataType} fieldKey={[fieldKey, 'input_data_types']} {...field}>
                                    <Select className="gx-pl-0" placeholder="Select input data type" >
                                      {SelectedTextFieldType[fieldType]?.map((input) => {
                                        return <Option key={getKey()} value={input} > {input} </Option>
                                      })}
                                    </Select>
                                  </Form.Item>
                                )
                              }
                              {/* fields options */}
                              {
                                ((form.getFieldValue()?.fields[index]?.input_type == 'check_box') || (fieldType == 'check_box' || fieldType == 'select_box' || fieldType == 'radio_button')) && (
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
                              <div className="gx-mx-3 gx-px-1">
                                <Form.Item
                                  name={[name, "description"]}
                                  valuePropName='data'
                                  getValueFromEvent={(event, editor) => {
                                    const data = editor.getData();
                                    return data;
                                  }}
                                // rules={[{ required: true, message: 'Please enter the body' }]}
                                >
                                  <CKEditor editor={ClassicEditor} />
                                </Form.Item>
                              </div>

                              <h5>Select which will show or hide on form</h5>
                              <div className='gx-d-flex gx-text-nowrap'>
                                {
                                  switchButtons.map((item) => {
                                    return (
                                      <Fragment key={getKey()}>
                                        <div className={"gx-mx-4"} key={getKey()}>
                                          <Form.Item
                                            name={[name, item.name]}
                                            label={item.Label}
                                            fieldKey={[fieldKey, item.name]}
                                            {...field}
                                          >
                                            <Switch checkedChildren="Show" unCheckedChildren="Hide" />
                                          </Form.Item>
                                        </div>
                                      </Fragment>
                                    )
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
            )
            }
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="gx-ml-3">
              {selectedFrom ? "Update Form" : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Col >
    </>
  );
});

CreateForm.displayName = CreateForm;

export default CreateForm;
