import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import withLayout from "../../../../layouts/app-layout";
import SubmissionDetailTable from "../../../../components/resources/submission/details";
import { Button } from "antd";
import Router from "next/router";

const SubmissionDetail = memo(() => {
    const router = useRouter()
    const { id } = router.query
    const FormList = useSelector(({ resources }) => resources.DynamicForm.list);
    const selectedFrom = FormList.find((form) => form.id == id)

    const back = () => {
        Router.push("/secure/dynamicForm/list");
    };

    return (
        <>
            <SubmissionDetailTable selectedFrom={selectedFrom} />
            <Button type="info" className="gx-ml-3" onClick={back}>
                Return
            </Button>
        </>
    )
})

SubmissionDetail.displayName = SubmissionDetail

export default withLayout(SubmissionDetail)
