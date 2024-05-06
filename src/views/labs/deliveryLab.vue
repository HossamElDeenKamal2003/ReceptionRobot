<template>
    <div class="parent">
        <navBar />
        <div class="sidebar" :class="{ 'active': isActiveSidebar }">
            <router-link to="/allOrderslabs">All Orders</router-link>
            <router-link to="/contact">Contact</router-link>
            <router-link to="/doctorLab">Doctors</router-link>
            <!-- <router-link to="/deliveryLabs" style="text-decoration: underline;">Delivery</router-link> -->
            <router-link to="/financeLabs">Finance</router-link>
        </div>
        <div class="content">
            <div class="header">
                <div id="search-wrapper">
                    <i class="bi bi-search search-icon"></i>
                    <input type="text" id="search" v-model="searchTerm" @input="filterTableName" placeholder="Search">
                    <select name="" id="" v-model="selectedField">
                        <option value="id">id</option>
                        <option value="name">name</option>
                        <!-- <option value="doctor">doctor</option> -->
                    </select>
                </div>
            </div>
            <div class="data">
                <table style="width:100%; margin-top:80px;">
                    <tr class="head">
                        <th>ID</th>
                        <th>Name</th>
                        <th>From Doctor</th>
                        <th>Status</th>
                        <th @click="deleteRow">Delete</th>
                    </tr>
                    <tr v-for="(order, index) in filteredOrders" :key="index">
                        <!-- <td>{{ order.id }}</td> -->
                        <td>{{ order.letter_id }}</td>
                        <td>{{ order.name }}</td>
                        <td>{{ order.doctor_name }} </td>
                        <td>{{ order.status }}</td>
                        <td @click="deleteRow(order.id)"><i class="bi bi-trash"></i></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import navBar from "@/components/global/navBar.vue";
import axios from 'axios';
export default {
    name: "deliveryLab",
    components: {
        navBar,
    },
    data() {
        return {
            selectedField: "id",
            ID: "",
            searchTerm: "",
            data: {
                name: "hossam",
                fromDoctor: "",
                status: "",
                modificationDate: "",
            },
            orders: [
                
            ],
            filteredOrders: [],
            filterEnd: [],
            filterUnderWay: [],
            filterForSearch: "",
            searchFilter: "",
            searchFilterType: "id",
            fetchingData:true,
        };
    },
    methods: {
        
        filterTableName() {
            if (!this.searchTerm) {
                // If search term is empty, show all orders
                this.filteredOrders = this.orders;
                return;
            }
            const searchTermLowerCase = this.searchTerm.toLowerCase();
            // Filter orders based on selected field
            if (this.selectedField === "id") {
                this.filteredOrders = this.orders.filter(order =>
                    String(order.UID).includes(this.searchTerm)
                );
            } else if (this.selectedField === "name") {
                this.filteredOrders = this.orders.filter(order =>
                    order.patientName && order.patientName.toLowerCase().includes(searchTermLowerCase)
                );
            } else if (this.selectedField === "doctor") {
                this.filteredOrders = this.orders.filter(order =>
                    order.doctor_name && order.doctor_name.toLowerCase().includes(searchTermLowerCase)
                );
            }
        },
        deleteRow(orderId) {
            if (!confirm("Are you sure you want to delete this order?")) {
                return; // Do nothing if user cancels
            }
            axios.patch(`http://localhost:8000/api/delete_order/${orderId}/`)
                .then(response => {
                    console.log(response);
                    // Assuming response is successful, update your local data
                    this.orders = this.orders.filter(order => order.id !== orderId);
                    this.filteredOrders = this.filteredOrders.filter(order => order.id !== orderId);
                    console.log(`Order with id ${orderId} deleted successfully.`);
                })
                .catch(error => {
                    console.error("Error deleting order:", error);
                    // Handle error here
                });
        },
        
        fetchData() {
            if(this.fetchingData){
                let ApiUrl;
                if (this.filterForSearch == "") {
                    ApiUrl = 'http://127.0.0.1:8000/api/laboratory/all_orders/'
                }
                // else {
                //     ApiUrl = 'http://127.0.0.1:8000/api/laboratory/all_orders/?status=' + this.filterForSearch
                // }
                axios.get(ApiUrl).then(response => {
                    this.orders = response.data;
                    this.filteredOrders = this.orders;
                })
                    .catch(error => {
                        console.error("Error fetching data:", error);
                    });
            }
        },
    },
    watch: {
        searchTerm(newSearchTerm) {
            // Stop data fetching if search term is not empty
            if (newSearchTerm.trim() !== '') {
                this.fetchingData = false;
            } else {
                // Resume data fetching if search term is empty
                this.fetchingData = true;
                this.fetchData();
                setInterval(() => {
                    this.fetchData();
                }, 2000);
            }
        },
    },
    computed: {
        isUsernameEmptyOrNull() {
        const username = localStorage.getItem('username');
        return username === '' || username === null;
        }
    },
    mounted() {
        const username = localStorage.getItem('username');
        if (username !== '' && username !== null) { // Check if username is not empty and not null
            this.fetchData();
            setInterval(() => {
                this.fetchData();
            }, 2000);
        }
    },
    created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    },
    // Other component options...
    // watch: {
    //     orders: {
    //         handler() {
    //             axios.get('http://127.0.0.1:8000/api/laboratory/all_orders/')
    //                 .then(response => {
    //                     this.order_id = response.data.id;
    //                 }).catch(error => {
    //                     console.log(error);
    //                 });
    //             // Find the order with the specific ID
    //             const orderToUpdate = this.orders.find(order => order.id === this.order_id);
    //             if (orderToUpdate) {
    //                 axios.post(`http://localhost:8000/api/edit_order/${this.order_id}/`, {
    //                     been_payed: orderToUpdate.beenPaid,
    //                     not_payed: orderToUpdate.residual
    //                 }).then(response => {
    //                     console.log(response);
    //                 }).catch(error => {
    //                     console.error(error);
    //                 });
    //             }
    //         },
    //         deep: true
    //     }
    // },

}
</script>

