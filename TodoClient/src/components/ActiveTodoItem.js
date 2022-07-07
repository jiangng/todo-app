import React from 'react';
import TodoItemBody from './TodoItemBody';
import NameInput from "./NameInput";

export default class ActiveTodoItem extends React.Component {
  constructor(props) {
    super(props);

    // https://reactjs.org/docs/refs-and-the-dom.html
    this.todoItemRef = React.createRef();

    this.handleClickOutsideTodoItem = this.handleClickOutsideTodoItem.bind(this);
  }

  handleClickOutsideTodoItem(e) {
    // Ref: React will assign the current property with the DOM element when the component mounts, and assign it back to null when it unmounts
    if (!this.todoItemRef.current.contains(e.target)) {
      this.props.onInputExit(this.props.id)
    }
  }

  render() {
    return (
      <li
        id={this.props.id}
      >
        <span
          ref={this.todoItemRef}
        >
          <TodoItemBody
            id={this.props.id}
            onDeleteBtnClick={this.props.onDeleteBtnClick}
            onItemCheck={this.props.onItemCheck}
            isComplete={this.props.isComplete}
            nameField={<NameInput
              id={this.props.id}
              name={this.props.name}
              onItemNameChange={this.props.onItemNameChange}
              onInputExit={this.props.onInputExit}
              onClickOutsideTodoItem={this.handleClickOutsideTodoItem}
              onBackspaceEmpty={this.props.onBackspaceEmpty}
            ></NameInput>}
          ></TodoItemBody>
        </span>
      </li>
    );
  }
}
