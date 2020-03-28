import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import requireAuth from './requireAuth';
import SignOut from '../components/auth/Signout';

export class Layout extends Component {
  render () {
    return (
      <div>
        <Sidebar />
        <div className='ui top attached demo menu' style={{ marginTop: '0px' }}>
          <a id='toggle' className='item'>
            <i className='sidebar icon' />
            Menu
          </a>

          <div className='right menu'>
            <div className='item'>
              <SignOut />
            </div>
          </div>
        </div>
        <div className='pusher'>
          <div className='ui container'>
            <h1>Default Layout</h1>

            {this.props.children}
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
