<template>
    <div>
        <NavBar />
        <div class="finance">
            <div class="data">
                <div class="calendar" style="margin-top:20px">
                    <label>From</label>
                    <input type="date" v-model="startDate">
                    <label>To</label>
                    <input type="date" v-model="endDate">
                    <button :disabled="isFetchDisabled" @click="fetchFinanceData">Fetch Data</button>
                </div>
                <div class="head">
                    <p>Doctor Name</p>
                    <p>Number Of Orders</p>
                    <p>Total</p>
                    <p>Been Paid</p>
                    <p></p>
                </div>
                <div class="finance_data">
                    <div v-for="(doctor, index) in doctorData" :key="index" class="fromDoctor">
                        <p>{{ doctor.doctorName }}</p>
                        <p>{{ doctor.orderCount }}</p>
                        <p>{{ doctor.price }}</p>
                        <p>{{ doctor.totalPaid }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/global/navBar.vue";
import axios from 'axios';

export default {
    name: "FinanceLab",
    components: {
        NavBar,
    },
    data() {
        return {
            startDate: null,
            endDate: null,
            doctorData: [],
        }
    },
    computed: {
        isFetchDisabled() {
            return !this.startDate || !this.endDate;
        }
    },
    methods: {
        fetchFinanceData() {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Log the token to ensure it's correct
        axios.get('https://dentist-labs.onrender.com/labs/financial', {
            params: {
                startDate: this.startDate,
                endDate: this.endDate
            },
            headers: {
                'Authorization': 'DEN ' + token
            }
        }).then(response => {
            console.log(response.data);
            this.doctorData = response.data.map(doctor => ({
                doctorName: doctor.doctorName,
                orderCount: doctor.orderCount,
                totalPaid: doctor.totalPaid,
                price: doctor.totalPrice
            }));
        }).catch(error => {
            console.error('Error fetching finance data:', error);
            if (error.response && error.response.status === 401) {
                alert('Unauthorized access. Please check your token.');
            } else {
                this.doctorData = [];
            }
        });
    }
    },
    created(){
        console.log(localStorage.getItem('token')); 
    }
}
</script>

<style scoped>
.finance {
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(21, 21, 149, 1) 35%, rgba(0, 212, 255, 1) 100%);
    height: 91vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 10px #888888;
}

.data {
    height: 80vh;
    width: 60vw;
    background-color: white;
    overflow: auto;
}

@media (max-width: 768px) {
    .data {
        width: 100%;
        height: 100vh;
    }
}

.head {
    display: grid;
    justify-content: space-around;
    margin-top: 15px;
    color: #33a1f1;
    font-weight: bold;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.data input {
    margin-top: 15px;
    margin-right: 10px;
    width: 10vw;
}

.finance_data {
    margin-top: 15px;
}

.fromDoctor,
.fromLabs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>
