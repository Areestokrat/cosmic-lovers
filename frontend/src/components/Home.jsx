import React from 'react';
import {connect} from 'react-redux';
import M from 'materialize-css';
import Spinner from './Spinner';
import { loadApod } from '../redux/actions/apodActions';

class Home extends React.Component {
  
  datePicker = () => {
      document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.datepicker');
      const options = {
        autoClose: true,
      }
      var instances = M.Datepicker.init(elems, options);
    });
  }
  // console.log(props)
  async componentDidMount() {
    this.props.loadApod();
  }

  render() {
    this.datePicker();
    // console.log(this.props)
    return (
      <div className="container">
        <h3>Hello world</h3>
        <input type="text" className="datepicker" />
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

export default connect(mapStateToProps, 
  {
    loadApod,
  })(Home);
