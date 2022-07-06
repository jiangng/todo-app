import React from 'react';

export default class AddButton extends React.Component {
  render() {
    return (
      <button type="button" onClick={this.props.onClick}>
        List item
      </button>
    );
  }
}
