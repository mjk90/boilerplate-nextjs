import React, { useState } from 'react';
import { useDispatch, connect, useSelector, shallowEqual } from 'react-redux';
import Head from 'next/head';
import { actions } from '../../reducers/login/reducers'
import NavBar from '../../components/navBar';
import { handleAuthSSR } from '../../lib/auth';
import axios from "axios";
import { Cookies } from 'react-cookie';

const Secret = () => {
  const loginStore = useSelector(state => state.loginPage, shallowEqual);

  const onPingCall = async (e) => {
    const cookies = new Cookies();
    const token = cookies.get('token')

    console.log("test ping message");
    
    try {
      const serverUrl = 'http://localhost:3001';
      const res = await axios.get(serverUrl + '/api/ping', { headers: { 'Authorization': token } });
      console.log(res.data.msg);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Head>
        <title>Secret Page</title>
        <meta name="description" content="The Secret Page" />
      </Head>

      <NavBar title="Secret" />

      <div>
        <h2>Secret page</h2>
        <p>Only accessible via a valid JWT</p>
        <br></br>
        <button onClick={(e) => onPingCall(e)}>Ping Call</button>
        <p>Check console for response</p>
      </div>
    </div>
  )
}

Secret.getInitialProps = async (props) => {
  const { ctx } = props;
  
  // Must validate JWT
  // If the JWT is invalid it must redirect
  // back to the main page. You can do that
  // with Router from 'next/router
  await handleAuthSSR(ctx);

  return {};
}

export default connect()(Secret);
