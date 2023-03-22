import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import { values } from 'lodash';
import React from 'react';

export type Props = {
  columns: ProColumns<API.UserVO>[];
  onCancel: () => void;
  onSubmit: (values: API.UserVO) => Promise<void>;
  visible: boolean;

};

const CreateModal: React.FC<Props> = (props) => {
  debugger;
  const { columns, visible, onSubmit, onCancel } = props;
  return (
    <Modal
      open = {visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
          window.location.reload();
        }}
        
      ></ProTable>
    </Modal>
  );
};
// #region

/* let valueNew = {
  userName: "",
  userAccount: "",
  userPassword: "",
  userRole: "",
}
function formReset()
  {
  document.getElementById("myForm")
  }
const clearRowData = () => {
    valueNew = value1;
}
 */
//#endregion




export default CreateModal;
