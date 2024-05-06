<template>
    <div class="parent">
        <navNoAnmi />
        <div class="sidebar" :class="{ 'active': isActiveSidebar }">
            <router-link to="/newOrder">New Order</router-link>
            <router-link to="/allorders">All Orders</router-link>
            <router-link to="/delievry" style="text-decoration: underline;">Delivery</router-link>
            <!-- <router-link to="/finance">Finance</router-link> -->
        </div>
        <div class="content">
            <div class="header">
                <ul ref="list">
                    <li tabindex="0"><button :disabled="isUsernameEmptyOrNull" class="filter" @click="filterAll">All</button></li>
                    <li tabindex="0"><button :disabled="isUsernameEmptyOrNull" class="filter" @click="filterunderway">Underway</button> </li>
                    <li tabindex="0"><button :disabled="isUsernameEmptyOrNull" class="filter" @click="filterend">End</button></li>
                </ul>
                <div id="search-wrapper">
                    <i class="bi bi-search search-icon"></i>
                    <input type="text" id="search" v-model="searchTerm" @input="filterTableName" placeholder="Search">
                    <select name="" id="" v-model="selectedField">
                        <option value="id">id</option>
                        <option value="name">name</option>
                    </select>
                </div>
            </div>
            <div class="data">
                <table style="width:100%;">
                    <tr class="head">
                        <th>ID</th>
                        <th>Name</th>
                        <!-- <th>Action</th> -->
                        <th>Sent Date</th>
                        <th>Status</th>
                        <!-- <th style="margin-right:15px;">Modification Date</th> -->
                        <th @click="deleteRow">Delete</th>
                    </tr>
                    <tr v-for="(order, index) in filteredOrders" :key="index">
                        <!-- <td>{{ order.id }}</td> -->
                        <td>{{ order.UID}}</td>
                        <td>{{ order.patientName }}</td>
                        <!-- Access order name -->
                        <!-- <td><router-link to="/edit" class="edit">Edit</router-link></td> -->
                        <td>{{ order.last_updated }}</td> <!-- Access last_updated -->
                        <td>
                            <h5>{{ order.status }}</h5>
                        </td> <!-- Access order status -->
                        <td @click="deleteRow(order.id)"><i class="bi bi-trash"></i></td> <!-- Pass index to deleteRow -->
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import navNoAnmi from "@/components/global/navNoAnimation.vue";
import axios from 'axios';

export default {
    name: "allOrders",
    components: {
        navNoAnmi,
    },
    data() {
        return {
            searchTerm: "",
            selectedField: "id",
            orders: [
                
            ], // Initialize as an empty array
            filteredOrders: [], // Initialize as an empty array
            status: "",
            fetchingData: true,
        };
    },
    computed: {
        isUsernameEmptyOrNull() {
        const username = localStorage.getItem('username');
        return username === '' || username === null;
        }
    },
    methods: {
        filterTableName() {
                if (!this.searchTerm) {
                    // If search term is empty, show all orders
                    this.filteredOrders = this.orders;
                    return;
                }

            // Convert search term to lowercase for case-insensitive search
            const searchTermLowerCase = this.searchTerm.toLowerCase();

            // Filter orders based on selected field
            if (this.selectedField === "id") {
                this.filteredOrders = this.orders.filter(order =>
                    String(order.letter_id).includes(this.searchTerm)
                );
            } else if (this.selectedField === "name") {
                this.filteredOrders = this.orders.filter(order =>
                    order.name.toLowerCase().includes(searchTermLowerCase)
                );
            } else if (this.selectedField === "doctor") {
                this.filteredOrders = this.orders.filter(order =>
                    order.doctor_name.toLowerCase().includes(searchTermLowerCase)
                );
            }
        },
        filterunderway() {
            this.fetchingData = false; // Stop fetching data
            axios.get('http://127.0.0.1:8000/api/doctor/all_orders/?status=u').then(response => {
                this.orders = response.data;
                this.orders.forEach(order => {
                    order.status = "UnderWay";
                });
                this.filteredOrders = this.orders;
            }).catch(error => {
                console.log(error);
            });
        },
        filterend() {
            this.fetchingData = false; // Stop fetching data
            axios.get('http://127.0.0.1:8000/api/doctor/all_orders/?status=e').then(response => {
                this.orders = response.data;
                this.orders.forEach(order => {
                    order.status = "End";
                });
                this.filteredOrders = this.orders;
            }).catch(error => {
                console.log(error);
            });
        },

        filterAll() {
            this.fetchingData = true; // Resume fetching data
            this.filteredOrders = this.orders;
        },
        fetchData() {
            if (this.searchTerm.trim() !== "") {
                return;
            }
            if(this.fetchingData){
            axios.get('http://45.93.138.72:3000/doctors/orders',{
                headers: {
                    'Authorization': 'DEN ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    // console.log("Response:", response.data);
                    // this.orders = response.data;
                    // this.filteredOrders = this.orders;
                    // this.orders.forEach(order => {
                    //     order.beenPaid = response.data.been_payed;
                    //     order.residual = response.data.not_payed;
                    // })
                    // this.orders.forEach(order => {
                    //     if (order.status === 'u') {
                    //         order.status = "UnderWay";
                    //     } else if (order.status === 'e') {
                    //         order.status = "End";
                    //     }
                    // });
                    this.orders = response.data;
                    this.filteredOrders = this.orders;
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
            }
        },
        deleteRow(orderId) {
        if (!confirm("Are you sure you want to delete this order?")) {
            return; // Do nothing if user cancels
        }

        axios
            .patch(`http://localhost:8000/api/delete_order/${orderId}/`)
            .then((response) => {
            console.log(response);
            // Assuming response is successful, update your local data
            this.orders = this.orders.filter((order) => order.id !== orderId);
            this.filteredOrders = this.filteredOrders.filter(
                (order) => order.id !== orderId
            );
            console.log(`Order with id ${orderId} deleted successfully.`);
            })
            .catch((error) => {
            console.error("Error deleting order:", error);
            // Handle error here
            });
        },
    },
    mounted() {
        // Fetch data from the API
        const username = localStorage.getItem('username')
            if(username !== '' && username !== null){
            this.fetchData();
            //this.filteredOrders = this.orders;
        }
    },
    created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
};
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
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10%;
}

.header ul {
    margin-top: 15px;
}

ul {
    list-style: none;
    font-size: 1.5em;
}

li {
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
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
}

ul li button {
    border: none;
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

button {
    outline: none;
}
</style>
