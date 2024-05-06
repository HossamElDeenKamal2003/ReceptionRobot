<template>
    <div>
        <label for="users">Users</label>
        <br>
        <div class="search-bar">
            <input type="text" id="search" v-model="search">
            <select id="" v-model="selectSearch">
                <option value="id">id</option>
                <option value="id">name</option>
                <option value="id">role</option>
            </select>
        </div>
        <div class="user-content">
            <table id="users">
                <tr class="head">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Delete</th>
                </tr>
                <tr v-for="(user, index) in filteredUsers" :key="index">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.from }}</td>
                    <td>{{ user.to }}</td>
                    <td><i class="bi bi-trash"></i></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "adminPanel",
        data() {
            return {
                users: [
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "1", name: "Hossam", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                    { id: "2", name: "ahmed", role: "Doctor", from: "1/2/2003", to: "20/2/2023" },
                ],
                filteredUsers:[],
                search: "",
                selectSearch:"",
            };
        },
        created(){
            this.filteredUsers = this.users;
        },

        watch: {
            search(val) {
                if(this.selectSearch === name){
                    this.filteredUsers = this.users.filter((user) => {
                    return user.name.toLowerCase().includes(val.toLowerCase());
                 });
                }
            
            }
        }
    };
</script>

<style scoped>
label {
  color: #33a1f1;
  font-size: larger;
  font-style: bold;
  margin-top: 10px;
  margin-bottom: 10px;
}

#search {
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 20px;
}

.user-content {
  display: flex;
  justify-content: center;
  max-height: 70vh; /* Set maximum height */
  overflow: auto;
}

table {
  width: 70%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

/* Apply specific styling to table head */
.head {
  background-color: #33a1f1;
  color: white;
}

/* Remove fixed height for table rows */
table tr {
  border-bottom: 2px #33a1f1 solid;
  margin-top: 20px;
}

/* Add padding to table rows */
table tr td {
  padding: 10px;
}
</style>

