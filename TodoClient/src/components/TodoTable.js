import React from 'react';
import PropTypes from 'prop-types';
import AddButton from './AddButton';
import ItemList from './ItemList';
import withReordering from './withReordering';
import TodoListService from '../services/TodoListService';

// Since it's a pure func, can define it outside the class; better reusability too
const getDragOverEffectOnVerticalList = (itemIDList, dragID, dragOverID) => {
  const dragIndex = itemIDList.indexOf(dragID);
  const dragOverIndex = itemIDList.indexOf(dragOverID);
  return dragOverIndex >= dragIndex ? "bottom-highlight" : "top-highlight";
};

export default class TodoTable extends React.Component {
  constructor(props) {
    super(props);

    // Find the next available id for the new item added later
    const usedIDs = Object.keys(props.items)
    let maxID = 0
    usedIDs.forEach(id => {
      maxID = Math.max(parseInt(id), maxID)
    })

    this.state = {
      nextAvailableID: maxID + 1,
      wasNewItemCreated: null,
      initialActiveItemName: props.activeItemId
    };

    this.ItemListWithReordering = withReordering(ItemList, this.props.reorder, getDragOverEffectOnVerticalList);

    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleInputExit = this.handleInputExit.bind(this)
    this.handleBackspaceEmpty = this.handleBackspaceEmpty.bind(this)
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this)
  }

  handleAddButtonClick() {
    this.createNewItem(this.props.todoItemIDList.length)
  }

  handleInputExit(id, shouldUpdateName, createNewItem = false) {
    if (this.state.wasNewItemCreated) {
      this.saveNewItem(id)
      if (!createNewItem) 
        this.setState({ wasNewItemCreated: false });
    } else if (shouldUpdateName) {
      this.updateName(id)
    }

    if (createNewItem) {
      let insertIndex = this.props.todoItemIDList.indexOf(id) + 1
      this.createNewItem(insertIndex)
    } else {
      this.props.setNameEditingId(null);
    }
  }

  handleDeleteBtnClick(id) {
    this.props.onDeleteBtnClick(id)

    if (this.state.wasNewItemCreated) {
      this.setState({ wasNewItemCreated: false })
    }
  }

  handleBackspaceEmpty(id) {
    if (this.props.todoItemIDList.length <= 1) return

    const index = this.props.todoItemIDList.indexOf(id)
    if (index < 0) return

    const nextItemID = index > 0 ? this.props.todoItemIDList[index - 1] : this.props.todoItemIDList[1]
    this.props.onDeleteBtnClick(id)
    this.props.setNameEditingId(nextItemID)

    if (this.state.wasNewItemCreated) {
      this.setState({ wasNewItemCreated: false })
    }
  }

  createNewItem(insertIndex) {
    const newID = this.state.nextAvailableID;
    this.props.createTodoItem(newID, insertIndex);
    this.props.setNameEditingId(newID);

    this.setState(prevState => ({
      nextAvailableID: prevState.nextAvailableID + 1,
      wasNewItemCreated: true
    }));
  }

  saveNewItem(id) {
    const name = this.props.items[id];
    const insertIndex = this.props.todoItemIDList.indexOf(id)
    TodoListService.saveNewItem(id, name, insertIndex);
  }

  updateName(id) {
    const name = this.props.items[id];
    TodoListService.updateName(id, name);
  }

  render() {
    // ItemListWithReordering = withReordering(ItemList, this.props.reorder, getDragOverEffectOnVerticalList);

    return (
      <>
        <this.ItemListWithReordering
          itemIDList={this.props.todoItemIDList}
          items={this.props.items}
          isComplete={false}
          activeItemId={this.props.activeItemId}
          onItemNameClick={this.props.onItemNameClick}
          onItemNameChange={this.props.onItemNameChange}
          onInputExit={this.handleInputExit}
          onItemCheck={this.props.onItemCheck}
          onDeleteBtnClick={this.handleDeleteBtnClick}
          onBackspaceEmpty={this.handleBackspaceEmpty}
        ></this.ItemListWithReordering>
        <AddButton onClick={this.handleAddButtonClick}></AddButton>
      </>
    );
  }
}
TodoTable.propTypes = {
  todoItemIDList: PropTypes.array,
  items: PropTypes.object,
};
