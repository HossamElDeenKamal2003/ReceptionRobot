<template>
    <div>
        <navBar />
        <div class="addDoctor">
            <label for="id">Doctor ID</label>
            <input type="text" v-model="doctor_id" id="id" placeholder="Doctor ID">
            <button class="btn btn-primary btn-sm" @click="addDoctor(doctor_id)">Add</button>
        </div>
        <div class="container">
            <div class="left-side">
            </div>
            <div class="cards">
                <div v-for="(doctor, index) in doctors" :key="index" class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">{{ doctor.name }}</h5>
                        <p class="card-text">{{ doctor.description }}</p>
                        <router-link :to="'/contactEdit/' + doctor.id" class="btn btn-primary btn-sm">Show
                            Contract</router-link>
                        <button class="delete" @click="deleteCard(doctor.id, index)"><i
                                class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navBar from "@/components/global/navBar.vue";
import axios from 'axios';
export default {
    name: "doctorLab",
    components: {
        navBar
    },
    data() {
        return {
            doctor_id: "",
            doctors: [
            ]
        };
    },
    methods: {
        deleteCard(doctor_id) {
            axios.delete(`https://dentist-backend-ts43.onrender.com/labs/deleteDoc/${doctor_id}`, {
                headers: {
                    'Authorization': 'DEN ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert('Doctor deleted successfully');
                this.fetchDoctors();
            })
            .catch(error => {
                console.error(error);
                alert('Failed to delete doctor');
            });
        },
        addDoctor(id) {
            axios.post(`https://dentist-backend-ts43.onrender.com/labs/addDoc/${id}`, {}, {
                headers: {
                    'Authorization': 'DEN ' + localStorage.getItem('token')
                }
            }).then(() => {
                alert('Doctor Added Successfully');
                this.fetchDoctors();
            }).catch(error => {
                console.error(error);
                alert('Failed to add doctor');
            });
        },
        fetchDoctors() {
            axios.get('https://dentist-backend-ts43.onrender.com/labs/doctors',{
                headers: {
                    'Authorization': 'DEN ' + localStorage.getItem('token')
                }
            }).then(response => {
                console.log(response.data);
                this.doctors = []
                response.data.forEach(doctor => {
                    // if (doctor.doctorcontracts) {
                        this.doctors.push({ name: doctor.username,  id: doctor._id });
                    //}
                    //else {
                        //this.doctors.push({ name: doctor.name, description: "", id: doctor.id });
                    //}
                });
                // this.doctors.name = response.data.name;
                // this.doctors.id = response.data.userId;
            }).catch(error => {
                console.log(error);
            })
        }
    },
    created() {
        this.fetchDoctors();
        //axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    },
    mounted() {
        //const username = localStorage.getItem('username');
        // if (username !== '' && username !== null) { // Check if username is not empty and not null
        //     this.fetchDoctors(); // Call fetchDoctors() method instead of fetchData()
        //     setInterval(() => {
        //         this.fetchDoctors(); // Call fetchDoctors() method instead of fetchData()
        //     }, 1000);
        // }
    },
}
</script>

<style scoped>
.addDoctor {
    margin-top: 50px;
}

label {
    font-size: larger;
    margin-right: 15px;
}

.addDoctor button {
    margin-left: 20px;
}

.left-side {
    height: 100%;
    width: 4vw;
    background-color: blue;
    position: absolute;
    left: 0;
    border-radius: 15px;
    border-radius: 10px 0 0px 10px;
}

.container {
    height: 80vh;
    background-color: whitesmoke;
    margin-top: 10px;
    position: relative;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    overflow: auto;
    overflow-x: hidden;
}

.cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: min-content;
    gap: 15px;
    margin-right: -50px;
}

a {
    display: block;
}

.card-body button {
    background-color: red;
    margin-top: 15px;
}

.card-body button i:hover {
    color: white;
}
</style>
