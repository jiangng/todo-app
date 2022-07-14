using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Morcatko.AspNetCore.JsonMergePatch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todo_app.Models;
using todo_app.Models.IRepository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace todo_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoListsController : ControllerBase
    {
        private readonly ITodoListRepository _repo;
        public TodoListsController(ITodoListRepository repo)
        {
            _repo = repo;
        }   

        // GET api/<TodoListsController>/5
        [HttpGet("{userID}/{listID}")]
        public async Task<TodoList> Get(int userID, int listID)
        {
            return await _repo.GetTodoList(userID, listID);
        }

        // POST api/<TodoListsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPut("reset/{userID}/{listID}")]
        public async Task<OkResult> ResetAsync(int userID, int listID)
        {
            var todoList = await _repo.GetTodoList(userID, listID);
            todoList.CheckedItemIDs.Clear();
            todoList.TodoItemIDs.Clear();
            todoList.Items.Clear();
            await _repo.UpdateTodoListAsync(todoList);
            return Ok();
        }

        //PATCH api/<TodoListsController>/1/1
        // Best practice to use either JSON Patch or JSON Merge Patch format to use HttpPatch
        [HttpPatch("{userID}/{listID}")]
        [Consumes(JsonMergePatchDocument.ContentType)]
        public async Task<IActionResult> Patch(int userID, int listID, [FromBody] JsonMergePatchDocument<TodoList> patch)
        {
            var todoList = await _repo.GetTodoList(userID, listID);

            patch.ApplyTo(todoList);

            await _repo.UpdateTodoListAsync(todoList);
            return Ok();
        }

        [HttpPatch("jsonpatch/{userID}/{listID}")]
        public async Task<IActionResult> JsonPatch(int userID, int listID, [FromBody] JsonPatchDocument<TodoList> patch)
        {
            var todoList = await _repo.GetTodoList(userID, listID);

            patch.ApplyTo(todoList);

            await _repo.UpdateTodoListAsync(todoList);
            return Ok();
        }


        // DELETE api/<TodoListsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
