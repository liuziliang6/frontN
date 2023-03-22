import CreateModal from '@/pages/OrderList/components/CreateModal';
import UpdateModal from '@/pages/OrderList/components/UpdateModal';
import {addOrderUsingPOST, UserOrderListByPageUsingGET, deleteOrderUsingPOST, updateOrderUsingPOST} from '@/services/xuexiceshi/orderController';
import {
addUserUsingPOST,
deleteUserUsingPOST,
listUserByPageUsingGET,
updateUserUsingPOST
} from '@/services/xuexiceshi/userController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType,ProColumns,ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
FooterToolbar,
PageContainer,
ProDescriptions,
ProTable
} from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button,Drawer,Image,message,Space,Tag } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { values } from 'lodash';
import React,{ useRef,useState } from 'react';

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.OrderUpdateRequest>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.OrderAddRequest) => {
    debugger
    const hide = message.loading('正在添加');
    try {
      await addOrderUsingPOST({ ...fields });
      hide();
      message.success('创建成功');
      handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.OrderUpdateRequest) => {
    console.log(currentRow);
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateOrderUsingPOST({
        order_id: currentRow.order_id,
        ...fields,
      });
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败:' + error.message);
      return false;
    }

  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.Orders[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await deleteOrderUsingPOST({
        order_ids: selectedRows.map(row =>row.order_id),
      })
      hide();
      message.success('删除成功并更新界面');
      return true;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };

  const columns: ProColumns<API.OrderAddRequest>[] = [
    {
      title: '订单id',
      dataIndex: 'order_id',
      valueType: 'index',
      formItemProps: {
        // 校验
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '用户名',
      dataIndex: 'userAccount',
      valueType: 'text',
      copyable: true,
      hideInForm:false,
    },
    {
      title: '订单创建时间',
      dataIndex: 'order_create_time',
      valueType: 'date',
      hideInForm: true, // 在表单项中隐藏
      hideInSearch: false,
    },
    {
      title: '订单更新时间',
      dataIndex: 'order_update_time',
      valueType: 'date',
      hideInForm: true, // 在表单项中隐藏
      hideInSearch: true
    },
    {
      title: '订单类型',
      dataIndex: 'order_type',
      // valueType: 'number',
      valueEnum: {
        0: {
          text: '洗衣机',
        },
        1: {
          text: '空调',
        },
        2: {
          text: '电视',
        },
      },
      hideInForm: false, // 在表单项中隐藏
      hideInSearch: false,
    },
    {
      title: '联系方式',
      dataIndex: 'contact_telephone',
      // valueType: 'number',//
      hideInForm: false, // 在表单项中隐藏
      hideInSearch: true
    },
    {
      title: '问题描述',
      dataIndex: 'problem_description',
      valueType: 'text',
      hideInForm: false, // 在表单项中隐藏
      hideInSearch: true
    },
    {
      title: '订单是否完成',
      dataIndex: 'order_is_finish1',

      valueEnum: {
        0: {
          text: '是',
          color: 'green',
        },
        1: {
          text: '否',
          color: 'red',
        },
      },
      hideInForm: false, // 在表单项中隐藏
      hideInSearch: false,
    },

    // 订单详情页进行查看 //
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
            debugger;
          }}
        >
          修改
        </a>,
        
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'测试查询用户'}
        actionRef={actionRef}
        
        rowKey="order_id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
        ]}
        

        request={async (
          params: { pageSize?: number; current?: number; keyword?: string },
          sort: Record<string, SortOrder>,
          filter: Record<string, React.ReactText[] | null>,
        ) => {
          const res = await UserOrderListByPageUsingGET({
            ...params,
          });
          console.log('-------->' + params);
          // 表格数据
          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total || 0,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        //-------------------
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      ></ProTable>
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="选择删除" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              {/* <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span> */}
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            删除
          </Button>
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.userAccount && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.userAccount}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.userAccount,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>

      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalOpen(false);
        }}
        onSubmit={(values) => {
          handleAdd(values);
        }}
        visible={createModalOpen}

      />
      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default TableList;
