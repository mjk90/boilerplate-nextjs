import React from 'react';
import { useDispatch } from 'react-redux';
import { withRedux } from '../lib/redux'
import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { useSelector, shallowEqual } from 'react-redux';
import fetch from 'isomorphic-unfetch';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const endpoint = "http://localhost:8888";

const accounts = [
  {"name":"useraaaaaaaa", "privateKey":"5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5", "publicKey":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"},
  {"name":"useraaaaaaab", "privateKey":"5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg", "publicKey":"EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"},
  {"name":"useraaaaaaac", "privateKey":"5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7", "publicKey":"EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"},
  {"name":"useraaaaaaad", "privateKey":"5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx", "publicKey":"EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X"},
  {"name":"useraaaaaaae", "privateKey":"5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg", "publicKey":"EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb"},
  {"name":"useraaaaaaaf", "privateKey":"5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK", "publicKey":"EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H"},
  {"name":"useraaaaaaag", "privateKey":"5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo", "publicKey":"EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw"}
];
// set up styling classes using material-ui "withStyles"
const styles = theme => ({
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

const IndexPage = () => {
  // Tick the time every second
  const dispatch = useDispatch()
  const temp = useSelector(state => ({ data: state.data }), shallowEqual);

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  const handleFormEvent = async (event) => {
    // stop default behaviour
    event.preventDefault();

    // collect form data
    let account = event.target.account.value;
    let privateKey = event.target.privateKey.value;
    let note = event.target.note.value;

    // prepare variables for the switch below to send transactions
    let actionName = "";
    let actionData = {};

    // define actionName and action according to event type
    switch (event.type) {
      case "submit":
        actionName = "update";
        actionData = {
          user: account,
          note: note,
        };
        break;
      default:
        return;
    }

    // eosjs function call: connect to the blockchain
    const rpc = new JsonRpc(endpoint);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    try {
      const result = await api.transact({
        actions: [{
          account: "notechainacc",
          name: actionName,
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: actionData,
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      console.log(result);
      // this.getTable();
      const table_rows = await rpc.get_table_rows({
        "json": true,
        "code": "notechainacc",   // contract who owns the table
        "scope": "notechainacc",  // scope of the table
        "table": "notestruct",    // name of the table as specified by the contract abi
        "limit": 100,
      });
    
      console.log("table_rows", table_rows);
      dispatch({
        type: 'GET_TABLE',
        data: table_rows
      });
    } catch (e) {
      console.log('Caught exception: ' + e);
      if (e instanceof RpcError) {
        console.log(JSON.stringify(e.json, null, 2));
      }
    }
  }

  // generate each note as a card
  const generateCard = (key, timestamp, user, note) => (
    <Card className={styles.card} key={key}>
      <CardContent>
        <Typography variant="h4" component="h2">
          {user}
        </Typography>
        <Typography style={{fontSize:12}} color="textSecondary" gutterBottom>
          {new Date(timestamp+"+00:00").toString()}
        </Typography>
        <Typography component="pre">
          {note}
        </Typography>
      </CardContent>
    </Card>
  );
  console.log("temp.data.rows", temp.data.rows);
  
  let noteCards = temp.data.rows && temp.data.rows.map((row, i) =>
    generateCard(i, row.timestamp, row.user, row.note));

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            Note Chain
            </Typography>
        </Toolbar>
      </AppBar>
      {noteCards}
      <Paper className={styles.paper}>
        <form onSubmit={(e) =>handleFormEvent(e)}>
          <TextField
            name="account"
            autoComplete="off"
            label="Account"
            margin="normal"
            fullWidth
          />
          <TextField
            name="privateKey"
            autoComplete="off"
            label="Private key"
            margin="normal"
            fullWidth
          />
          <TextField
            name="note"
            autoComplete="off"
            label="Note (Optional)"
            margin="normal"
            multiline
            rows="10"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            className={styles.formButton}
            type="submit">
            Add / Update note
            </Button>
        </form>
      </Paper>
      <pre className={styles.pre}>
        Below is a list of pre-created accounts information for add/update note:
          <br /><br />
        accounts = {JSON.stringify(accounts, null, 2)}
      </pre>
    </div>
  )
}

IndexPage.getInitialProps = async ({ reduxStore }) => {
  const { dispatch } = reduxStore;  
  const rpc = new JsonRpc(endpoint);
  const table_rows = await rpc.get_table_rows({
    "json": true,
    "code": "notechainacc",   // contract who owns the table
    "scope": "notechainacc",  // scope of the table
    "table": "notestruct",    // name of the table as specified by the contract abi
    "limit": 100,
  });

  console.log("table_rows", table_rows);

  dispatch({
    type: 'GET_TABLE',
    data: table_rows
  });

  return {}
}

export default withStyles(styles)(withRedux(IndexPage))
