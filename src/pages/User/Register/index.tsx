import Footer from '@/components/Footer';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {getLoginUserUsingGET, userLoginUsingPOST, userRegisterUsingPOST} from '@/services/xuexiceshi/userController';
import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet,history,useModel } from '@umijs/max';
import { Alert,message,Tabs } from 'antd';
import React,{ useState } from 'react';
import Settings from '../../../../config/defaultSettings';



const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

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


  const handleSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 注册
      const res = await userRegisterUsingPOST({
        ...values
      });
      console.log('注册时的数据:',res)
      if (res.data) {
        const defaultLoginSuccessMessage = '注册成功，请登录！';
        message.success(defaultLoginSuccessMessage);
        history.push('/user/login');
        console.log('res.data=',res.data);
        return;

      }
    } catch (error) {
      message.error(error.message);
      // const defaultLoginFailureMessage = '注册失败请重试！';  // 用户已存在,
      // message.error(defaultLoginFailureMessage);
      // alert(error+'请重新注册');
      // console.log('注册失败:',error);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册页'}- {Settings.title}
        </title>
      </Helmet>

      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="中北软件学院" // 中北大学软件学院
          subTitle={'家电售后管理系统'} // 在线图片信息交流系统
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '用户注册',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项!',
                  },
                  {
                    min: 4,
                    type: 'string',
                    message: '用户账号过短,至少4位',
                  },
                ]}
              />

              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于8位',
                  },
                ]}
              />

              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
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
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
