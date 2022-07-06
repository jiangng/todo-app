
const USER_ID = 1
const TODOLIST_ID = 1

const TodoListService = {
  keys: {
    ITEMS: 'Items',
    TODO_ITEM_ID_LIST: 'TodoItemIDs',
    CHECKED_ITEM_ID_LIST: 'CheckedItemIDs'
  },

  initialize: async function() {
    const response = await fetch(`/api/todolists/${USER_ID}/${TODOLIST_ID}`)
    const data = await response.json()
    
    return data
  },

  mergePatch: function (data) {
    fetch(`/api/todolists/${USER_ID}/${TODOLIST_ID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/merge-patch+json' },
      body: JSON.stringify(data)
    })
  },

  jsonPatch: function (operations) {
    fetch(`/api/todolists/jsonpatch/${USER_ID}/${TODOLIST_ID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json-patch+json' },
      body: JSON.stringify(operations)
    })
  },

  saveNewItem: function (id, name, insertIndex) {
    const operations = [
      { "op": "add", "path": `/items/${id}`, "value": name },
      { "op": "add", "path": `/todoitemids/${insertIndex}`, "value": id}
    ]
    this.jsonPatch(operations)
  },

  updateName: function (id, name) {
    const operations = [
      { "op": "replace", "path": `/items/${id}`, "value": name }
    ]
    this.jsonPatch(operations)
  },

  deleteItem(id, index, listName) {
    const operations = [
      { "op": "remove", "path": `/${listName}/${index}` },
      { "op": "remove", "path": `/items/${id}`}
    ]
    this.jsonPatch(operations)
  },

  checkItem(id, index, shrinkingListName) {
    const expandingListName = shrinkingListName === this.keys.TODO_ITEM_ID_LIST ? this.keys.CHECKED_ITEM_ID_LIST : this.keys.TODO_ITEM_ID_LIST
    const operations = [
      { "op": "remove", "path": `/${shrinkingListName}/${index}` },
      { "op": "add", "path": `/${expandingListName}/-`, "value": id }
    ]
    this.jsonPatch(operations)

  }

}

export default TodoListService