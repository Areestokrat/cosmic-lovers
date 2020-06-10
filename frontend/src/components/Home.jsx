import React from 'react';
import {connect} from 'react-redux';
import M from 'materialize-css';
import Spinner from './Spinner';
import { loadApod } from '../redux/actions/apodActions';

class Home extends React.Component {
  
  state = {
    date: '',
  }

  datePicker = () => {
      document.addEventListener('DOMContentLoaded', () => {
      var elems = document.querySelectorAll('.datepicker');
      const options = {
        autoClose: true,
        format: 'yyyy-mm-dd',
        onSelect: (date) => this.setState({ date }),
      }
      var instances = M.Datepicker.init(elems, options);
    });
  }

  async componentDidMount() {
    this.props.loadApod();
  }
  
  newApodPicture = (e) => {
    e.preventDefault();    
    this.props.loadApod(this.state.date);
  }

  render() {
    this.datePicker();
    return (
      <div className="container">
        <h3>Сегодня космос выглядит вот так</h3>
        <h3>Посмотри, как он выглядел в другие дни</h3>
        <div className="row">
          <input type="text" className="datepicker col s10" />
          <form onSubmit={this.newApodPicture}>
            <button className="btn" type="submit">Посмотреть</button>
          </form>
        </div>
        {this.props.loading && <Spinner />}
        {this.props.url && <img src={this.props.url} width="100%" alt={this.props.title}/>}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    loading: state.apodReducer.loading,
    url: state.apodReducer.url,
    title: state.apodReducer.title,
    error: state.apodReducer.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadApod: (date) => dispatch(loadApod(date)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
