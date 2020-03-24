import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signout } from '../../actions';

export class Signout extends Component {
  componentDidMount () {
    this.props.signout();
  }

  render () {
    return <div>Sign out</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { signout };

export default connect(mapStateToProps, mapDispatchToProps)(Signout);
