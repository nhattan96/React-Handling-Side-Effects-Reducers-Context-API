import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    }
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    }
  }
  return {
    value: '',
    isValid: false
  }
}

const passwordReducer = (state, action) => {
  switch (action.type) {
    case 'PASSWORD_INPUT':
      return {
        value: action.val,
        isValid: action.val.trim().length > 6
      }
    case 'PASSWORD_BLUR':
      return {
        value: state.value,
        isValid: state.value.trim().length > 6
      }
    default:
      return {
        value: '',
        isValid: false
      }
  }
}



const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const authCtx = useContext(AuthContext)

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [emailState, dispathEmail] = useReducer(
    emailReducer,
    {
      value: '',
      isValid: undefined
    }
  )

  const [passwordState, dispathPassword] = useReducer(passwordReducer,
    {
      value: '',
      isValid: undefined
    })

  // We can remove setFormIsValid because that state upda

  // useEffect(() => {
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //   )
  // }, [setFormIsValid, enteredEmail, enteredPassword]);

  // useEffect(() => {
  //   console.log('Effect running!');

  //   return () => {
  //     console.log('Effect cleanup!');

  //   }
  // },
  //   // [enteredEmail]
  // )


  // Object destructuring
  const { isValid: emailIsValidOD } = emailState
  const { isValid: passwordIsValidOD } = passwordState

  // Use bouncing
  useEffect(() => {

    const identifier = setTimeout(() => {
      console.log('Checking validity!');
      setFormIsValid(
        // enteredEmail.includes('@') && enteredPassword.trim().length > 6
        // emailState.value.includes('@') && passwordState.value.trim().length > 6
        emailIsValidOD && passwordIsValidOD
      )
    }, 500);

    return () => {
      console.log('Clean up!');
      clearTimeout(identifier)

    }
  },
    // [enteredEmail, enteredPassword]
    // [emailState, passwordState]
    [emailIsValidOD, passwordIsValidOD]
  );

  // useEffect(() => {
  //   console.log('Checking validity!');
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //   )
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    // useReducer
    dispathEmail({
      type: 'USER_INPUT',
      val: event.target.value
    })



    // setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );


    // setFormIsValid(
    //   //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    //   emailState.value.includes('@') && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispathPassword({
      type: 'PASSWORD_INPUT',
      val: event.target.value
    })

    // setFormIsValid(
    //   // event.target.value.trim().length > 6 && enteredEmail.includes('@')
    //   passwordState.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    // setEmailIsValid(emailState.value.includes('@'));

    dispathEmail({
      type: 'INPUT_BLUR'
    })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispathPassword({
      type: 'PASSWORD_BLUR'
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);

    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValidOD) {
      emailInputRef.current.focus()
    } else {
      passwordInputRef.current.focus()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValidOD}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValidOD}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
