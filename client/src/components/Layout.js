import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import requireAuth from './requireAuth';

export class Layout extends Component {
  render () {
    return (
      <div>
        <Sidebar />
        <div className='pusher' style={{ marginTop: '10px' }}>
          <div className='ui container'>
            layout
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const conn = connect(mapStateToProps, mapDispatchToProps)(requireAuth(Layout));

export default conn;
