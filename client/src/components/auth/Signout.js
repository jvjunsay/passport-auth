import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signout } from '../../actions';
import history from '../../history';

export class Signout extends Component {
  handleClick = () => {
    debugger;
    this.props.signout();
    history.push('/');
  };

  render () {
    return <button onClick={this.handleClick} className='ui primary button'>Sign Out</button>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { signout };

export default connect(mapStateToProps, mapDispatchToProps)(Signout);
