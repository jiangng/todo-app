import React from 'react'
import DormantTodoItem from './DormantTodoItem'
import ActiveTodoItem from './ActiveTodoItem'

export default class TodoItem extends React.Component {
  render() {
    return this.props.isActive ? (
      <ActiveTodoItem
        name={this.props.name}
        id={this.props.id}
        isComplete={this.props.isComplete}
        onDeleteBtnClick={this.props.onDeleteBtnClick}
        onItemCheck={this.props.onItemCheck}

        onInputExit={this.props.onInputExit}
        onItemNameChange={this.props.onItemNameChange}
        onBackspaceEmpty={this.props.onBackspaceEmpty}
      ></ActiveTodoItem>
    ) : (
      <DormantTodoItem
        name={this.props.name}
        id={this.props.id}
        isComplete={this.props.isComplete}
        onDeleteBtnClick={this.props.onDeleteBtnClick}
        onItemCheck={this.props.onItemCheck}

        onItemNameClick={this.props.onItemNameClick}
        onMouseEnterLeave={this.props.onMouseEnterLeave}
        reorderingProp={this.props.reorderingProp}
        isCheckBoxDisabled={this.props.isCheckBoxDisabled}
        isShowingDeleteBtn={this.props.isShowingDeleteBtn}
      ></DormantTodoItem>
    )
  }
}



