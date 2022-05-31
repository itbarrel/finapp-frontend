// /////////////////////////////////////////////////////////
// id form view 
fieldType == "check_box" && (
  <>
    <Form.List name={[name, "checkBox_field"]}>
      {(fields, { add, remove }) => (
        <>
          <Row>
            {fields.map(({ key, name, fieldKey, ...field }) => (
              <Col xl={12} lg={12} md={24} sm={24} xs={24} fieldKey={[fieldKey, 'checkBox_col']} >
                <Form.Item required={false} fieldKey={[fieldKey, 'checkBoxFields']}>
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
                      name={[name, "checkBoxLabel"]}
                      rules={validateDynamicForm.field.checkboxLabel}
                      className="gx-m-1"
                    >
                      <Input placeholder="Text" />
                    </Form.Item>

                    <Form.Item
                      name={[name, "checkBoxInput"]}
                      rules={validateDynamicForm.field.checkboxLabel}
                      className="gx-m-1"
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
              Add CheckBox
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
)

fieldType == "select_box" && (
  <>
    <Form.List name={[name, "select_box_field"]}>
      {(fields, { add, remove }) => (
        <>
          <Row>
            {fields.map(({ key, name, fieldKey, ...field }) => (
              <Col xl={12} lg={12} md={24} sm={24} xs={24} key={field.key} fieldKey={[fieldKey, 'select_box']}>
                <Form.Item name={'select_box'} required={false} fieldKey={[fieldKey, 'select_box']}>
                  <Widget
                    styleName={
                      "gx-bg-light gx-card-widget gx-ml-3 gx-mb-0 gx-mt-1"
                    }
                    extra={
                      <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
                        <li
                          onClick={() => remove(field.name)}
                          className="gx-pr-3"
                        >
                          <MinusCircleOutlined className="dynamic-delete-button" />
                        </li>
                      </ul>
                    }
                  >
                    <Form.Item
                      name={[name, "checkbox-label"]}
                      rules={validateDynamicForm.field.checkboxLabel}
                      className="gx-m-1"
                    >
                      <Input placeholder="Text" />
                    </Form.Item>

                    <Form.Item
                      name={[name, "checkbox-input"]}
                      rules={validateDynamicForm.field.checkboxLabel}
                      className="gx-m-1"
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
              Add select Box
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
)

fieldType == "radio_button" && (
  <>
    <Form.List name={[name, "radio_button_field"]}>
      {(fields, { add, remove }) => (
        <>
          <Row>
            {fields.map(({ key, name, fieldKey, ...field }) => (
              <Col xl={12} lg={12} md={24} sm={24} xs={24} fieldKey={[fieldKey, 'radio_Button_col']} >
                <Form.Item required={false} fieldKey={[fieldKey, 'radioBtnFields']}>
                  <Widget
                    styleName={
                      "gx-bg-light gx-card-widget gx-ml-3 gx-mb-0 gx-mt-1"
                    }
                    extra={
                      <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
                        <li
                          onClick={() => remove(field.name)}
                          className="gx-pr-3"
                        >
                          <MinusCircleOutlined className="dynamic-delete-button" />
                        </li>
                      </ul>
                    }
                  >
                    <Form.Item
                      name={[name, "radioButtonLabel"]}
                      rules={validateDynamicForm.field.checkboxLabel}
                      className="gx-m-1"
                    >
                      <Input placeholder="Text" />
                    </Form.Item>

                    <Form.Item
                      name={[name, "radioButtonInput"]}
                      rules={validateDynamicForm.field.checkboxLabel}
                      className="gx-m-1"
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
              Add Radio Button
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
)
  // ////////////////////////////////////////////////////////

  // <Form.Item Form.Item
  // fieldKey = { [fieldKey, 'input_description']}
  // name = { [name, "input_description"]}
  // rules = { validateDynamicForm.description }
  // className = "gx-m-1"
  // style = {{ width: "99%" }}
  // {...field }
  //                                 >
  //   <Input placeholder="Description" addonAfter={
  //     <Form.Item name={[name, "description_input"]} initialValue='show' fieldKey={[fieldKey, 'description_input']} {...field} noStyle>
  //       <Select>
  //         <Option value="show">Show</Option>
  //         <Option value="hide">Hide</Option>
  //       </Select>
  //     </Form.Item>} />
  // </Form.Item >


  