using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.DataModel;

namespace todo_app.Models
{
    [DynamoDBTable("TodoList")]
    public class TodoList
    {
        [DynamoDBRangeKey]
        public int ListID { get; set; }

        [DynamoDBHashKey]
        public int UserID { get; set; }

        [DynamoDBProperty]
        public string Title { get; set; }

        [DynamoDBProperty]
        public List<int> TodoItemIDs { get; set; }

        [DynamoDBProperty]
        public List<int> CheckedItemIDs { get; set; }

        [DynamoDBProperty]
        public Dictionary<string, string> Items { get; set; }

    }
}
