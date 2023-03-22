import {ProColumns, ProFormInstance, ProTable} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React,{ useEffect,useRef } from 'react';

export type Props = {
  columns: ProColumns<API.OrderAddRequest>[];
  onCancel: () => void;
  onSubmit: (values: API.OrderAddRequest) => Promise<void>;
  visible: boolean;
  values: API.UserVO;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { columns, visible, onSubmit, onCancel, values } = props;
  console.log("columns" + columns)
  const formRef = useRef<ProFormInstance>();
  debugger;
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values)
    }
  }, [values]);
  return (
    <Modal
      open = {visible}
      footer={null}
      // destroyOnClose={visible}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        formRef={formRef}
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      >

      </ProTable>
    </Modal>
  );
};

export default UpdateModal;
