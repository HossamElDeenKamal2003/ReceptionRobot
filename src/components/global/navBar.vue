<template>
    <div class="parent">
        <div class="logo" style="display:flex;">
            <h1>Recption</h1>
            <h1 class="llab" style="color:#33A1F1;">Robot</h1>
            <div>
                <!-- <audio controls ref="audio">
                    <source src="" type="audio/ogg">
                    <source src="../../assets/001.mp3" type="audio/mpeg">
                    Your browser does not support the audio tag.
                </audio> -->
                <audio ref="audio" :src="require('../../assets/ring.wav')" loop></audio>
                <!-- <button @click="ring">click</button> -->
            </div>
        </div>
        <!-- <div class="logo">
            <img src="@/assets/logo.jpeg" alt="logo">
        </div> -->
        <nav>
            <router-link class="router" to="/" exact>
                <span class="image-container">
                    <img src="@/assets/dental.jpg" alt="" height="30px" width="40px">
                </span>
                Home
            </router-link>
            <router-link class="router" to="/newOrder" exact
                :style="{ display: localStorageRole === 'LAB' ? 'none' : 'inline-block' }">
                <span class="image-container">
                    <img src="@/assets/dental.jpg" alt="" height="30px" width="40px">
                </span>
                Doctors
            </router-link>
            <router-link class="router" to="/labs" exact
                :style="{ display: localStorageRole === 'DOC' ? 'none' : 'inline-block' }">
                <span class="image-container">
                    <img src="@/assets/dental.jpg" alt="" height="30px" width="40px">
                </span>
                Labs
            </router-link>
            <router-link class="router" to="/social" exact>
                <span class="image-container">
                    <img src="@/assets/dental.jpg" alt="" height="30px" width="40px">
                </span>
                social
            </router-link>
            <router-link class="router" to="/login" exact>
                <span class="image-container">
                    <img src="@/assets/dental.jpg" alt="" height="30px" width="40px">
                </span>
                Login/SignUp
            </router-link>
            <button @click="pauseRing" class="btn btn-sm"
                :style="{ display: localStorageRole === 'LAB' ? 'inline-block' : 'none' }">pause</button>
            <div class="data">
                <span title="UserName">{{ this.username }} </span>
                <span v-if="username">/</span>
                <span title="ID">{{ this.id }}</span>
            </div>
            <button @click="signOut" title="SignOut" class="btn btn-primary btn-sm" v-if="username != ''"><i
                    class="bi bi-box-arrow-right"></i></button>
        </nav>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'headerPage',
    data() {
        return {
            username: "",
            id: "",
            UID: "",
            localStorageRole: "",
            orders: [

            ],
            filteredOrders: [

            ]
        }
    },
    methods: {
        ring() {
            if (this.$refs.audio) {
                this.$refs.audio.play().catch(err => {
                    console.log(err);
                });
            }
        },
        pauseRing() {
            if (this.$refs.audio) {
                this.$refs.audio.pause();
            }
        },
        fetchData() {
            const role = localStorage.getItem('role')
            if (role === 'LAB') {
                axios.get('https://dentist-backend-ts43.onrender.com/labs/orders', {
                    headers: {
                        'Authorization': 'DEN ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    console.log(response.data);
                    this.orders = response.data.reverse();
                    if (this.orders.length > this.filteredOrders.length) {
                        console.log('ringing')
                        this.ring();
                        this.filteredOrders = this.orders;
                    }
                })
            }
        },
        signOut(e) {
            e.preventDefault();
            //axios.post('http://127.0.0.1:8000/api/signout/').then(()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('UID');
            localStorage.removeItem('role');
            // Reset the username and id displayed in the navbar
            this.username = "";
            this.id = "";
            this.role = "";
            this.token = "";
            this.$router.push('/').then(() => {
                this.$router.go(0);
            });

            // Redirect the user to a login page or any other appropriate page
            // In this example, I'm redirecting to the home page
            //this.$router.push('/login');
            //}).catch(error=>{
            //  console.log(error.message);
            //})
            // Clear user authentication state, for example by removing tokens or clearing local storage
            // In this example, I'm clearing localStorage

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
        this.pauseRing();
        if (localStorage.getItem('username') && localStorage.getItem('id') && localStorage.getItem('role')) {
            this.username = localStorage.getItem('username');
            this.id = localStorage.getItem('id');
            this.localStorageRole = localStorage.getItem('role');
        }
        const role = localStorage.getItem('role');
        if (role === 'LAB') {
            axios.get('https://dentist-backend-ts43.onrender.com/labs/orders', {
                headers: {
                    'Authorization': 'DEN ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.orders = response.data.reverse();
                this.filteredOrders = this.orders;
            }).catch((error) => {
                if (error.response) {
                    // Handle errors based on response status code
                    switch (error.response.status) {
                        case 400:
                            alert(error.message, 'try signing out and signing in again');
                            break;
                        case 401:
                            console.log(error)
                            break;
                        default:
                            alert('An error occurred: ' + error.message);
                    }
                } else {
                    // Handle network errors or errors without a response
                    alert('Check your internet connection');
                }
            });
        }

    },
}
</script>

<style scoped>
@media print {
    nav {
        display: none;
    }
}

.logo {
    width: fit-content;
    /* Ensure the logo div takes the full width of its parent */
    height: 100%;
    /* Ensure the logo div takes the full height of its parent */
    display: flex;
    justify-content: space-between;
    /* Center the image horizontally */
    /* align-items: center; Center the image vertically */
}

.logo img {
    max-width: 100%;
    /* Ensure the image does not exceed the width of its parent */
    max-height: 100%;
    /* Ensure the image does not exceed the height of its parent */
    transform: translateY(-15%);
    border-radius: 10%;
}

.parent {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    height: 70px;
}

nav {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    animation-name: slide-in;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}

.logo {
    animation-name: slide-in;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}

.router {
    font-size: 1em;
    font-weight: bold;
    color: #33A1F1;
    display: inline-block;
    position: relative;
    text-decoration: none;
}

.router-link-active .image-container {
    opacity: 1;
    transform: translateY(0) scaleY(1);
}

.router-link-active {
    text-decoration-color: black;
    border-radius: 5px;
    color: blue;
    transform: translateX(2px);
    font-size: 1.1em;
}

.image-container {
    position: absolute;
    top: -30px;
    left: calc(50% - 20px);
    opacity: 0;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    transform: translateY(-10px) scaleY(0);
}

.router:hover .image-container,
.router:focus .image-container {
    opacity: 1;
    transform: translateY(0) scaleY(1);
}

h1 {
    margin-top: 13px;
}

@keyframes slide-in {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@media only screen and (max-width: 840px) {
    .parent {
        height: fit-content;
    }
}
</style>