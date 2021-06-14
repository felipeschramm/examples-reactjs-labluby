import { Link } from 'react-router-dom';
import { useContext } from 'react'
import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext)
  const isLogged = authCtx.isLogged

  const logoutHandler = () =>{
    authCtx.logout();
    // optional: redirect to '/'
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLogged && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLogged && <><li>
            <Link to='/profile'>Profile</Link>
          </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li></>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
