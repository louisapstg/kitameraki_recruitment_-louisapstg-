const TasksAPI = {
   async getData() {
      try {
         const result = await fetch(
            "http://localhost:3000/items?page=8&pageSize=14"
         );
         if (!result.ok) throw new Error("Network response failed to fetch items");
         const response = await result.json();
         return response
      } catch (e) {
         const { message } = e;
         throw new Error(message);
      }
   },

   async postData(data) {
      try {
         const result = await fetch("http://localhost:3000/items?page=1&pageSize=14", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
         })

         if (!result.ok) throw new Error("Network response failed to post data")
         const response = await result.json()
         return response
      } catch (e) {
         const { message } = e
         throw new Error(message)
      }
   }
}

export default TasksAPI