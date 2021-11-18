import { memo } from "react";
import { useDispatch } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import PropTypes from "prop-types";
import IntlMessages from "../../../utils/IntlMessages";
import Widget from "../../../components/Widget";
import { removeDynamicForm, current_item } from '../../../store/slices/resources/dynamicForm'
import Link from 'next/link'
import { log } from '../../../utils/console-log'
import config from '../../../configs'

const DynamicFormCard = memo(({ name, description, type, id, form, slug }) => {
  const dispatch = useDispatch();
  let token = config.dynamicFormToken


  const handleDelete = (id) => {
    // dispatch(removeDynamicForm(id, token))
    // dispatch(current_item(form));
  }

  return (
    <Widget
      styleName={"gx-card-widget"}
      extra={
        <>
          <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
            <li>
              <Link href={`/secure/accounts/${slug}/forms/${id}`} passHref>
                <EyeOutlined style={{ fontSize: '18px' }} />
              </Link>
            </li>
            {/* <li>
              <Link href={`/secure/dynamicForm/edit/${id}`} passHref>
                <EditOutlined style={{ fontSize: '18px' }} />
              </Link>
            </li>
            <li>
              <Popconfirm
                title={<IntlMessages id="sure.for.delete" />}
                okText={<IntlMessages id="Yes" />}
                cancelText={<IntlMessages id="No" />}
                onConfirm={() => handleDelete(id)}
              >
                <DeleteOutlined />
              </Popconfirm>
            </li> */}
          </ul >
        </>
      }
      text={'Form Detail'}
    >
      <>
        <h2 className="gx-mb-1">{name}</h2>
        <p className="gx-text-grey gx-fs-sm "> <strong>Description: </strong> {description}</p>
        <p className="gx-text-grey gx-fs-sm gx-mb-4"> <strong>Type :</strong> {type}</p>
      </>
    </Widget >
  );
});

DynamicFormCard.displayName = DynamicFormCard;

DynamicFormCard.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  incident: PropTypes.object,
  form: PropTypes.object,
};

export default DynamicFormCard;
