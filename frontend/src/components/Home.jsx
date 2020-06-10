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
  // console.log(props)
  async componentDidMount() {
    this.props.loadApod();
  }
  
  newApodPicture = (e) => {
    e.preventDefault();
    console.log(e.target);
    
    this.props.loadApod(this.state.date);
  }

  render() {
    this.datePicker();
    // console.log(this.props)
    return (
      <div className="container">
        <h3>Hello world</h3>
        <input type="text" className="datepicker" />
        <form onSubmit={this.newApodPicture}>
          <button className="waves-effect waves-light btn" type="submit">New pic</button>
        </form>
        {this.props.loading && <Spinner />}
        {this.props.url && <img src={this.props.url}/>}
      </div>
    )
  }

}

function mapStateToProps(state) {
  // console.log(state);
  return {
    loading: state.apodReducer.loading,
    url: state.apodReducer.url,
    error: state.apodReducer.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadApod: (date) => dispatch(loadApod(date)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
