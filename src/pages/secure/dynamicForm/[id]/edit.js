import React, { memo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import withLayout from "../../../../layouts/app-layout";
import EditDynamicForm from "../../../../components/resources/dynamicForm/create-form";

const EditForm = memo(() => {
  const router = useRouter()
  const { id } = router.query
  const FormList = useSelector(({ resources }) => resources.DynamicForm.list);
  const [selectedFrom] = useState(FormList.find((form) => form.id == id))

  return (
    <EditDynamicForm selectedFrom={selectedFrom} />
  )
})

EditForm.displayName = EditForm

export default withLayout(EditForm)

