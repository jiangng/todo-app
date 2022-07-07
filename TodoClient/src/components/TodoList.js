import React from 'react'
import TodoHeader from './TodoHeader'
import CheckedTable from './CheckedTable'
import TodoTable from './TodoTable'
import TodoListService from '../services/TodoListService'

//Refactoring guide: https://levelup.gitconnected.com/refactoring-a-complex-react-component-5-best-practices-to-write-efficient-and-readable-components-b0d06f4f22b4

export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      todoItemIDList: [],
      checkedItemIDList: [],
      items: {},
      // activeItemId should be in TodoList so that CheckedTable can be disabled when something is active
      activeItemId: null,
      isDataLoaded: false
    }

    this.handleItemNameChange = this.handleItemNameChange.bind(this)
    this.handleItemNameClick = this.handleItemNameClick.bind(this)
    this.handleItemCheck = this.handleItemCheck.bind(this)
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this)
    this.createTodoItem = this.createTodoItem.bind(this)
    this.setNameEditingId = this.setNameEditingId.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.reorder = this.reorder.bind(this)
  }

  async componentDidMount() {
    const data = await TodoListService.initialize()
    this.setState({
      todoItemIDList: data.todoItemIDs,
      checkedItemIDList: data.checkedItemIDs,
      items: data.items,
      isDataLoaded: true
    })
  }

  createTodoItem(newID, insertIndex) {
    const todoItemIDList = this.state.todoItemIDList.slice()
    todoItemIDList.splice(insertIndex, 0, newID)

    const items = {...this.state.items}
    items[newID] = ''

    this.setState({
      todoItemIDList: todoItemIDList,
      items: items,
    })
  }

  setNameEditingId(id) {
    this.setState({
      activeItemId: id
    })
  }

  handleItemNameChange(id, value) {
    const items = {...this.state.items}
    items[id] = value

    this.setState({ items: items })
  }

  handleItemNameClick(id) {
    this.setNameEditingId(id)
  }

  removeItem(id) {
    let targetList
    let listName
    let backendListName
    if (this.state.todoItemIDList.includes(id)) {
      targetList = this.state.todoItemIDList
      listName = "todoItemIDList"
      backendListName = TodoListService.keys.TODO_ITEM_ID_LIST
    } else if (this.state.checkedItemIDList.includes(id)) {
      targetList = this.state.checkedItemIDList
      listName = "checkedItemIDList"
      backendListName = TodoListService.keys.CHECKED_ITEM_ID_LIST
    } else {
      return
    }
    targetList = targetList.slice()
    const index = targetList.indexOf(id)
    targetList.splice(index, 1)

    const items = {...this.state.items}
    delete items[id]

    this.setState({
      [listName]: targetList,
      items: items
    })

    TodoListService.deleteItem(id, index, backendListName)
  }

  handleDeleteBtnClick(id) {
    this.removeItem(id)
    if (this.state.activeItemId) 
      this.setNameEditingId(null)
  }

  handleItemCheck(id, isComplete) {
    // To prevent other checkboxes from working when there is an active item
    if (this.state.activeItemId && this.state.activeItemId !== id)
      return
    
    const todoItemIDList = this.state.todoItemIDList.slice()
    const checkedItemIDList = this.state.checkedItemIDList.slice()
    
    const shrinkingList = isComplete ? todoItemIDList : checkedItemIDList
    const expandingList = isComplete ? checkedItemIDList : todoItemIDList
    const shrinkingListName = isComplete ? TodoListService.keys.TODO_ITEM_ID_LIST : TodoListService.keys.CHECKED_ITEM_ID_LIST
    const index = shrinkingList.indexOf(id)
    if (index > -1) {
      shrinkingList.splice(index, 1)
      expandingList.push(id)
    }

    this.setState({
      todoItemIDList: todoItemIDList,
      checkedItemIDList: checkedItemIDList,
      activeItemId: null,
    })

    TodoListService.checkItem(id, index, shrinkingListName)
  }

  reorder(dragID, dropID) {
    if (dragID === dropID) {
      return
    }

    const list = this.state.todoItemIDList.slice() 
    const dragIDIndex = list.indexOf(dragID)
    const dropIDIndex = list.indexOf(dropID)
    let insertIndex
    let removeIndex
    if (dragIDIndex > dropIDIndex) {
      insertIndex = dropIDIndex
      removeIndex = dragIDIndex + 1
    } else {
      insertIndex = dropIDIndex + 1
      removeIndex = dragIDIndex
    }
    list.splice(insertIndex, 0, dragID)
    list.splice(removeIndex, 1)

    this.setState({
      todoItemIDList: list
    })

    TodoListService.mergePatch({ [TodoListService.keys.TODO_ITEM_ID_LIST]: list })
  }

  render() {
    if (!this.state.isDataLoaded)
      return (<div>Loading data</div>)

    return (
      <div className="todo-list">
        <TodoHeader title={this.props.title}></TodoHeader>
        <TodoTable 
          items={this.state.items} 
          todoItemIDList={this.state.todoItemIDList} 
          activeItemId={this.state.activeItemId}
          onDeleteBtnClick={this.handleDeleteBtnClick}
          onItemNameChange={this.handleItemNameChange}
          onItemCheck={this.handleItemCheck}
          onItemNameClick={this.handleItemNameClick}
          createTodoItem={this.createTodoItem}
          setNameEditingId={this.setNameEditingId}
          removeItem={this.removeItem}
          reorder={this.reorder}
        ></TodoTable>
        <hr></hr>
        <CheckedTable
          items={this.state.items}
          checkedItemIDList={this.state.checkedItemIDList}
          onItemCheck={this.handleItemCheck}
          onDeleteBtnClick={this.handleDeleteBtnClick}
        ></CheckedTable>
      </div>
    )
  }
}