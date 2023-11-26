const TasksAPI = {
    async getData(pageNumber) {
        try {
            const result = await fetch(
                `http://localhost:3000/items?page=${pageNumber}&pageSize=14`,
            );
            if (!result.ok)
                throw new Error("Network response failed to fetch items");
            const response = await result.json();
            return response;
        } catch (e) {
            const { message } = e;
            throw new Error(message);
        }
    },

    async postData(data) {
        try {
            const result = await fetch("http://localhost:3000/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!result.ok)
                throw new Error("Network response failed to post data");
            const response = await result.json();
            return response;
        } catch (e) {
            const { message } = e;
            throw new Error(message);
        }
    },

    async editData(id, newdata) {
        try {
            const result = await fetch(`http://localhost:3000/items/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newdata)
            })

            if (!result.ok) throw new Error("Network response failed to edit data")
            const response = await result.json()
            return response
        } catch (e) {
            const { message } = e
            throw new Error(message)
        }
    },

    async deleteData(id) {
        try {
            const result = await fetch(`http://localhost:3000/items/${id}`, {
                method: "DELETE",
            });

            if (!result.ok)
                throw new Error("Network response failed to delete data");
            const response = await result.json();
            return response;
        } catch (e) {
            const { message } = e;
            throw new Error(message);
        }
    },
};

export default TasksAPI;
