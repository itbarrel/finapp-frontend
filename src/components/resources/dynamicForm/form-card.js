import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { Popconfirm } from "antd";
import PropTypes from "prop-types";
import IntlMessages from "../../../utils/IntlMessages";
import Widget from "../../../components/Widget";
import { removeDynamicForm, current_item } from '../../../store/slices/resources/dynamicForm'
import { completeFormSubmission } from '../../../store/slices/resources/formSubmissions'
import Link from 'next/link'
import { log } from '../../../utils/console-log'
import config from '../../../configs'

const DynamicFormCard = memo(({ type, form, slug, submissions, selectedAccount = {} }) => {
  const dispatch = useDispatch();
  let token = config.dynamicFormToken
  const formSubmissions = useSelector(({ resources }) => resources?.FormSubmission?.list);
  const completedFormSubmissions = useSelector(({ resources }) => resources?.FormSubmission?.completed);
  const loginUser = useSelector(({ auth }) => auth.user);

  const { id, name, description } = form

  const handleDelete = (id) => {
    dispatch(removeDynamicForm(id, token))
    dispatch(current_item(form));
  }

  const getSubmissionCount = (formId) => {
    return formSubmissions.filter((fs) => { return fs.formId === formId }).length
  }

  const isSubmitted = (formId) => {
    return formSubmissions.filter((fs) => { return fs.parentId === loginUser.id && fs.formId === formId }).length > 0
  }

  const isCompleted = (formId) => {
    return completedFormSubmissions.filter((fs) => { return fs.parentId === loginUser.id && fs.formId === formId }).length > 0
  }

  const onCompleteDocument = () => {
    const dataToSubmit = {
      formId: id,
      parentId: loginUser.id,
      dynamicFormAccountId: selectedAccount.id
    }
    dispatch(completeFormSubmission(dataToSubmit))
  }

  const ifNotCompleted = !submissions || (submissions && !isCompleted(id))
  const ifCompleted = submissions && isCompleted(id)
  const ifSubmitted = submissions && isSubmitted(id)

  return (
    <Widget
      size={'large'}
      loading={true}
      styleName={"gx-card-widget"}
      extra={
        <>
          <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
            {ifNotCompleted &&
              <li>
                <Link href={submissions ? `/secure/accounts/${slug}/forms/${id}` : `/secure/dynamicForm/${id}`} passHref>
                  <EyeOutlined style={{ fontSize: '20px' }} />
                </Link>
              </li>
            }
            {ifSubmitted &&
              <li>
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '18px' }} />
              </li>
            }
            {
              !submissions && <li>
                <Link href={`/secure/dynamicForm/${id}/edit`} passHref>
                  <EditOutlined style={{ fontSize: '18px' }} />
                </Link>
              </li>
            }
            {
              !submissions && <li>
                <Popconfirm
                  title={<IntlMessages id="sure.for.delete" />}
                  okText={<IntlMessages id="Yes" />}
                  cancelText={<IntlMessages id="No" />}
                  onConfirm={() => handleDelete(id)}
                >
                  <DeleteOutlined />
                </Popconfirm>
              </li>
            }
          </ul >
        </>
      }
      text={type}
    >
      {ifCompleted &&
        <span className="gx-widget-badge" style={{ backgroundColor: 'black' }}>
          <Link href={submissions ? `/secure/accounts/${slug}/forms/${id}` : `/secure/dynamicForm/${id}`} passHref>
            Completed
          </Link>
        </span>
      }
      <h2 className="gx-mb-1">{name}</h2>
      <p className="gx-text-grey gx-fs-sm "> <strong>Description: </strong> {description}</p>
      {!submissions &&
        <p style={{ cursor: 'pointer' }}>
          <Link href={`/secure/dynamicForm/${id}/details`} passHref>
            <span>
              <strong>Submissions: </strong>
              {getSubmissionCount(id)}
            </span>
          </Link>
        </p>
      }
      <div className="gx-text-center gx-pt-sm-3">
        {ifSubmitted &&
          <Popconfirm
            title={<IntlMessages id="sure.for.complete" />}
            cancelText={<IntlMessages id="No" />}
            onConfirm={onCompleteDocument}
          >
            <button className="gx-btn gx-btn-primary gx-text-white gx-mb-1">Complete Document</button>
          </Popconfirm>
        }
      </div>
    </Widget >
  );
});

DynamicFormCard.displayName = DynamicFormCard;

DynamicFormCard.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  form: PropTypes.object,
};

export default DynamicFormCard;
