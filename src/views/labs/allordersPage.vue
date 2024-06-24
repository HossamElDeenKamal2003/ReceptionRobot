<template>
  <div class="parent">
    <navNoAnmi />
    <!-- <audio ref="ringSound" src="@/assets/ring.mp3" preload="auto"></audio> -->
    <div class="sidebar" :class="{ active: isActiveSidebar }">
      <router-link to="/allOrderslabs" style="text-decoration: underline">All Orders <span>{{ diffrence }}</span>
      </router-link>
      <!-- <router-link to="/contact">Contact</router-link> -->
      <router-link to="/doctorLab">Doctors</router-link>
      <router-link to="/Timing">Timing</router-link>
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
          <li>
            <button @click="pauseRing" class="btn btn-sm">pause</button>
          </li>
          <li tabindex="0">
            <!-- <button :disabled="isUsernameEmptyOrNull" v-for="(order, index) in filteredOrders" :key="index" class="filter" @click="clickUpdate(order)">Update</button> -->
          </li>
        </ul>
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
      <div>
        <!-- <audio controls ref="audio">
          <source src="" type="audio/ogg">
          <source src="../../assets/001.mp3" type="audio/mpeg">
          Your browser does not support the audio tag.
        </audio> -->
        <audio ref="audio" :src="require('../../assets/ring.wav')" loop></audio>
        <!-- <button @click="ring">click</button> -->
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
            <th>Been Paid</th>
            <th>Price</th>
            <th>Update</th>
            <th>End Order</th>
          </tr>
          <!-- <tr v-for="(order, index) in filteredOrders" :key="index" :style="{ border: check ? '2px solid green' : '' }> -->
          <tr v-for="(order, index) in filteredOrders" :key="index">
            <td>{{ order.UID }}</td>
            <td>
              <router-link :to="'/showorder/' + order._id">{{ order.patientName }}</router-link>
            </td>
            <td>{{ order.doc_id.username }}</td>
            <td class="status">{{ order.status }}</td>
            <td>{{ order.updatedAt }}</td>
            <td>
              <input type="text" :data-order-id="order._id" v-model="order.paid" @keyup.enter="update(order._id)" />
            </td>
            <td>
              <input type="text" :data-order-id="order._id" v-model="order.price" />
            </td>
            <td>
              <button @click="update(order._id)">Update</button>
            </td>
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
      ID: "",
      message_sub: "",
      toogle: false,
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
      check: false,
      numberoforder: 0,
      new_number: 0,
      difference: 0,
      firstLength: 0,
      secondLength: 0,
      flag: true,
    };
  },

  methods: {
    ring() {
      this.$refs.audio.play().catch(err => {
        console.log(err);
      })
    },
    fetchData() {
      const role = localStorage.getItem('role');
      if (this.flag === true) {
        if (role === 'LAB') {
          axios.get('https://dentist-backend-ts43.onrender.com/labs/orders', {
            headers: {
              'Authorization': 'DEN ' + localStorage.getItem('token')
            }
          }).then((response) => {
            this.orders = response.data.reverse();
            if (this.orders.length > this.filteredOrders.length) {
              this.$refs.audio.play().catch(err => {
                console.log(err);
              })
              this.filteredOrders = this.orders;
            }
            // this.filteredOrders.reverse();
          }).catch((error) => {
            if (error.response) {
              // Handle errors based on response status code
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
              console.log(error);
              // Handle network errors or errors without a response
            }
          });
        } else {
          console.log('Unauthorized access: User role is not LAB');
        }
      }
    },
    pauseRing() {
            if (this.$refs.audio) {
                this.$refs.audio.pause();
            }
        },
    check_order(ID) {
      const role = localStorage.getItem('role');
      if (role === 'LAB') {
        const isUnderway = this.filteredOrders.find(order => order.UID === ID).status === 'Underway';
        axios.patch(`https://dentist-backend-ts43.onrender.com/labs/orders/${ID}`, {
          status: isUnderway ? 'Ready' : 'Underway'
        }, {
          headers: {
            'Authorization': 'DEN ' + localStorage.getItem('token')
          }
        }).then(response => {
          console.log(response.data);
          this.fetchData();
        }).catch((error) => {
          if (error.response) {
            // Handle errors based on response status code
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
            // Handle network errors or errors without a response
            alert('Check your internet connection');
          }
        });
      } else {
        console.log('Unauthorized access: User role is not LAB');
      }
    },

    update(id) {
      axios.patch(`https://dentist-backend-ts43.onrender.com/labs/orders/paid/${id}`, {
        paid: this.filteredOrders.find(order => order._id === id).paid,
        price: this.filteredOrders.find(order => order._id).price
      }, {
        headers: {
          'Authorization': 'DEN ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data);
        this.fetchData();
      }).catch((error) => {
        if (error.response) {
          // Handle errors based on response status code
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
          // Handle network errors or errors without a response
          alert('Check your internet connection');
        }
      });
    },
    markOrder(orderId) {
      axios.patch(`https://dentist-backend-ts43.onrender.com/labs/orders/${orderId}`, {}, {
        headers: {
          'Authorization': 'DEN ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          this.end_order = true;
          console.log('Order marked successfully:', response.data);
          this.fetchData();
        })
        .catch((error) => {
          if (error.response) {
            // Handle errors based on response status code
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
            // Handle network errors or errors without a response
            alert('Check your internet connection');
          }
        });
    },

    manage_sub() {
      const isSubscribed = localStorage.getItem('delSub') === 'true';
      const role = localStorage.getItem('role');
      if (role === 'LAB') {
        axios.patch('https://dentist-backend-ts43.onrender.com/labs/public', {
          publicDelivery: !isSubscribed,
        }, {
          headers: {
            'Authorization': 'DEN ' + localStorage.getItem('token')
          }
        }).then(() => {
          if (!isSubscribed) {
            this.message_sub = "Unsubscribe from Delivery";
            localStorage.setItem('delSub', 'true');
          } else {
            this.message_sub = "Subscribe in Delivery";
            localStorage.setItem('delSub', 'false');
          }
          //console.log(response.data);
        }).catch((error) => {
          if (error.response) {
            // Handle errors based on response status code
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
            // Handle network errors or errors without a response
            alert('Check your internet connection');
          }
        });
      } else {
        console.log('Unauthorized access: User role is not LAB');
      }
    },
    filterTableName() {
      if (!this.searchTerm) {
        // If search term is empty, show all orders
        this.filteredOrders = this.orders;
        return;
      }
      const searchTermLowerCase = this.searchTerm.toLowerCase();
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
          order.doc_id.username && order.doc_id.username.toLowerCase().includes(searchTermLowerCase)
        );
      }
    },
    filterAll() {
      this.flag = true,
        this.filteredOrders = this.orders;
    },
    filterunderway() {
      this.flag = false;
      this.filteredOrders = this.orders.filter(order => order.status === "UNDERWAY(P)" || order.status === "UNDERWAY(F)");
    },
    filterend() {
      this.flag = false;
      this.filteredOrders = this.orders.filter(order => order.status === "END(P)" || order.status === "END(F)");
    },
    filterReady() {
      this.flag = false;
      this.filteredOrders = this.orders.filter(order => order.status === "LabReady(P)" || order.status === "LabReady(F)");
    },
  },

  mounted() {
    const username = localStorage.getItem('username');
    if (username !== '' && username !== null) {
      setInterval(() => {
        this.fetchData();
      }, 60000);
    }
  },
  created() {
    const isSubscribed = localStorage.getItem('delSub') === 'true';
    this.message_sub = isSubscribed ? 'Unsubscribe from Delivery' : 'Subscribe in Delivery';
    axios.get('https://dentist-backend-ts43.onrender.com/labs/orders', {
      headers: {
        'Authorization': 'DEN ' + localStorage.getItem('token')
      }
    }).then(response => {
      this.orders = response.data.reverse();
      this.filteredOrders = this.orders;
    })
  },
};
</script>

<style scoped>
.green-row {
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