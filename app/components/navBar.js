import Link from 'next/link';
// material-ui dependencies
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  margin-bottom: 20px;
`;

const NavLinks = styled.div`
  margin-left: auto;

  a {
    margin-left: 10px;
  }
`;

export default (props) => {
  return (
    <StyledAppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          Note Chain {!!props && ` - ${props.title}`}
        </Typography>
        <NavLinks>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </NavLinks>
      </Toolbar>
    </StyledAppBar>
  );
}
