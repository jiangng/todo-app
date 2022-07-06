import React from 'react';
import PropTypes from 'prop-types'

export default class NameInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleItemNameChange = this.handleItemNameChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.props.onClickOutsideTodoItem);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.props.onClickOutsideTodoItem);
  }

  handleKeyDown(e) {
    const key = e.key;
    if (key === 'Enter' || key === 'Escape') {
      this.props.onInputExit(this.props.id, key === 'Enter')
    } else if (key === 'Backspace') {
      //TODO
    }
  }

  handleItemNameChange(e) {
    this.props.onItemNameChange(this.props.id, e.target.value);
  }

  render() {
    return (
      <input
        type="text"
        value={this.props.name}
        onChange={this.handleItemNameChange}
        onKeyDown={this.handleKeyDown}
        autoFocus
      ></input>
    );
  }
}
NameInput.propTypes = {
  //id: PropTypes.string,
}