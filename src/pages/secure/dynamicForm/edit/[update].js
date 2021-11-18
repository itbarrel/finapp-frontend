import React, { Fragment, memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox, Select, Col, Radio } from "antd";
import { validate } from "../../../../constants/validations";
import { getKey } from "../../../../utils/keyGenerator";
import withLayout from "../../../../layouts/app-layout";
import Widget from "../../../../components/Widget";
import { log } from '../../../../utils/console-log'
import NotFound from "../../../../components/helpers/errors";
import { sNO_RESULT_FOUND_BY } from "../../../../constants/messages";
import parse from 'html-react-parser';
import EditDynamicForm from "../../../../components/resources/dynamicForm/create-form";
import { current_item } from '../../../../store/slices/resources/dynamicForm'


const { Option } = Select;

const EditForm = memo(() => {
  const router = useRouter()
  const { update: formId } = router.query
  const FormList = useSelector(({ resources }) => resources.DynamicForm.list);
  const [selectedFrom] = useState(FormList.find((form) => form.id == formId))
  return (
    <>
      <EditDynamicForm selectedFrom={selectedFrom} />

      {/* {
        selectedFrom?.id != formId && (
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

EditForm.displayName = EditForm

export default withLayout(EditForm)

