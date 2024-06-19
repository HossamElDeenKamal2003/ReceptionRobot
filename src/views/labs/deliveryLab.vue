<template>
    <div class="parent">
        <navNoAnmi />
        <div class="sidebar" :class="{ active: isActiveSidebar }">
            <router-link to="/allOrderslabs">All Orders <span>{{ difference }}</span></router-link>
            <router-link to="/doctorLab">Doctors</router-link>
            <router-link to="/Timing" style="text-decoration: underline">Timing</router-link>
            <router-link to="/financeLabs">Finance</router-link>
        </div>
        <div class="content">
            <div class="header">
                <div class="date">
                    <input type="date" v-model="selectedDate">
                    <button @click="filterByDate">Fetch</button>
                </div> 
                <div id="search-wrapper">
                    <i class="bi bi-search search-icon"></i>
                    <input type="text" id="search" v-model="searchTerm" @input="filterTableName" placeholder="Search" />
                    <select name="" id="" v-model="selectedField">
                        <option value="id">id</option>
                        <option value="name">name</option>
                        <option value="doctor">doctor</option>
                    </select>
                </div>
            </div>
            <div class="data">
                <table style="width: 100%">
                    <tr class="head">
                        <th>ID</th>
                        <th>Name</th>
                        <th>From Doctor</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>End Order</th>
                    </tr>
                    <tr v-for="(order, index) in filteredOrders" :key="index">
                        <td>{{ order.UID }}</td>
                        <td>
                            <router-link :to="'/showorder/' + order._id">{{ order.patientName }}</router-link>
                        </td>
                        <td>{{ order.doc_id.username }}</td>
                        <td class="status">{{ order.status }}</td>
                        <td>{{ formatDate(order.date) }}</td>
                        <td>
                            <button @click="markOrder(order._id)" class="btn btn-primary btn-sm">
                                <i :class="check ? 'bi bi-check' : 'bi bi-x'"></i>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import navNoAnmi from "@/components/global/navNoAnimation.vue";
import axios from "axios";

export default {
    name: "allOrderslabs",
    components: {
        navNoAnmi,
    },
    data() {
        return {
            selectedField: "id",
            searchTerm: "",
            selectedDate: "", // Store the selected date
            orders: [],
            filteredOrders: [],
            check: false,
            difference: 0,
        };
    },
    methods: {
        fetchData() {
            const role = localStorage.getItem('role');
            if (role === 'LAB') {
                axios.get('https://dentist-backend-ts43.onrender.com/labs/orders', {
                    headers: {
                        'Authorization': 'DEN ' + localStorage.getItem('token')
                    }
                }).then((response) => {
                    this.orders = response.data.reverse();
                    this.applyFilters();
                }).catch((error) => {
                    if (error.response) {
                        switch (error.response.status) {
                            case 400:
                                alert(error.message, 'try signing out and signing in again');
                                break;
                            case 401:
                                alert(error.response.data);
                                break;
                            default:
                                alert('An error occurred: ' + error.message);
                        }
                    } else {
                        alert('Check your internet connection');
                    }
                });
            } else {
                console.log('Unauthorized access: User role is not LAB');
            }
        },
        formatDate(date) {
            return date.split('T')[0];
        },
        filterByDate() {
            this.applyFilters();
        },
        filterTableName() {
            this.applyFilters();
        },
        applyFilters() {
            let filtered = this.orders;

            // Filter by date
            if (this.selectedDate) {
                filtered = filtered.filter(order => this.formatDate(order.date) === this.selectedDate);
            }

            // Filter by search term
            if (this.searchTerm) {
                const searchTermLowerCase = this.searchTerm.toLowerCase();
                if (this.selectedField === "id") {
                    filtered = filtered.filter(order => String(order.UID).includes(this.searchTerm));
                } else if (this.selectedField === "name") {
                    filtered = filtered.filter(order => order.patientName && order.patientName.toLowerCase().includes(searchTermLowerCase));
                } else if (this.selectedField === "doctor") {
                    filtered = filtered.filter(order => order.doc_id.username && order.doc_id.username.toLowerCase().includes(searchTermLowerCase));
                }
            }

            this.filteredOrders = filtered;
        },
        markOrder(orderId) {
            axios.patch(`https://dentist-backend-ts43.onrender.com/labs/orders/${orderId}`, {}, {
                headers: {
                    'Authorization': 'DEN ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    this.check = true;
                    console.log('Order marked successfully:', response.data);
                    this.fetchData();
                })
                .catch((error) => {
                    if (error.response) {
                        switch (error.response.status) {
                            case 400:
                                alert(error.message, 'try signing out and signing in again');
                                break;
                            case 401:
                                alert(error.response.data);
                                break;
                            default:
                                alert('An error occurred: ' + error.message);
                        }
                    } else {
                        alert('Check your internet connection');
                    }
                });
        },
        filterAll() {
            this.filteredOrders = this.orders;
        },
    },
    mounted() {
        const username = localStorage.getItem('username');
        if (username !== '' && username !== null) {
            this.fetchData();
            setInterval(() => {
                this.fetchData();
            }, 300000);
        }
    },
    created() {
        this.filterAll();
    },
};
</script>

<style scoped>
.green-row {
    background-color: lightgreen;
}

.date{
    display: flex;
    justify-content: space-around;
}

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

.status {
    color: #33a1f1;
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
}

input {
    text-align: center;
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

ul {
    list-style: none;
    font-size: 1.5em;
}

li {
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
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
    transition: 0.7s ease-in-out;
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

td input {
    outline: #33a1f1;
    border-right: none;
    border-left: none;
    border-top: none;
    border-bottom: 2px solid black;
}

input:focus {
    border-bottom: blue;
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

.update:focus {
    color: black;
}



@media only screen and (max-width: 840px) {
    .sidebar {
        margin-top: 80px;
    }

    table {
        margin-right: 100px;
        margin-right: -180px;
    }
}

@media only screen and (max-width: 426px) {
    .sidebar {
        margin-top: 0;
    }

    table {
        margin-right: -680px;
    }
}
</style>