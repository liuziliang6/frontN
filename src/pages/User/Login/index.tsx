import Footer from '@/components/Footer';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { getLoginUserUsingGET,userLoginUsingPOST } from '@/services/xuexiceshi/userController';
import {
// AlipayCircleOutlined,
LockOutlined,
MobileOutlined,
// TaobaoCircleOutlined,
UserOutlined,
// WeiboCircleOutlined
} from '@ant-design/icons';
import {
LoginForm,
ProFormCaptcha,
ProFormCheckbox,
ProFormText
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet,history,useModel } from '@umijs/max';
import {Alert, Divider, message, Space, Tabs} from 'antd';
import React,{ useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import {Link} from "umi";

// const ActionIcons = () => {
//   const langClassName = useEmotionCss(({ token }) => {
//     return {
//       marginLeft: '8px',
//       color: 'rgba(0, 0, 0, 0.2)',
//       fontSize: '24px',
//       verticalAlign: 'middle',
//       cursor: 'pointer',
//       transition: 'color 0.3s',
//       '&:hover': {
//         color: token.colorPrimaryActive,
//       },
//     };
//   });
//
//   return (
//     <>
//       <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
//       <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
//       <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
//     </>
//   );
// };

// const Lang = () => {
//   const langClassName = useEmotionCss(({ token }) => {
//     return {
//       width: 42,
//       height: 42,
//       lineHeight: '42px',
//       position: 'fixed',
//       right: 16,
//       borderRadius: token.borderRadius,
//       ':hover': {
//         backgroundColor: token.colorBgTextHover,
//       },
//     };
//   });
//
//   return (
//     <div className={langClassName} data-lang>
//       {SelectLang && <SelectLang />}
//     </div>
//   );
// };

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGET();
    if (userInfo.data) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          loginUser: userInfo.data,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPOST({
        ...values,
      });
      if (res.data) {
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        return;
      } else {
        message.error(res.message);
      }
    } catch (error:any) {
      message.error(error.message);
      // const defaultLoginFailureMessage = '登录失败，请重试！';
      // message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录页'}- {Settings.title}
        </title>
      </Helmet>

      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="中北软件学院"
          subTitle={'家电售后管理系统'}
          initialValues={{
            autoLogin: true,
          }}
          actions={
            [
              // <FormattedMessage
              //   key="loginWith"
              //   id="pages.login.loginWith"
              //   defaultMessage="其他登录方式"
              // />,
              // <ActionIcons key="icons" />,
            ]
          }
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'账户或密码错误(admin/ant.design)'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space split={<Divider type="vertical" />}>
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <Link to="/user/register">新用户注册</Link>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码？
            </a>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
