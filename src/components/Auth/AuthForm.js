import { useState, useRef, useContext} from 'react';
import AuthContext from '../../store/auth-context';
import {useHistory} from 'react-router-dom'
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const authCtx= useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true);
  const [isLoanding, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = event => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    setIsLoading(true)

    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLYCac9Hn5Pt0Pe9Y-upub00D8jlMy2NA'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLYCac9Hn5Pt0Pe9Y-upub00D8jlMy2NA'
    }

    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      setIsLoading(false)
      if (res.ok) {
        return res.json()
      } else {
        res.json().then(data => {
          let error = 'Authentication failed'
          // if (data && data.error && data.error.message)
          //   error = data.error.message

          //testar outros tipos de erros
          alert(error)
          throw new Error(error)
        })
      }
    }).then(data => { 
      authCtx.isLogged = true
      authCtx.token = data.idToken
      authCtx.login(data.idToken)
      console.log( data)

      history.replace('/')
    })
      .catch(err => {
        alert(err.message)
      })

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoanding && <button> {isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoanding && <p>Sending Request</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section >
  );
};

export default AuthForm;
