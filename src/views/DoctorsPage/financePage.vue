<template>
    <div>
        <navNoAnmi />
        <div class="sidebar" :class="{ 'active': isActiveSidebar }">
            <router-link to="/newOrder">New Order</router-link>
            <router-link to="/allorders">All Orders</router-link>
            <router-link to="/delievry">Delivery</router-link>
            <!-- <router-link to="/finance" style="text-decoration: underline;">Finance</router-link> -->
        </div>
        <div class="content">
            <div class="header">
                <ul ref="list">
                    <li tabindex="0"><button :disabled="isUsernameEmptyOrNull" class="filter" @click="filterAll">All</button></li>
                    <li tabindex="0"><button :disabled="isUsernameEmptyOrNull"  class="filter" @click="filterunderway">Underway</button> </li>
                    <li tabindex="0"><button :disabled="isUsernameEmptyOrNull"  class="filter" @click="filterend">End</button></li>
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
                        <th>Been Paid</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </tr>
                    <tr v-for="(order, index) in filteredOrders" :key="index">
                        <td>{{ order.UID }}</td>
                        <td>{{ order.username }}</td>
                        <td>{{ order.paid }}</td>
                        <td>{{ order.price }}</td>
                        <td>{{ order.status }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import navNoAnmi from "@/components/global/navNoAnimation.vue";
export default {
    name: 'financePage',
    components: {
        navNoAnmi,
    },
    data() {
        return {
            searchTerm: "",
            selectedField: "id",
            orders: [
                
            ],
            filteredOrders: [],
            filterEnd: [],
            filterUnderWay: [],
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
            axios.get('https://dentist-backend-ts43.onrender.com/api/doctor/all_orders/?status=u').then(response => {
                this.orders = response.data;
                this.orders.forEach(order => {
                    order.status = "UnderWay";
                    order.beenPaid = order.been_payed; // Assuming these fields are present in your API response
                    order.residual = order.not_payed;
                    order.total = order.price;
                });
                this.filteredOrders = this.orders;
            }).catch(error => {
                console.log(error);
            });
        },
        filterend() {
            this.fetchingData = false; // Stop fetching data
            axios.get('https://dentist-backend-ts43.onrender.com/api/doctor/all_orders/?status=e').then(response => {
                this.orders = response.data;
                this.orders.forEach(order => {
                    order.status = "End";
                    order.beenPaid = order.been_payed; // Assuming these fields are present in your API response
                    order.residual = order.not_payed;
                    order.total = order.price;
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
        deleteRow(orderId) {
            const response = axios.get('https://dentist-backend-ts43.onrender.com/api/doctor/all_orders/');
            const order_id = response.data.id;
            axios.delete(`https://dentist-backend-ts43.onrender.com/api/delete_order/${order_id}/`).then(() => {
                alert("Item Deleted Successfully");
                const index = this.orders.findIndex(order => order.id === orderId);
                if (index !== -1) {
                    // Remove the order from the orders array
                    this.orders.splice(index, 1);
                    // Update filteredOrders if needed
                    this.filteredOrders = this.orders;
                }
            }).catch(error => {
                console.log(error);
                alert("Error In Delete Order")
            })
        },
        fetchData() {
            if (this.searchTerm.trim() !== "") {
                return;
            }
            if(this.fetchingData){
            axios.get('https://dentist-backend-ts43.onrender.com/doctors/financial',{
                headers: {
                'Authorization': 'DEN ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    console.log("Response:", response.data);
                    this.orders = response.data;
                    this.filteredOrders = this.orders;
                    // this.filteredOrders = this.orders;
                    // this.orders.forEach(order => {
                    //     order.beenPaid = order.been_payed;
                    //     order.residual = order.not_payed;
                    //     order.total = order.price;
                    // })
                    // this.orders.forEach(order => {
                    //     if (order.status === 'u') {
                    //         order.status = "UnderWay";
                    //     } else if (order.status === 'e') {
                    //         order.status = "End";
                    //     }   
                    // });
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
            }
        },
    },
    mounted() {
        const username = localStorage.getItem('username');
            if(username !== '' && username !== null){
            this.fetchData();
            // setInterval(() => {
            //     this.fetchData();
            // }, 2000);
            // this.filteredOrders = this.orders;
        }
    },

    created() {
        //const username = localStorage.getItem('username');
        // if (username !== '' && username !== null) {
        //     this.fetchData(); // Call fetchData method here
        // }
        //axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
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
