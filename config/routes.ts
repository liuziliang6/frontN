export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' }
    ],
  },

  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },

  {
    path: '/admin',
    name: '详情管理页',
    icon: 'crown',
    access: 'canAdmin',// 权限控制
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '订单管理', component: './Admin' },
      { path: '/admin/sub-page/ggg', name: '评论管理', component: './Admin' },
      { path: '/admin/sub-page/ggg/gggg', name: '四级管理', component: './Admin' },
    ],
  },

  { name: '用户管理', icon: 'table', path: '/list', component: './TableList' },
  { name: '订单管理', icon: 'table', path: '/order', component: './OrderList' },
  { path: '/', redirect: '/welcome' },// 定向到指定界面
  { path: '*', layout: false, component: './404' },


  {
    name: '个人页',
    icon: 'user',
    path: '/account',
    routes: [
      { path: '/account', redirect: '/account/center' },
      { name: '个人中心', icon: 'smile', path: '/account/center', component: './account/center', },
      { name: '个人设置', icon: 'smile', path: '/account/settings', component: './account/settings', },
    ],
  },



];
