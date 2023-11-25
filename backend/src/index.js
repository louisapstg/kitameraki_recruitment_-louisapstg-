const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { successResponse, errorResponse } = require('./response');
const data = require('./data');
const Paginate = require('./paginate');

const server = http.createServer((req, res) => {
   const parsedUrl = url.parse(req.url);
   const path = parsedUrl.pathname;

   res.setHeader('Content-Type', 'application/json');

   if (req.method === 'GET') {
      if (path === '/items') {
         const queryParams = querystring.parse(parsedUrl.query);
         const page = parseInt(queryParams.page) || 1;
         const pageSize = parseInt(queryParams.pageSize) || 10;

         try {
            const paginatedData = Paginate(data, page, pageSize);
            successResponse(200, paginatedData, 'Items retrieved successfully', res);
         } catch (e) {
            errorResponse(404, e.message, res);
         }
      } else if (path.startsWith('/items/')) {
         const itemId = parseInt(path.slice(7), 10);
         const item = data.find((item) => item.id === itemId);

         if (item) {
            successResponse(200, item, 'Item retrieved successfully', res);
         } else {
            errorResponse(404, 'Item not found', res);
         }
      } else {
         errorResponse(404, 'Not Found', null, res);
      }
   }

   else if (req.method === 'POST' && path === '/items') {
      let body = ''
      req.on('data', (chunk) => {
         body += chunk
      })

      req.on('end', () => {
         try {
            if (!body.trim()) throw new Error("Request body is empty")
            const newItem = JSON.parse(body);
            if (!newItem.title) throw new Error("Missing required property '${title}'")
            newItem.description = newItem.description || ''
            newItem.id + 1;
            data.push(newItem);
            successResponse(201, newItem, "Data has been sent", res);
         } catch (e) {
            errorResponse(400, e.message, res);
         }
      })
   }

   else if (req.method === 'PUT' && path.startsWith('/items/')) {
      const itemId = parseInt(path.slice(7), 10);
      const itemIndex = data.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
         let body = '';

         req.on('data', (chunk) => {
            body += chunk;
         });

         req.on('end', () => {
            try {
               if (!body.trim()) throw new Error("Request body is empty.")
               const updatedItem = JSON.parse(body);
               if (!updatedItem.title) throw new Error("Missing required title property in the request body.");
               data[itemIndex] = {
                  title: updatedItem.title,
                  description: updatedItem.description || '',
                  id: itemId
               }
               successResponse(200, data[itemIndex], 'Item updated successfully', null, res);
            } catch (e) {
               errorResponse(400, e.message, res)
            }
         });
      } else {
         errorResponse(404, 'Item not found', res);
      }
   }

   else if (req.method === 'DELETE' && path.startsWith('/items/')) {
      const itemId = parseInt(path.slice(7), 10)
      const itemIndex = data.findIndex((item) => item.id === itemId)
      if (itemIndex !== -1) {
         const deletedItem = data.splice(itemIndex, 1)[0]
         successResponse(200, deletedItem, 'Item delete successfully', null, res);
      } else {
         errorResponse(404, 'Item not found', res);
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
