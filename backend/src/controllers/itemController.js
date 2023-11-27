const querystring = require('querystring');
const { successResponse, errorResponse } = require('./response');
const Paginate = require('./paginate');
const data = require('../models/data');

const generateId = () => {
   const maxId = data.reduce((max, item) => (item.id > max ? item.id : max), 0);
   return maxId + 1
}

const getItems = (req, res) => {
   const queryParams = querystring.parse(req.parsedUrl.query);
   const page = parseInt(queryParams.page) || 1;
   const pageSize = parseInt(queryParams.pageSize) || 10;

   try {
      const paginatedData = Paginate(data, page, pageSize);
      successResponse(200, paginatedData, 'Items retrieved successfully', res);
   } catch (e) {
      errorResponse(404, e.message, res);
   }
}

const getItemById = (req, res) => {
   const itemId = parseInt(req.parsedUrl.pathname.slice(7), 10);
   const item = data.find((item) => item.id === itemId);

   if (item) {
      successResponse(200, item, 'Item retrieved successfully', res);
   } else {
      errorResponse(404, 'Item not found', res);
   }
}

const createItem = (req, res) => {
   let body = '';

   req.on('data', (chunk) => {
      body += chunk;
   });

   req.on('end', () => {
      try {
         if (!body.trim()) throw new Error('Request body is empty');
         const newItem = JSON.parse(body);
         if (!newItem.title) throw new Error("Missing required property 'title'");
         newItem.description = newItem.description || '';
         newItem.id = generateId()
         data.push(newItem);
         successResponse(201, newItem, 'Data has been sent', res);
      } catch (e) {
         errorResponse(400, e.message, res);
      }
   });
}

const updateItem = (req, res) => {
   const itemId = parseInt(req.parsedUrl.pathname.slice(7), 10);
   const itemIndex = data.findIndex((item) => item.id === itemId);

   if (itemIndex !== -1) {
      let body = '';

      req.on('data', (chunk) => {
         body += chunk;
      });

      req.on('end', () => {
         try {
            if (!body.trim()) throw new Error('Request body is empty.');
            const updatedFields = JSON.parse(body);
            if (updatedFields.title) data[itemIndex].title = updatedFields.title;
            if (updatedFields.description !== undefined) data[itemIndex].description = updatedFields.description || '';
            successResponse(200, data[itemIndex], 'Item updated successfully', res);
         } catch (e) {
            errorResponse(400, e.message, res);
         }
      });
   } else {
      errorResponse(404, 'Item not found', res);
   }
}

const deleteItem = (req, res) => {
   const itemId = parseInt(req.parsedUrl.pathname.slice(7), 10);
   const itemIndex = data.findIndex((item) => item.id === itemId);

   if (itemIndex !== -1) {
      const deletedItem = data.splice(itemIndex, 1)[0];
      successResponse(200, deletedItem, 'Item deleted successfully', res);
   } else {
      errorResponse(404, 'Item not found', res);
   }
}

module.exports = {
   getItems,
   getItemById,
   createItem,
   updateItem,
   deleteItem,
};
