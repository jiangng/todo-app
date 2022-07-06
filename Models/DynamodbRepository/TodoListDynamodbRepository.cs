using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todo_app.Models.IRepository;

namespace todo_app.Models.DynamodbRepository
{
    public class TodoListDynamodbRepository : ITodoListRepository
    {
        private readonly IDynamoDBContext _context;
        public TodoListDynamodbRepository(IDynamoDBContext context)
        {
            _context = context;
        }

        public async Task<TodoList> GetTodoList(int userID, int listID)
        {
            return await _context.LoadAsync<TodoList>(userID, listID);
        }

        public Task<TodoList> AddTodoList(TodoList todoList)
        {
            throw new NotImplementedException();
        }
            
        public void DeleteTodoList(int userID, int listID)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TodoList>> GetTodoLists()
        {
            throw new NotImplementedException();
        }

        public async Task UpdateTodoListAsync(TodoList todoList)
        {
            // Config is needed to map C# list type to Dynamodb list type
            await _context.SaveAsync(todoList, new DynamoDBOperationConfig 
            {
                Conversion = DynamoDBEntryConversion.V2,
                IsEmptyStringValueEnabled = true
            });
        }
    }
}
