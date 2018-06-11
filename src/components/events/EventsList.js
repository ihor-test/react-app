import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchAll, eventListSelector } from '../../ducks/events';
import Loader from '../common/Loader';

class EventsList extends Component {
  componentDidMount() {
	this.props.fetchAll();
  }	

  render() {
    if (this.props.loading) return <Loader />;
    return (
	  <div>
	    <table>
            <tbody>
            {this.getRows()}
            </tbody>
        </table>
	  </div>
    );
  }
  getRows = () => this.props.events.map(this.getRow);
  getRow = (event) => {
      return (
          <tr key={event.uid}>
              <td>{event.title}</td>
              <td>{event.where}</td>
              <td>{event.month}</td>
          </tr>
      );
  };
}

export default connect(state => ({
	events: eventListSelector(state),
    loading: !!state[moduleName].loading,
}), { fetchAll })(EventsList);