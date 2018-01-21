import React, { Component } from 'react';

import LogoTop from '../components/LogoTop';
import PageTitle from '../components/PageTitle';
import LoginBox from '../components/LoginBox';
import LoginForm from '../containers/LoginForm';

class Login extends Component {
  render() {
    return (
      <div>
        <LogoTop />
        <PageTitle
          title="Aplikasi Chat"
          subtitle="Sebagai Assesment untuk Jethro David. Silahkan masukan nama untuk menggunakan chat"
        />
        <LoginBox>
          <LoginForm />
        </LoginBox>
      </div>
    );
  }
}

export default Login;
