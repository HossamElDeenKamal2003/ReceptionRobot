    <template>
        <section class="all-orders">
            <div class="sidebar" :class="{ 'active': isActiveSidebar }">
                <router-link to="/Timing">Timing</router-link>
                <router-link to="/financeLabs">Finance</router-link>
            </div>
            <div class="content" style="overflow:auto;height:100vh;">
                <form action="">
                    <div class="basic-info">
                        <div>
                            <p>{{date}}</p>
                            <div>
                                <label for="date">Date</label>
                                <input type="date" id="date" v-model="date">
                            </div>
                        </div>
                        <div>
                            <label for="name">Patient Name : </label>
                            <input type="text" placeholder="Name" id="name" v-model="Patientname">
                            <p style="color: red;" v-text="this.errorName"></p>
                        </div>
                        <div>
                            <label for="Age">Age : </label> 
                            <input type="text" placeholder="Age" id="Age" v-model="Age">
                        </div>
                        <div>
                            <label for="numberTeeth">Number Of Teeth : </label>
                            <input type="text" placeholder="numberTeeth" id="numberTeeth" v-model="numberofteeth">
                            <div class="printer" @click="printer" title="Print" id="print"><i class="bi bi-printer"></i>
                            </div>
                        </div>
                    </div>
                    <div class="second_info">
                        <div>
                            <label for="sex">Sex</label>
                            <select class="sex" id="sex" v-model="sex">
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                        <div>
                            <label for="colors">Color</label>
                            <select id="colors" v-model="Toothcolor">
                                <option value="none">none</option>
                                <option value="A1">A1</option>
                                <option value="A2">A2</option>
                                <option value="A3">A3</option>
                                <option value="A3,5">A3,5</option>
                                <option value="A4">A4</option>
                                <option value="B1">B1</option>
                                <option value="B2">B2</option>
                                <option value="B3">B3</option>
                                <option value="B4">B4</option>
                                <option value="C1">C1</option>
                                <option value="C2">C2</option>
                                <option value="C3">C3</option>
                                <option value="C4">C4</option>
                                <option value="D2">D2</option>
                                <option value="D3">D3</option>
                                <option value="D4">D4</option>
                                <option value="BL1">BL1</option>
                                <option value="BL2">BL2</option>
                                <option value="BL3">BL3</option>
                                <option value="BL4">BL4</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label">Type</label>
                            <select class="form-select" v-model="type">
                                <option :value="type">{{ type }}</option>
                                <option value="zircon">Zircon</option>
                                <option value="impress_crown">Impress Crown</option>
                                <option value="impress_intaly">Impress Intaly</option>
                                <option value="impress_onlay">Impress Onlay</option>
                                <option value="impress_overlay">Impress Overlay</option>
                                <option value="pfm">PFM</option>
                                <option value="implant_zircon">Implant Zircon</option>
                                <option value="implant_pfm">Implant PFM</option>
                                <option value="night_gard">Night Gard</option>
                                <option value="night_white">Night White</option>
                                <option value="retainer">Retainer</option>
                                <option value="study_model">Study Model</option>
                                <option value="snap_on_smile">Snap On Smile</option>
                            </select>
                        </div>
                    </div>
                    <div class="teethImage" style="width:100%; margin-top:2%;">
                        <img src="@/assets/illustrateTeethimage.png" alt="Teeth Image" width="100%" height="50%">
                        <label for="req">Requirments</label>
                        <textarea name="" id="" style="overflow:auto; width:100%; height: 25%"
                            v-model="note"></textarea>
                        <a :href="file" :style="{ display: file === null ? 'none' : 'inline' }">Screen File</a>
                        <div class="container">
                            <div class="display">
                                <p>{{ message }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="slider" style="height:50vh; width:100%; display:flex; justify-contnet:center;">
                        <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false"
                            data-bs-interval="false" style="width:80%">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img v-if="image" :src="image" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img v-if="image1" :src="image1" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img v-if="image2" :src="image2" class="d-block w-100" alt="...">
                                </div>
                                <div class="carousel-item" v-if="video">
                                    <video :src="video" class="d-block w-100" controls></video>
                                </div>
                                <div style="diplay:flex; justify-content:space-between">
                                    <button class="carousel-control-next" type="button"
                                        data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                    <button class="carousel-control-prev" type="button"
                                        data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="print&sub">
                        <div class="sub">
                            <button @click="preventSub" class="btn btn" title="Save" type="Submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </template>

<script>
import axios from 'axios';
export default {
    props: ['id'],
    computed: {
        orderId() {
            return this.id;
        },
        formattedType() {
            // Replace underscores with dashes in the type value
            return this.type.replace('_', '-');
        }
    },
    name: "newOrder",
    data() {
        return {
            isActiveSidebar: false,
            users: [],
            Patientname: "",
            errorName: "",
            Age: "",
            ID: "",
            sex: "",
            numberofteeth: "",
            Toothcolor: "",
            type: "",
            note: "",
            currentState: 'Initial',
            message: '',
            mediaRecorder: null,
            chunks: [],
            audioURL: '',
            inputURL: "",
            chunks_to_send: [],
            records: '',
            error: 'e',
            color_new_value: "",
            alt_record: "",
            image: null,
            image1: null,
            image2: null,
            video: null,
            file: null,
            date: "",
            // toothColors: ["A1", "A2", "A3", "A3.5", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D2", "D3", "D4", "BL1", "BL2", "BL3", "BL4"],
        };
    },
    watch: {
        Toothcolor(newValue, oldValue) {
            console.log("New value:", newValue);
            console.log("Old value:", oldValue);
            this.Toothcolor = newValue;
        },
    },

    methods: {
        checkName() {
            const name = this.Patientname;
            return name !== "";
        },
        handleAudioFileChange(event) {
            this.audioFile = event.target.files[0];
            this.inputURL = this.audioFile;
            console.log(this.inputURL);
        },
        printer() {
            window.print();
        },
        preventSub(e) {
            e.preventDefault();
            const formData = new FormData();
            formData.append('patientName', this.Patientname);
            formData.append('type', this.type);
            formData.append('age', this.Age);
            formData.append('sex', this.sex);
            formData.append('color', this.Toothcolor);
            formData.append('teethNo', this.numberofteeth);
            formData.append('description', this.note);
            formData.append('date', this.date);
            const order_id = this.id
            axios.put(`https://dentist-backend-ts43.onrender.com/doctors/orders/update/${order_id}/`, formData, {
            }).then(response => {
                console.log(response.data)
                alert("Updated Successfully");
                this.$router.go(0);
            }).catch((error) => {
                if (error.response) {
                    // Handle errors based on response status code
                    switch (error.response.status) {
                        case 400:
                            alert("An Error Occured Sure That Type Is Exist In Contract For This Doctor");
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
            })
            //     const order_id = this.id;
            //     axios.get(`https://backend-reception-robot.onrender.com/labs/orders/${order_id}`, {
            //         headers: {
            //             'Authorization': 'DEN ' + localStorage.getItem('token')
            //         }
            //     }).then(response => {
            //         console.log(response.data.gender);
            //         console.log(this.id);
            //         this.Patientname = response.data.patientName
            //         this.Age = response.data.age;
            //         this.numberofteeth = response.data.teethNo;
            //         this.Toothcolor = response.data.color;
            //         this.sex = response.data.sex;
            //         this.note = response.data.note;
            //         this.type = response.data.type;
            //         if (this.sex === '') {
            //             console.log('sex is empty');
            //         } else {
            //             console.log(this.sex);
            //         }
            //     })
            // }).catch(error => {
            //     console.log(error);
            // });
        },
    },
    created() {
        const orderId = this.$route.params.id;
        axios.get(`https://dentist-backend-ts43.onrender.com/labs/orders/${orderId}`, {
            headers: {
                'Authorization': 'DEN ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log(response.data);
            this.Patientname = response.data.patientName;
            this.Age = response.data.age;
            this.numberofteeth = response.data.teethNo;
            this.Toothcolor = response.data.color;
            this.sex = response.data.sex;
            this.note = response.data.description;
            this.type = response.data.type;
            this.image = response.data.image;
            this.image1 = response.data.image1;
            this.image2 = response.data.image2;
            this.video = response.data.video;
            this.date = response.data.date;
            console.log(this.image)
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
        })
    },

};
</script>
<style scoped>
@media print {
    .sidebar {
        display: none;
    }

    .slider {
        display: none;
    }

    title {
        color: blue;
    }

    .content {
        position: absolute;
        width: 90%;
        left: -20%;
        top: 0;
    }

    button,
    i {
        display: none;
    }
}

.carousel-control-next,
.carousel-control-prev {
    width: inherit;
}

label {
    color: #33a1f1;
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

.hiddenInput {
    display: none;
}

/*.carousel-inner video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }*/

.carousel-control-next-icon,
.carousel-control-prev-icon {
    background-image: none;
    /* Remove default Bootstrap icon */
}

.carousel-control-next-icon::after,
.carousel-control-prev-icon::after {
    content: '';
    display: inline-block;
    width: 30px;
    height: 30px;
    border: solid black;
    /* Set the color of the arrows */
    border-width: 0 4px 4px 0;
    padding: 5px;
}

.carousel-control-next-icon::after {
    transform: rotate(-45deg);
}

.carousel-control-prev-icon::after {
    transform: rotate(135deg);
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


label {
    font-weight: bold;
    font-family: sans-serif;
}

input {
    background: transparent;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 2px black solid;
}

.images {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.basic-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;
    width: 100%;
}

.second_info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;
    width: 100%;
    position: relative;
}

.second_info div {
    display: flex;
    gap: 15px;
    align-items: center;
}

.second_info select {
    width: 100%;
}

.second_info label {
    margin-right: 10px;
}

.second_info .form-select {
    width: fit-content;
    flex-grow: 1;
}

.content form {
    display: flex;
    flex-wrap: wrap;
    border: 1px 33A1F1 solid;
}

div.content {
    margin-left: 210px;
    margin-right: 10px;
    padding: 1px 16px;
    height: 90vh;
    transition: margin-left 0.5s;
    border: 2px solid #33a1f1;
    border-radius: 10px;
}

.printer {
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: black;
    border-radius: 10px 0 0 10px;
    width: 50px;
}

.printer i {
    color: white;
}

form {
    position: relative;
}

/*.printer i {
        color: white;
    }*/

.sub {
    position: absolute;
    right: -15px;
    bottom: 0;
    background-color: #33a1f1;
    border-radius: 10px 0 0 10px;
    transition: .5s ease-in-out;
}

.sub:hover {
    color: white;
}

input,
select {
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 2px black solid;
}

input:focus,
select:focus {
    box-shadow: none;
    outline: none;
}

textarea {
    border: #33a1f1 2px solid;
    resize: none;
}

.teethImage {
    display: block;
    justify-content: space-around;
}

@media screen and (max-width: 880px) {
    .content {
        height: 100vh;
    }
}

@media screen and (max-width: 700px) {
    .sidebar {
        width: 100%;
        height: auto;
        position: relative;
    }

    .sidebar a {
        float: left;
    }

    .content {
        height: 90vh;
        overflow: auto;
    }


    div.content {
        margin-left: 0;
    }

    .teethImage {
        width: 100%;
        margin-top: 10%;
    }

    .teethImage img {
        height: 60%;
    }
}

@media screen and (max-width: 1023px) {
    .printer {
        bottom: -60px;
    }

    .sub {
        bottom: -100px;
    }

    .content {
        height: 50vh;
    }
}

@media screen and (max-width: 400px) {
    .sidebar a {
        text-align: center;
        float: none;
    }

    .basic-info,
    .second_info {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 10px;
    }

    .second_info label {
        grid-column: 1;
        grid-row: 1;
        align-self: center;
    }

    input::placeholder,
    select::placeholder {
        text-align: center;
    }

    .second_info .form-select {
        grid-column: 2;
        grid-row: 1;
        width: 100%;
    }
}
</style>