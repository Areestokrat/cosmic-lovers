import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { authAction } from '../redux/actions/authRegActions';

class Login extends React.Component {
  state = {
    form: {
      login: '',
      password: '',
    },
    correctAuth: false,
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
    const { login, password } = this.state.form;
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
        }),
      });
    } catch (err) {
      window.alert('error');
    }
    const result = await response.json();
    if (result.error) {
      window.alert(result.error);
    } else {
      this.props.authAction(result.userName);
      this.setState((prevState) => {
        return {
          ...prevState,
          correctAuth: true,
        }
      })
    }
  };
  
  render() {
    if (this.state.correctAuth) {
      console.log(this.state);
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div className="row">
          <p> </p>
          <form className="col s8 offset-s3" onSubmit={this.handleSubmit} method="POST" action="/login">
            <div className="row">
              <div className="input-field col s8">
                <input id="login" name="login" onChange={this.handleChange} type="text" className="validate" />
                <label htmlFor="login">Введите логин</label>
                {this.state.wrongLogin && <span className="helper-text" data-error="wrong">Вы ввели неверный логин или такого пользователя не существует</span>}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s8">
                <input id="password" name="password" onChange={this.handleChange} type="password" className="validate" />
                <label htmlFor="password">Введите пароль</label>
                  {this.state.wrongPass && <span className="helper-text" data-error="wrong">Вы ввели неверный пароль</span>}
              </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit">Войти
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
    authAction: (userName) => dispatch(authAction(userName)),
  }
}

export default connect(null, mapDispatchToProps)(Login)
