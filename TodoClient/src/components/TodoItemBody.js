import React from 'react';

export default class TodoItemBody extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
    this.handleItemCheck = this.handleItemCheck.bind(this);
  }

  handleDeleteBtnClick() {
    this.props.onDeleteBtnClick(this.props.id);
  }

  handleItemCheck(e) {
    this.props.onItemCheck(this.props.id, e.target.checked);
  }

  render() {
    return (
      <>
        <input
          type="checkbox"
          disabled={this.props.isCheckBoxDisabled}
          checked={this.props.isComplete}
          onChange={this.handleItemCheck}
        ></input>

        {this.props.nameField}

        {this.props.isShowingDeleteBtn &&
          <button
            type="button"
            onClick={this.handleDeleteBtnClick}
          >
            Delete
          </button>}
      </>
    );
  }
}

TodoItemBody.defaultProps = {
  isCheckBoxDisabled: false,
  isShowingDeleteBtn: true,
}