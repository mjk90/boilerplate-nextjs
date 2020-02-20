import React, { useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import NavBar from '../../components/navBar';
import Head from 'next/head';
import dynamic from "next/dynamic";
import { actions } from '../../reducers/about/reducers';

const TestComponent = dynamic(() => import("../../components/testComponent"), {
  loading: () => <p>Loading...</p>
});

const About = () => {
  const [show, setShow] = useState(false);
  const aboutStore = useSelector(state => state.aboutPage, shallowEqual);
  const { data } = aboutStore;

  return (
    <div>
      <Head>
        <title>About Page</title>
        <meta name="description" content="The About Page" />
      </Head>

      <NavBar title="Login" />

      <div>{data && JSON.stringify(data)}</div>

      <div>
        <h2>Dynamically Imported Component:</h2>
        <button onClick={() => setShow(!show)}>Show/Hide</button>
        {show && <TestComponent />}
      </div>
    </div>
  )
}

About.getInitialProps = (props) => {
  const { store } = props.ctx;
  store.dispatch(actions.fetchStart());
  return {};
}

export default connect()(About);
