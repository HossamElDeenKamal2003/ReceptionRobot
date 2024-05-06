<template>
    <div class="parent">
        <navNoAnmi />
        <div class="sidebar" :class="{ 'active': isActiveSidebar }">
            <router-link to="/allOrderslabs" style="text-decoration: underline;">All Orders</router-link>
            <router-link to="/financeDel">Finance</router-link>
        </div>
        <div class="content">
            <div class="header" style="margin-top: 15px;">
                <ul ref="list">
                    <li tabindex="0"><button class="filter" @click="fetchData">All</button></li>
                    <li tabindex="0"><button class="filter" @click="filterend">End</button></li>
                </ul>
                <div id="search-wrapper">
                    <i class="bi bi-search search-icon"></i>
                    <input type="text" id="search" v-model="searchTerm" @input="filterTableName" placeholder="Search">
                    <select name="" id="" v-model="selectedField">
                        <option value="id">id</option>
                        <option value="name">name</option>
                        <option value="from">from</option>
                    </select>
                </div>
            </div>
            <div class="data">
                <table style="width:100%;">
                    <tr class="head">
                        <th>ID</th>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr v-for="(order, index) in filteredOrders" :key="index">
                        <!-- <td>{{ order.id }}</td> -->
                        <td>{{ order.UID }}</td>
                        <td>{{ order.patientName }}</td>
                        <!-- <td>{{ order.doctor_name }} </td> -->
                        <td>
                            <button v-if="order.doc_id" @click="addressDoc(order.doc_id.buildNo, order.doc_id.floorNo, order.doc_id.username, order.doc_id.address)">{{ order.doc_id.username }}</button>
                        </td>
                        <td>
                            <button v-if="order.doc_id" @click="addressDoc(order.lab_id.buildNo, order.lab_id.floorNo, order.lab_id.username, order.lab_id.address)">{{ order.lab_id.username }}</button>
                        </td>
                        <td>
                            {{ order.status }}
                        </td>
                        <td>
                            <button @click="order.status === 'OTW_LAB' ? underwaOrder(order._id) : takeOrder(order._id)">
                                {{ order.status === 'LabReady' || order.status === 'Underway' ? 'Take Order' : (order.status === 'OTW_LAB' ? 'Delivered' : '') }}
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
import axios from 'axios';
export default {
    name: "allOrderslabs",
    components: {
        navNoAnmi,
    },
    data() {
        return {
            click: false,
            color: "blue",
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
            filterForSearch: "",
            filteredOrders: [],
            filterEnd: [],
            filterUnderWay: [],
            fetchingData: true,
            searchFilter: "",
            searchFilterType: "id",
            order_id: "",
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
        fetchData(){
                axios.get('http://45.93.138.72:3000/deliverers/orders',{
                    headers: {
                        'Authorization': 'DEN ' + localStorage.getItem('token')
                    }
                }).then((response)=>{
                    this.orders = response.data.filter(order => order.status !== 'End');
                    this.filteredOrders = this.orders;
                    console.log(this.filteredOrders);
                    
                }).catch((error) => {
                    console.error('Error fetching data:', error);
                });
            },
            addressDoc(buildingno, floorno, name, address){
                alert("Doctor : " + name +'\n' + "Address : " + address + '\n' + "Building Number : " + buildingno + '\n' + "Floor Number : " + floorno);
            },
            filterend() {
                axios.get('http://45.93.138.72:3000/deliverers/orders/myOrders', {
                    headers: {
                        'Authorization': 'DEN ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    this.orders = response.data.filter(order => order.status !== 'DocReady');
                    this.filteredOrders = this.orders;
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        this.filteredOrders = [];
                        alert("No data available");
                    }
                });
            },
            takeOrder(id) {
                axios.patch(`http://45.93.138.72:3000/deliverers/orders/otw/${id}`, {}, {
                    headers: {
                        'Authorization': 'DEN ' + localStorage.getItem('token')
                    }
                })
            },
            underwaOrder(id){
                axios.patch(`http://45.93.138.72:3000/deliverers/orders/lab/delivered/${id}`,{},{
                    headers: {
                        'Authorization': 'DEN ' + localStorage.getItem('token')
                    }
                })
            }
        },
        
    created(){
        this.fetchData();
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
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 10%;
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
</style>
