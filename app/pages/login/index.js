import React, { useState } from 'react';
import { useDispatch, connect, useSelector, shallowEqual } from 'react-redux';
import Head from 'next/head';
import { actions } from '../../reducers/login/reducers'
import NavBar from '../../components/navBar';
import Link from 'next/link';

const Login = () => {
  const dispatch = useDispatch();
  const loginStore = useSelector(state => state.loginPage, shallowEqual);
  const { data } = loginStore;

  const onLoginClick = async () => {
    dispatch(actions.login());
  }

  return (
    <div>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="The Login Page" />
      </Head>

      <NavBar title="Login" />

      <button onClick={() => onLoginClick()}>Get Token</button>
      <br></br>
      <br></br>
      <Link href="/secret">
        <a>Secret page</a>
      </Link>
    </div>
  )
}

Login.getInitialProps = (props) => {
  // const { store } = props.ctx;
  // store.dispatch(actions.fetchStart());
  return {};
}

export default connect()(Login);
