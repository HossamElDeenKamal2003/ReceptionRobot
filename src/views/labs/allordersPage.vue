<template>
  <div class="parent">
    <navNoAnmi />
    <div class="sidebar" :class="{ active: isActiveSidebar }">
      <router-link to="/allOrderslabs" style="text-decoration: underline"
        >All Orders <span>{{ diffrence }}</span> </router-link
      >
      <!-- <router-link to="/contact">Contact</router-link> -->
      <router-link to="/doctorLab">Doctors</router-link>
      <!-- <router-link to="/deliveryLabs">Delivery</router-link> -->
      <router-link to="/financeLabs">Finance</router-link>
    </div>
    <div class="content">
      <div class="header">
        <ul ref="list">
          <li tabindex="0">
            <button :disabled="isUsernameEmptyOrNull" class="filter" @click="filterAll">All</button>
          </li>
          <li tabindex="0">
            <button :disabled="isUsernameEmptyOrNull" class="filter" @click="filterunderway">underway</button>
          </li>
          <li tabindex="0">
            <button :disabled="isUsernameEmptyOrNull" class="filter" @click="filterend">End</button>
          </li>
          <li tabindex="0">
            <button :disabled="isUsernameEmptyOrNull" class="filter" @click="filterReady">Ready</button>
          </li>
          <li tabindex="0">
            <button :disabled="isUsernameEmptyOrNull" class="filter" @click="update">Update</button>
          </li>
        </ul>
        <div id="search-wrapper">
          <i class="bi bi-search search-icon"></i>
          <input
            type="text"
            id="search"
            v-model="searchTerm"
            @input="filterTableName"
            placeholder="Search"
          />
          <select name="" id="" v-model="selectedField">
            <option value="id">id</option>
            <option value="name">name</option>
            <option value="doctor">doctor</option>
          </select>
        </div>
      </div>
      <div class="subscribe">
        <button @click="manage_sub()" class="btn btn-primary">
          {{ message_sub }}
        </button>
      </div>
      <div class="data">
        <table style="width: 100%">
          <tr class="head">
            <th>ID</th>
            <th>Name</th>
            <th>From Doctor</th>
            <th>Status</th>
            <th>Modification Date</th>
            <th>Residual</th>
            <th>Been Paid</th>
            <th>Price</th>
            <th>End Order</th>
          </tr>
          <!-- <tr v-for="(order, index) in filteredOrders" :key="index" :style="{ border: check ? '2px solid green' : '' }> -->
            <tr :class="{ 'green-row': order.from_laboratory}" v-for="(order, index) in filteredOrders" :key="index"><td>{{ order.UID }}</td>
            <td>
              <router-link :to="'/showorder/' + order._id">{{
                order.patientName
              }}</router-link>
            </td>
            <td>{{ order.doc_id.username }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.updatedAt }}</td>
            <!-- <td>{{ order.price-order.paid }}</td> -->
            <!-- <td>{{ order.paid }}</td> -->
            <!-- <td>{{ order.price }}</td> -->
            <td>
              <input
                type="text"
                data-order-id="{{ order.id }}"
                :value="order.price-order.paid"
                disabled
                style="border-bottom: none"
                placeholder="0.00"
              />
            </td>
            <td>
              <input
                type="text" 
                :data-order-id="order._id"
                v-model="order.paid"
                @keyup.enter="update(order._id)"
              />
            </td>
            <td>
              <input
                type="text"
                data-order-id="{{ order.id }}"
                v-model="order.price"
              />
            </td>
            <td><button @click="markeOrder(order._id)" class="btn btn-primary btn-sm"><i :class="check ? 'bi bi-check' : 'bi bi-x'"></i></button></td>
            <!-- <td @click="deleteRow(order._id)"><i class="bi bi-trash"></i></td> -->
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
      ID: "",
      message_sub: "",
      toogle:false,
      searchTerm: "",
      //end_order: <i class="bi bi-x"></i>,
      end_order: false,
      //diffrence: 0,
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
      order_id: "",
      check:false,
      numberoforder: 0,
      //old_number: 0,
      new_number: 0,
      difference: 0,
    };
  },
  methods:{
  fetchData() {
    const role = localStorage.getItem('role');
    if (role === 'LAB') {
      axios.get('http://45.93.138.72:3000/labs/orders', {
        headers: {
          'Authorization': 'DEN ' + localStorage.getItem('token')
        }
      }).then((response) => {
        this.orders = response.data.reverse();
        this.filteredOrders = this.orders;
      }).catch((error) => {
        // Handle error
        console.error('An error occurred:', error.message);
      });
    } else {
      console.log('Unauthorized access: User role is not LAB');
      // You can handle unauthorized access here, such as showing a message or redirecting the user
    }
  },
  check_order(ID) {
    const role = localStorage.getItem('role');
    if (role === 'LAB') {
      const isUnderway = this.filteredOrders.find(order => order.UID === ID).status === 'Underway';
      axios.patch(`http://45.93.138.72:3000/labs/orders/${ID}`, {
        status: isUnderway ? 'Ready' : 'Underway'
      }, {
        headers: {
          'Authorization': 'DEN ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data);
        this.fetchData(); // Assuming fetchData fetches updated orders from the server
      }).catch(error => {
        console.error('An error occurred:', error.message);
      });
    } else {
      console.log('Unauthorized access: User role is not LAB');
      // You can handle unauthorized access here, such as showing a message or redirecting the user
    }
  },

  update(id) {
  axios.patch(`http://45.93.138.72:3000/labs/orders/paid/${id}`, {
    paid: this.filteredOrders.find(order => order._id === id).paid,
  }, {
    headers: {
      'Authorization': 'DEN ' + localStorage.getItem('token')
    }
  }).then(response => {
    console.log(response.data);
    this.fetchData();
  }).catch(error => {
    console.error('An error occurred:', error.message);
  });
},
  markeOrder(id){
    axios.patch(`http://45.93.138.72:3000/labs/orders/${id}`,{},{
      headers: {
            'Authorization': 'DEN ' + localStorage.getItem('token')
        }
    })
  },

  manage_sub() {
  const isSubscribed = localStorage.getItem('delSub') === 'true';
  const role = localStorage.getItem('role');
  if (role === 'LAB') {
    axios.patch('http://45.93.138.72:3000/labs/public', {
      publicDelivery: !isSubscribed,
    }, {
      headers: {
        'Authorization': 'DEN ' + localStorage.getItem('token')
      }
    }).then(response => {
      if (!isSubscribed) {
        this.message_sub = "Unsubscribe from Delivery";
        localStorage.setItem('delSub', 'true');
      } else {
        this.message_sub = "Subscribe in Delivery";
        localStorage.setItem('delSub', 'false');
      }
      console.log(response.data);
    }).catch(error => {
      console.error('An error occurred:', error.message);
    });
  } else {
    console.log('Unauthorized access: User role is not LAB');
    // You can handle unauthorized access here, such as showing a message or redirecting the user
  }
  },
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
  filterAll() {
    this.filteredOrders = this.orders;
  },
  filterunderway() {
    this.filteredOrders = this.orders.filter(order => order.status === "Underway");
  },
  filterend() {
    this.filteredOrders = this.orders.filter(order => order.status === "End");
  },
  filterReady() {
    this.filteredOrders = this.orders.filter(order => order.status === "Ready");
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
  created(){
    const isSubscribed = localStorage.getItem('delSub') === 'true';
    this.message_sub = isSubscribed ? 'Unsubscribe from Delivery' : 'Subscribe in Delivery';
    this.filterAll();
    }
};
</script>

<style scoped>
.green-row {
   /* border: 10px solid green;  */
    background-color: lightgreen;
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
</style>
