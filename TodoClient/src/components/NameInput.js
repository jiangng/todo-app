import React from 'react';

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
    switch (key) {
      case 'Enter':
      case 'Escape':
        this.props.onInputExit(this.props.id, this.props.shouldUpdateName, key === 'Enter')
        break
      case 'Backspace':
        if (this.props.name === '') {
          this.props.onBackspaceEmpty(this.props.id)
          // Call preventDefault to cancel keypress event, which is the default event triggered after keydown that will trigger onchange for the next active item
          e.preventDefault() 
        }
        break
      default:
        return
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
