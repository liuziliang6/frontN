// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addOrder POST /api/order/addOrder */
export async function addOrderUsingPOST(
  body: API.OrderAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/order/addOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteOrder POST /api/order/deleteOrder */
export async function deleteOrderUsingPOST(
  body: API.DeleteOrderRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/order/deleteOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateOrder POST /api/order/updateOrder */
export async function updateOrderUsingPOST(
  body: API.OrderUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/order/updateOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** UserOrderList GET /api/order/UserOrderList */
export async function UserOrderListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserOrderListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListOrders>('/api/order/UserOrderList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** UserOrderListByPage GET /api/order/UserOrderList/page */
export async function UserOrderListByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserOrderListByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageOrders>('/api/order/UserOrderList/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
