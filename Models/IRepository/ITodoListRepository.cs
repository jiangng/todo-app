using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todo_app.Models.IRepository
{
    public interface ITodoListRepository
    {
        Task<IEnumerable<TodoList>> GetTodoLists();
        Task<TodoList> GetTodoList(int userID, int listID);
        Task<TodoList> AddTodoList(TodoList todoList);
        Task UpdateTodoListAsync(TodoList todoList);
        void DeleteTodoList(int userID, int listID);
    }
}
