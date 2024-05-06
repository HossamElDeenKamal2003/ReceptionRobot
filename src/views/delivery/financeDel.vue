<template>
    <div>
        <navBar />
        <div class="finance">
            <div class="data">
                <div class="calender">
                    <input type="date" v-model="startDate">
                    <input type="date" v-model="endDate">
                    <button @click="fetchFinanceDate">Fetch Data</button>
                </div>
                <div class="head">
                    <p>Doctor Name</p>
                    <p>Number Of Orders</p>
                    <p>Resuidal</p>
                    <p>Been Paid</p>
                    <p>Total</p>
                </div>
                <div class="finance_data">
                    <div v-for="(doctor, index) in doctorData" :key="index" class="fromDoctor">
                        <p>{{ doctor.name }}</p>
                        <p>{{ doctor.orders }}</p>
                        <p>{{ doctor.residual }}</p>
                        <p>{{ doctor.beenPaid }}</p>
                        <p>{{ doctor.totalPrice }}</p>
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
    name: "financeLab",
    components: {
        navBar,
    },
    data() {
        return {
            startDate: '',
            endDate: '',
            doctorData: [],
        }
    },
    methods: {
        fetchFinanceDate() {
            axios.get('http://localhost:8000/api/delivery/financials/', {
                params: {
                    start_date: this.startDate,
                    end_date: this.endDate
                }
            }).then(response => {
                this.doctorData = [];
                response.data.forEach(doctor => {
                    this.doctorData.push({
                        name: doctor.doctor__laboratory__name, orders: doctor.total_orders, residual: doctor.total_not_payed,
                        beenPaid: doctor.total_been_payed, totalPrice: doctor.total_price
                    });
                });
            }).catch(error => {
                console.log(error);
            });
        },
    },
    created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
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