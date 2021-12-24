/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addLayout, updateLayout } from "../../../store/slices/resources/layouts";
import { isClient } from "../../../utils/is-client";
import Draggable from "react-draggable";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useRouter } from 'next/router'

import { validate } from '../../../constants/validations'

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const LayoutModal = memo(({ visible, setVisible, selectedLayout, title, off }) => {
    const router = useRouter()
    const { id } = router.query
    const draggleRef = useRef(null);
    const dispatch = useDispatch();
    const loader = useSelector(({ resources }) => resources.Account.loading);

    // const { records: roles } = useSelector(({ resources }) => resources.Role);

    const [loading, setLoading] = useState(loader);
    const [modelTitle] = useState(title);
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });
    const [form] = Form.useForm();
    const { Option } = Select;
    const onShowModal = () => {
        setVisible(true);
    };
    const onCloseModal = () => {
        setVisible(false);
        form.resetFields();
    };
    const onSubmit = async (u) => {
        setLoading(true);
        const files = u.target.files

        const formData = await form.validateFields();
        const { name, file } = formData
        const { file: fileData } = file
        const { originFileObj } = fileData


        // console.log('>>>>>>>>....', files, { name, file })
        if (visible && selectedLayout) {
            dispatch(updateLayout(selectedLayout.id, formData));
        } else {

            dispatch(addLayout({ name, file: originFileObj, formId: id }));
        }
        form.resetFields();
    };
    const ModalHeader = () => {
        return (
            <>
                <div
                    style={{
                        width: "100%",
                        cursor: "move",
                    }}
                    onMouseOver={() => {
                        if (disabled) {
                            setDisabled(false);
                        }
                    }}
                    onMouseOut={() => {
                        setDisabled(true);
                    }}
                    onFocus={(e) => e}
                    onBlur={(e) => e}
                >
                    {modelTitle}
                </div>
            </>
        );
    };

    const ModalFooter = () => {
        return (
            <>
                <Button key="back" onClick={onCloseModal}>
                    Return
                </Button>
                <Button
                    key="submit"
                    type="primary"
                    // loading={loading}
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </>
        );
    };
    useEffect(() => {
        if (visible) {
            onShowModal();
        }
        form.setFieldsValue(selectedLayout);
    }, [visible, selectedLayout]);
    useEffect(() => {
        if (loading) {
            setVisible(false);
            setLoading(false);
        }
    }, [loading]);
    const drag = () => (model) => {
        if (isClient) {
            const { clientWidth, clientHeight } = window?.document?.documentElement;
            const targetRect = draggleRef?.current?.getBoundingClientRect();

            const onStart = (event, uiData) => {
                setBounds({
                    left: -targetRect?.left + uiData?.x,
                    right: clientWidth - (targetRect?.right - uiData?.x),
                    top: -targetRect?.top + uiData?.y,
                    bottom: clientHeight - (targetRect?.bottom - uiData?.y),
                });
            };
            return (
                <>
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                        <div ref={draggleRef}>{model}</div>
                    </Draggable>
                </>
            );
        }
    };
    return (
        <>
            {off ? (
                ""
            ) : (
                <Button
                    type="primary"
                    onClick={onShowModal}
                    icon={<PlusCircleOutlined />}
                >
                    Create Layout
                </Button>
            )}
            <Modal
                title={<ModalHeader />}
                visible={visible}
                onOk={onSubmit}
                onCancel={onCloseModal}
                footer={<ModalFooter />}
                width={800}
                modalRender={drag()}
                forceRender
            >
                <Form {...formItemLayout} form={form} name={title} scrollToFirstError>
                    <Form.Item
                        name="name"
                        label={
                            <LabelAndTooltip
                                title={"Name"}
                                tooltip={"Enter your File Name"}
                            />
                        }
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item
                        name="file"
                        label={
                            <LabelAndTooltip
                                title={"Upload.File"}
                                tooltip={"Upload File"}
                            />
                        }
                    >
                        <Upload value="">
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>



                </Form>
            </Modal>
        </>
    );
});

LayoutModal.displayName = LayoutModal;

LayoutModal.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.any,
    setVisible: PropTypes.any,
    selectedLayout: PropTypes.any,
    off: PropTypes.bool,
};
export default LayoutModal;