<style scoped>
.sidebar {
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: #33a1f1;
    position: fixed;
    height: 100%;
    overflow: auto;
    transition: 0.5s;
}

.sidebar a {
    display: block;
    color: white;
    padding: 16px;
    text-decoration: none;
    transition: 0.7s ease-in-out;
}


.sidebar .activate {
    background-color: blue;
}

.header {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 10%;
    position: relative;
}

.header button {
    border: 2px solid black;
    border-radius: 50px;
    padding: 10px;
    margin-right: 50px;
    width: 150px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
}

.header button:focus {
    color: #33a1f1;
    border: 2px solid #33a1f1;
}

.header ul {
    margin-top: 15px;
}


td {
    font-style: bold;
}

.filter {
    border: none;
}

.filter:focus {
    color: #33a1f1;
    outline: none;
}

#search-wrapper {
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.276);
    align-items: stretch;
    border-radius: 50px;
    background-color: #fff;
    overflow: hidden;
    max-width: 400px;
    margin-top: 50px;
    position: absolute;
    right: 10px;
    top: -30px;
}


#search {
    border: none;
    width: 350px;
    font-size: 15px;
}

#search:focus {
    outline: none;
}

.search-icon {
    margin: 10px;
    color: #33a1f1;
}

#search-button {
    border: none;
    cursor: pointer;
    color: #fff;
    background-color: black;
    padding: 0px 10px;
    transition: .7s ease-in-out;
}

#search-button:hover {
    background-color: white;
    color: #33a1f1;
}


.data {
    display: flex;
    justify-content: center;
    overflow: auto;
}

table {
    height: fit-content;
    margin-top: 70px;
}

table tr {
    height: 10px;
    border-bottom: 2px #33a1f1 solid;
    margin-top: 20px;
}

.head {
    background-color: #33a1f1;
}

td i {
    cursor: pointer;
}

td i:hover {
    color: red;
}

table button {
    border: none;
}

.edit {
    text-decoration: underline;
    color: #33a1f1;
}

.sidebar {
    width: 100%;
    height: auto;
    position: relative;
}

.sidebar a {
    float: left;
}

.content {
    height: 100vh;
}

div.content {
    margin-left: 0;
}

table {
    margin-top: 15px;
}
</style>