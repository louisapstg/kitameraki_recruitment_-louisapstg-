const http = require('http');
const url = require('url');
const { successResponse, errorResponse } = require('./response');
const data = require('./data');

const server = http.createServer((req, res) => {
   const parsedUrl = url.parse(req.url);
   const path = parsedUrl.pathname;

   res.setHeader('Content-Type', 'application/json');

   if (req.method === 'GET') {
      if (path === '/items') {
         try {
            successResponse(200, data, 'Items retrieved successfully', data.length, res);
         } catch (e) {
            errorResponse(404, e.message, res);
         }
      } else if (path.startsWith('/items/')) {
         const itemId = parseInt(path.slice(7), 10);
         const item = data.find((item) => item.id === itemId);

         if (item) {
            successResponse(200, item, 'Item retrieved successfully', data.length, res);
         } else {
            errorResponse(404, 'Item not found', res);
         }
      } else {
         errorResponse(404, null, 'Not Found', null, res);
      }
   }

   else {
      errorResponse(405, 'Method not allowed', res);
   }
});

const PORT = 3000;

server.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}/`);
});
