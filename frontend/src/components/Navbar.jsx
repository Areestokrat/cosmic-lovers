import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {connect} from 'react-redux';
import { logout } from '../redux/actions/authRegActions';

class Navbar extends React.Component {
  
  handleClick = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <nav>
        <div className="nav-wrapper grey darken-2">
          <Link to="/" className="brand-logo">Logo</Link>
          {this.props.isAuth ? 
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">домой</Link>
            </li>
            <li>
              <Link to={`/${this.props.userName}`}>{this.props.userName}</Link>
            </li>
            <li>
              <Link to="/services">все сервисы</Link>
            </li>
            <li>
              <Link to="/logout" onClick={this.handleClick}>выйти</Link>
            </li>
          </ul>
          :
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">домой</Link>
            </li>
            <li>
              <Link to="/login">войти</Link>
            </li>
            <li>
              <Link to="/register">регистрация</Link>
            </li>
            <li>
              <Link to="/services">все сервисы</Link>
            </li>
          </ul>
          }
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.authRegReducer.isAuthenticated,
    userName: state.authRegReducer.userName,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
