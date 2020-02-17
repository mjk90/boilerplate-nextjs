import React, { useState } from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Head from 'next/head';
import dynamic from "next/dynamic";

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const TestComponent = dynamic(() => import("./components/testComponent"), {
  loading: () => <p>Loading...</p>
});

// set up styling classes using material-ui "withStyles"
const styles = theme => ({
  link: {
    marginRight: 15
  },
  card: {
    margin: 20,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  formButton: {
    marginTop: "10px",
    width: "100%",
  },
  pre: {
    background: "#ccc",
    padding: 10,
    marginBottom: 0,
  },
});

const About = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Head>
        <title>About Page</title>
        <meta name="description" content="The About Page" />
      </Head>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            Note Chain - About
          </Typography>
          <Link href="/">
            <a style={styles.link}>Home</a>
          </Link>
          <Link href="/about">
            <a style={styles.link}>About</a>
          </Link>
        </Toolbar>
      </AppBar>

      <div>
        <h2>Dynamically Imported Component:</h2>
        <button onClick={() => setShow(!show)}>Show/Hide</button>
        {show && <TestComponent />}
      </div>
    </div>
  )
}

export default connect()(About);
