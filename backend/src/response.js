const successResponse = (statusCode, payload, message, pagination, res) => {
   const response = {
      statusCode,
      payload,
      message,
      pagination,
   };
   res.statusCode = statusCode;
   res.end(JSON.stringify(response));
};

const errorResponse = (statusCode, message, res) => {
   const response = {
      statusCode,
      message,
   };
   res.statusCode = statusCode;
   res.end(JSON.stringify(response));
}

module.exports = { successResponse, errorResponse };