import React from 'react'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { registerAction } from '../redux/actions/authRegActions';

class Register extends React.Component {
  state = {
    form: {
      login: '',
      password: '',
      email: '',
    },
    userExists: false,
    newUser: false,
  };

  handleChange = ({ target }) => {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [target.name]: target.value,
      }
    }))
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { method, action } = event.target;
    const { login, password, email } = this.state.form;
    let response;
    try {
      response = await fetch(action, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          login,
          password,
          email,
        }),
      });
    } catch (err) {
      window.alert('error');
    }
    const result = await response.json();
    if (result.exists === 'true') {
      this.setState((prevState) => {
        return {
          ...prevState,
          userExists: true,
        }
      })
    } else if (result.newUser === 'true') {
      this.props.registerAction(result.userName);
      this.setState((prevState) => {
        return {
          ...prevState,
          newUser: true,
        }
      })
    }
  };
  
  render() {

    if (this.state.newUser) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
        <div className="row">
          <p> </p>
          {this.state.userExists && <h5>Пользователь с таким логином уже существует</h5>}
          <form className="col s8 offset-s3" method="POST" action="/register" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s8">
                <input id="login" name="login" type="text" onChange={this.handleChange} className="validate" />
                <label htmlFor="login">Придумайте логин</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s8">
                <input id="password" name="password" type="password" onChange={this.handleChange} className="validate" />
                <label htmlFor="password">Придумайте пароль</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s8">
                <input id="email" name="email" type="email" onChange={this.handleChange} className="validate" />
                <label htmlFor="email">Ваш email</label>
              </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" >Зарегистрироваться
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registerAction: (userName) => dispatch(registerAction(userName))
  }
}

export default connect(null, mapDispatchToProps)(Register);
