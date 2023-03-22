import CreateModal from '@/pages/TableList/components/CreateModal';
import UpdateModal from '@/pages/TableList/components/UpdateModal';
import { removeRule } from '@/services/ant-design-pro/rule';
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
  const [currentRow, setCurrentRow] = useState<API.UserVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.UserVO) => {
    const hide = message.loading('正在添加');
    try {
      await addUserUsingPOST({ ...fields });
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
  const handleUpdate = async (fields: API.UserVO) => {
    console.log(currentRow);
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateUserUsingPOST({
        id: currentRow.id,
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
  const handleRemove = async (selectedRows: API.User[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      // await removeRule({
      //   key: selectedRows.map((row) => row.key),
      // });
      await deleteUserUsingPOST({
        ids: selectedRows.map(row =>row.id),
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

  const roleMap = {
    user: {
      text: '普通用户',
      color: 'green',
    },
    son: {
      text: '儿子',
      color: 'red',
    },
  };

  const columns: ProColumns<API.UserVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
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
      title: '头像',
      // dataIndex: 'userAccount',
      valueType: 'text',
      width: 150,
      render: () => (
        <Space>
          {/*<span>{dom + '1'}</span>*/}
          <Image
            width={50}
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F09%2F20210609081952_51ef5.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680522848&t=48e796196d96cc43d63cae0672ff1b95"
          />

          {/*<a href="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F09%2F20210609081952_51ef5.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680522848&t=48e796196d96cc43d63cae0672ff1b95" target="_blank" rel="noopener noreferrer">*/}
          {/*  chenshuai2144*/}
          {/*</a>*/}
        </Space>
      ),
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: '用户名',
      dataIndex: 'userAccount',
      valueType: 'text',
      copyable: true,
      hideInForm:false,
    },
    {
      title: '昵称',
      dataIndex: 'userName',
      valueType: 'text',
      // hideInForm: true, // 在表单项中隐藏
      // hideInSearch: true// 在查询区隐藏
    },
    /***********************/
    {
      title: '密码',
      dataIndex: 'userPassword',
      valueType: 'text',
      copyable: true,
      hideInSearch: true// 在查询区隐藏
    },
    /***********************/
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        0: {
          text: '女',
        },
        1: {
          text: '男',
        },
        3: {
          text: '未确认',
        },
      },
      // render: (_, record) => (
      //   <Space>
      //       <Tag color={record.gender === 0 ? "red" : "blue"}>
      //         {record.gender === 0 ? "男" : "女"}
      //       </Tag>
      //   </Space>
      // ),
      hideInForm: false, // 在表单项中隐藏
      hideInSearch: true// 在查询区隐藏
    },

    {
      title: '用户角色',
      dataIndex: 'userRole',
      // valueType: 'text',
      valueEnum: {
        user: {
          text: '普通用户',
          color: 'green',
        },
        son: {
          text: '儿子',
          color: 'blue',
        },
      },
      // render: (_, record) => {
      //   return <Tag color={this.valueEnum.color}>{record.userRole}</Tag>;
      // },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInForm: true, // 在表单项中隐藏
      hideInSearch: false,
    },
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
            console.log('www'+record);

          }}
        >
          修改
        </a>,
        

        // <a
        //   key="config"
        //   onClick={() => {
        //     handleUpdateModalOpen(false);
        //     deleteUserUsingPOST(record).then(()=>{alert("删除成功！")});
        //     window.location.reload();
        //   }}
        // >
        //   删除
        // </a>,

      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'测试查询用户'}
        actionRef={actionRef}
        rowKey="id"
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
        
        // #region
        // request={rule}
        // request={async (params: U & {
        //   pageSize?: number;
        //   current?: number;
        //   keyword?: string;
        // }, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => {
        //   const res = await listUserByPageUsingGET({
        //     ...params
        //   })
        //   if (res?.data) {
        //     return {
        //       data: res?.data.records || [],
        //       success: true,
        //       total: res?.data.total || 0,
        //     }
        //   }
        // }}
        // #endregion

        request={async (
          params: { pageSize?: number; current?: number; keyword?: string },
          sort: Record<string, SortOrder>,
          filter: Record<string, React.ReactText[] | null>,
        ) => {
          const res = await listUserByPageUsingGET({
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
          console.log('123' + success);
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
