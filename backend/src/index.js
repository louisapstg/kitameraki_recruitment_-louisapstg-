const http = require('http');
const url = require('url');
const cors = require('cors');
const itemController = require('./controllers/itemController');
const { errorResponse } = require('./controllers/response');

const server = http.createServer((req, res) => {
   req.parsedUrl = url.parse(req.url);
   const path = req.parsedUrl.pathname;

   cors()(req, res, () => {
      res.setHeader('Content-Type', 'application/json');

      if (req.method === 'GET') {
         if (path === '/items') {
            itemController.getItems(req, res);
         } else if (path.startsWith('/items/')) {
            itemController.getItemById(req, res);
         } else {
            errorResponse(404, 'Not Found', res);
         }
      } else if (req.method === 'POST' && path === '/items') {
         itemController.createItem(req, res);
      } else if (req.method === 'PUT' && path.startsWith('/items/')) {
         itemController.updateItem(req, res);
      } else if (req.method === 'DELETE' && path.startsWith('/items/')) {
         itemController.deleteItem(req, res);
      } else {
         itemController.errorResponse(405, 'Method not allowed', res);
      }
   });
});

const PORT = 3000;

server.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}/`);
});
