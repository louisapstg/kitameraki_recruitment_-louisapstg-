const http = require('http');
const url = require('url');
const port = 3000;

// In-memory data storage
const taskList = [
   {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1'
   },
   {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2'
   },
];


server.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
});
