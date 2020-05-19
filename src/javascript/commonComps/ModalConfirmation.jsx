// ---Dependencys
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

// ------------------------------------------ COMPONENT-----------------------------------------
function ModalConfirmation(callback, data) {
  confirm({
    title: 'Do you Want to delete these items?',
    icon: <ExclamationCircleOutlined />,
    content: 'Some descriptions',
    onOk() {
      if (data) callback(data);
      else callback();
    },
    onCancel() {
      console.log('Cancel');
    }
  });
}
export default ModalConfirmation;
