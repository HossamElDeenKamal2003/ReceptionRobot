<template>
    <navBar />
    <div class="content">
        <div class="sidebar" :class="{ 'active': isActiveSidebar }">
            <router-link to="/allOrderslabs">All Orders</router-link>
            <router-link to="/contact" style="text-decoration: underline;">Contact</router-link>
            <router-link to="/doctorLab">Doctors</router-link>
            <router-link to="/deliveryLabs">Delivery</router-link>
            <router-link to="/financeLabs">Finance</router-link>
        </div>
        <div class="dashboard">
            <h1> Doctors Contract</h1>
            <div class="data">
                <!-- <div>
                    <label for="name">Doctor Name : </label>
                    <input class="form-control name" type="text" id="name" placeholder="Doctor Name"
                        v-model="name">
                </div>
                <div>
                    <label for="code">Code : </label>
                    <input class="form-control code" type="text" id="code" placeholder="Code" v-model="code">
                </div> -->
            </div>
            <div class="types">
                <div class="labels">
                    <h2>Zircon Wave</h2>
                    <h2>Zircon Dental Direct</h2>
                    <h2>Zircon e-max prime ivoclar</h2>
                    <h2>Impress Crown</h2>
                    <h2>Impress Intaly</h2>
                    <h2>Impress Onlay</h2>
                    <h2>Impress Overlay</h2>
                    <h2>PFM</h2>
                    <h2>Implant Zircon</h2>
                    <h2>Implant PFM</h2>
                    <h2>Night Gard</h2>
                    <h2>Night White</h2>
                    <h2>Retainer</h2>
                    <h2>Study Model</h2>
                    <h2>Snap On Smile</h2>
                </div>
                <div class="prices">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.zircon_wave">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.zircon_dental_direct">
                    <input class="form-control" type="number" placeholder="Price"
                        v-model="contract.zircon_emax_prime_ivoclar">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.impress_crown">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.impress_intaly">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.impress_onlay">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.impress_overlay">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.pfm">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.implant_zircon">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.implant_pfm">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.night_gard">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.night_white">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.retainer">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.study_model">
                    <input class="form-control" type="number" placeholder="Price" v-model="contract.snap_on_smile">
                </div>
            </div>
            <div class="submit">
                <button type="Submit" class="btn btn-primary" @click="submit(pathId)">{{ button }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import navBar from "@/components/global/navBar.vue";
import axios from 'axios';
export default {
    props: ['id'],
    computed: {
        doctorId() {
            return this.id;
        }
    },
    name: "contactLab",
    components: {
        navBar,
    },
    data() {
        return {
            contract: {
                contract:{},
                name: "",
                code: "",
                zircon_wave: 0,
                zircon_dental_direct: 0,
                zircon_emax_prime_ivoclar: 0,
                impress_crown: 0,
                impress_intaly: 0,
                impress_onlay: 0,
                impress_overlay: 0,
                pfm: 0,
                implant_zircon: 0,
                implant_pfm: 0,
                night_gard: 0,
                night_white: 0,
                retainer: 0,
                study_model: 0,
                snap_on_smile: 0,
                id: "",
            },
            button: "Submit",
            pathId:"",
            userRole:"",
        }
    },
    methods: {
        submit(id) {
                console.log(this.userRole);
                if (this.userRole !== 'LAB') {
                    console.error("You are not authorized to perform this action.");
                    return;
                }
                axios.put(`http://localhost:3000/labs/contract/${id}`, {
                    contract:{
                        zircon_wave: this.contract.zircon_wave,
                        zircon_dental_direct: this.contract.zircon_dental_direct,
                        zircon_emax_prime_ivoclar: this.contract.zircon_emax_prime_ivoclar,
                        impress_crown: this.contract.impress_crown,
                        impress_intaly: this.contract.impress_intaly,
                        impress_onlay: this.contract.impress_onlay,
                        impress_overlay: this.contract.impress_overlay,
                        pfm: this.contract.pfm,
                        implant_zircon: this.contract.implant_zircon,
                        implant_pfm: this.contract.implant_pfm,
                        night_gard: this.contract.night_gard,
                        night_white: this.contract.night_white,
                        retainer: this.contract.retainer,
                        study_model: this.contract.study_model,
                        snap_on_smile: this.contract.snap_on_smile
                    }},
                    {
                    headers: {
                    'Authorization': 'DEN ' + localStorage.getItem('token'),
                    }
                
                }).then(response => {
                    console.log(response.data);
                    this.$router='/doctorLab';
                }).catch(error => {
                    console.log(error);
                })
            // else {
            //     axios.patch('http://127.0.0.1:8000/api/edit_contract/' + this.contract.id + "/",
            //     {
            //         code: this.contract.code,
            //         zircon_wave: this.contract.zircon_wave,
            //         zircon_dental_direct: this.contract.zircon_dental_direct,
            //         zircon_emax_prime_ivoclar: this.contract.zircon_emax_prime_ivoclar,
            //         impress_crown: this.contract.impress_crown,
            //         impress_intaly: this.contract.impress_intaly,
            //         impress_onlay: this.contract.impress_onlay,
            //         impress_overlay: this.contract.impress_overlay,
            //         pfm: this.contract.pfm,
            //         implant_zircon: this.contract.implant_zircon,
            //         implant_Pfm: this.contract.implant_pfm,
            //         night_gard: this.contract.night_gard,
            //         night_white: this.contract.night_white,
            //         retainer: this.contract.retainer,
            //         study_model: this.contract.study_model,
            //         snap_on_smile: this.contract.snap_on_smile
            //     },{
            //         headers: {
            //         'Authorization': 'Bearer ' + localStorage.getItem('token'),
            //         'Content-Type': 'application/json' // Modify this based on the content type required by your API
            //         }
            //     }).then(response => {
            //         console.log(response.data);
            //     }).catch(error => {
            //         console.log(error);
            //     })
            //}
        }
    },
    created() {
        this.userRole = localStorage.getItem('role');
        const id = this.$route.params.id;
        this.pathId = id;
        this.code = id;
        console.log(id);
        if (this.doctorId) {
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            axios.get(`http://localhost:3000/labs/contract/${id}`,{
                    headers: {
                        'Authorization': 'DEN ' + localStorage.getItem('token'),
                    }
            })
                .then((response) => {
                    this.contract = response.data;
                    console.log(this.contract);
                }).catch(error => {
                    console.log(error);
                })
        }
        if (this.$route.path !== "/contact") {
            this.button = "Update";
            console.log(this.$route.path);
        }
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
    width: 100%;
    display: flex;
    height: min-content;
    z-index: 100;
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

.dashboard {
    background-color: whitesmoke;
    height: 91vh;
    border: 2px solid #33a1f1;
    overflow: auto;
}

.dashboard h1 {
    color: #33a1f1;
    font-weight: bold;
    text-decoration: underline;
    margin-top: 70px;
    animation-name: title;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}

@keyframes title {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.name {
    animation-name: slide-right;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}

@keyframes slide-right {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.code {
    animation-name: slide-left;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}

@keyframes slide-left {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.data {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    overflow: auto;
    flex-wrap: wrap;
}

.data div {
    display: grid;
    grid-template-columns: 1fr 1fr
}

.data div label {
    font-size: larger;
    font-weight: 600;
}

.types {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
}

.labels {
    animation-name: slide-down;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}

@keyframes slide-down {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.prices {
    display: grid;
    grid-template-columns: auto;
    animation-name: slide-up;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}

@keyframes slide-up {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.prices input {
    width: 20%;
    margin-top: 15px;
}

.types .labels h2 {
    margin-top: 15px;
}

.submit {
    position: relative;
}

.submit button {
    position: absolute;
    right: 0;
}

@media screen and (max-width: 1024px) {
    .sidebar {
        width: 100%;
        height: fit-content;
        display: flex;
    }

    .dashboard {
        width: 100%;
    }

    .content {
        display: flex;
        gap: 100px;
    }

    .prices input {
        width: 80%;
    }

}
</style>