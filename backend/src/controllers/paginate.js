const Paginate = (items, page = 1, pageSize = 10) => {
   const startIndex = (page - 1) * pageSize;
   const endIndex = startIndex + pageSize;

   const paginatedItems = items.slice(startIndex, endIndex);

   return {
      items: paginatedItems,
      pageInfo: {
         currentPage: page,
         totalPages: Math.ceil(items.length / pageSize),
         pageSize: pageSize,
         totalItems: items.length,
      },
   };
}

module.exports = Paginate