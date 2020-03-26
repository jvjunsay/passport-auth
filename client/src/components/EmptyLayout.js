import React, { Component } from 'react';

export class EmptyLayout extends Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default EmptyLayout;
