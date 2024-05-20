<template>
    <section class="all-orders">
        <div class="sidebar" :class="{ 'active': isActiveSidebar }">
            <!-- <router-link to="/newOrder" style="text-decoration: underline;">New Order</router-link> -->
            <router-link to="/allorders">All Orders</router-link>
            <router-link to="/delievry">Delievery</router-link>
            <router-link to="/finance">Finance</router-link>
        </div>
        <div class="content" style="overflow:auto;height:100vh;">
            <form action="">
                <div class="basic-info">
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
                        <!-- <select id="colors" v-model="Toothcolor">
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
                        </select> -->
                    </div>
                    <!-- <div>
                        <p>{{type}}</p>
                    </div> -->
                    <div>
                        <label class="form-label">Type</label>
                        <select class="form-select" v-model="type">
                            <option :value="type">{{ type }}</option>
                            <option value="zircon_wave">Zircon Wave</option>
                            <option value="zircon_dental_direct">Zircon Dental Direct</option>
                            <option value="zircon_emax_prime_ivoclar">Zircon e-max prime ivoclar</option>
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
                    <img src="@/assets/teeth.jpg" alt="Teeth Image" width="100%" height="50%">
                    <textarea name="" id="" style="overflow:auto; width:100%; height: 25%" v-model="note"></textarea>
                    <div class="container">
                        <div class="display">
                            <p>{{ message }}</p>
                            <audio controls  :src="records" @change="handleAudioFileChange"></audio>
                            <!-- <audio controls src="E:\masallab editversion\massalab\voice_records\voice_gftfJ7d.ogg"></audio> -->
                            <!-- <input type="file" class="hiddenInput" v-if="inputURL"/> -->
                        </div>
                        <!-- <div class="controllers">
                            <button v-if="currentState === 'Initial'" @click="startRecording"
                                class="btn btn-primary">Start
                                Recording</button>
                            <button v-if="currentState === 'Record'" @click="stopRecording">Stop Recording</button>
                            <button v-if="currentState === 'Download'" @click="recordAgain">Record Again</button>
                        </div> -->
                    </div>
                </div>

                <div class="print&sub">
                    <div class="printer" @click="printer" title="Print"><i class="bi bi-printer"></i></div>
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
            records:'',
            error:'e',
            color_new_value:"",
            alt_record:"",
            // toothColors: ["A1", "A2", "A3", "A3.5", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D2", "D3", "D4", "BL1", "BL2", "BL3", "BL4"],
        };
    },

    mounted() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    this.mediaRecorder = new MediaRecorder(stream)
                    this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data)
                    this.mediaRecorder.onstop = () => {
                        const blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' })
                        this.chunks_to_send = this.chunks
                        this.chunks = []
                        this.audioURL = window.URL.createObjectURL(blob)
                        // this.audioURL = blob
                    }
                })
                .catch(error => {
                    console.log('Following error has occurred:', error)
                })
        } else {
            this.currentState = ''
            this.message = 'Your browser does not support mediaDevices'
        }
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
            // Store the selected audio file in the component's data
            this.audioFile = event.target.files[0];
            this.inputURL = this.audioFile;
            console.log(this.inputURL);
        },
        preventSub(e) {
            e.preventDefault();
            // Create FormData object to send data to the server
            const formData = new FormData();
            formData.append('patientName', this.Patientname);
            formData.append('type', this.type);
            formData.append('age', this.Age);
            formData.append('sex', this.sex);
            formData.append('color', this.Toothcolor);
            formData.append('teethNo', this.numberofteeth);
            formData.append('description', this.note);
            // Append the audio file to the FormData object
            const blob = new Blob(this.chunks_to_send, { type: 'audio/ogg' })
                this.chunks_to_send = []
                formData.append('voiceNote', blob, 'voice.ogg');
            console.log("form: ", formData)
            // const response = axios.get('http://127.0.0.1:8000/api/doctor/all_orders/');
            const order_id = this.id
            // Send FormData object to the server using Axios
            axios.put(`https://api.receptionrobot.net/doctors/orders/update/${order_id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(()=> {
                //if (response.status === 200) {
                    console.log("order sent successfully");
                    axios.defaults.headers.common['Authorization'] = 'DEN ' + localStorage.getItem('token');
                    const order_id = this.id;
                    axios.get(`https://api.receptionrobot.net/doctors/orders/${order_id}`).then(response => {
                        //console.log(response.data);
                        console.log(response.data.gender);
                        console.log(this.id);
                        this.Patientname = response.data.patientName
                        this.Age = response.data.age;
                        this.numberofteeth = response.data.teethNo;
                        this.Toothcolor = response.data.color;
                        this.sex = response.data.description;
                        this.note = response.data.note;
                        this.type = response.data.type;
                        if(this.sex === ''){
                            console.log('sex is empty');
                        }else{
                            console.log(this.sex);
                        }
                        //this.audioURL = response.data.records[0].voice_record;
                        // this.audioURL = 'E:\\masallab editversion\\massalab\\voice_records'+response.data.records[0].voice_record;
                        // console.log(this.audioURL);
                        //this.records.push(response.data.records);
                        this.records = response.data.voiceNote;
                        console.log(this.records);
                        if (this.audioURL) {
                            const blob = new Blob(this.chunks_to_send, { type: 'audio/ogg' })
                            this.chunks_to_send = []
                            formData.append('voiceNote', blob, 'voice.ogg');
                        }
                    })
                //}
            }).catch(error => {
                console.log(error);
            });
            
        },
        printer(){
            
            // document.getElementById('name').style.display = 'block';
            // document.getElementById('Age').style.display = 'block';
            // document.getElementById('numberTeeth').style.display = 'block';
            // document.getElementById('').style.display = 'block';
            //sex
            //colors
            // Print the content
            window.print();
        },
        startRecording() {
            this.currentState = 'Record';
            // Check if mediaRecorder is initialized
            if (this.mediaRecorder) {
                // Start recording
                this.mediaRecorder.start();
                this.message = 'Recording...';
            } else {
                console.error('MediaRecorder is not initialized.');
            }
            
            // Listen for data available event
            this.mediaRecorder.ondataavailable = e => {
                // Append new chunks to the existing array
                this.chunks.push(e.data);
            };
        },
        stopRecording() {
            this.currentState = 'Download';
            this.mediaRecorder.stop();
            this.message = 'Voice Message';
            //this.preventSub(this.error);
        },
        recordAgain() {
            this.currentState = 'Record'
            this.audioURL = ''
            this.startRecording()
        },
        toggleRecording() {
            if (!this.recording) {
                // Start recording
                this.recording = true;
                this.chunks = [];
                this.mediaRecorder.start();
            } else {
                //stop recording
                this.recording = false;
                this.mediaRecorder.stop();
            }
        },
    },
    created() {
        axios.defaults.headers.common['Authorization'] = 'DEN ' + localStorage.getItem('token');
        const order_id = this.id;
        axios.get(`https://api.receptionrobot.net/doctors/orders/${order_id}`,{
            headers: {
                'Authorization': 'DEN ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log(response.data);
            //console.log(response.data.gender);
            console.log(this.id);
            this.Patientname = response.data.patientName
            this.Age = response.data.age;
            this.Toothcolor = response.data.color;
            this.numberofteeth = response.data.teethNo;
            if(response.data.gender === 'M'){
                this.sex = 'Male';
                console.log(this.sex);
            }else{
                this.sex = 'Female';
            }
            
            this.sex = response.data.sex;
            this.note = response.data.description;
            this.type = response.data.type;
            console.log(this.type);
            //this.audioURL = response.data.records[0].voice_record;
            // this.audioURL = 'E:\\masallab editversion\\massalab\\voice_records'+response.data.records[0].voice_record;
            // console.log(this.audioURL);
            //this.records.push(response.data.records);
                this.records = response.data.voiceNote;
            console.log(this.records);
        })
    },
};
</script>
<style scoped>

@media print{
    .sidebar{
        display: none;
    }
    .content{
        position: absolute;
        width: 90%;
        left: -20%;
        top: 0;
    }
    button,i{
        display: none;
    }
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
    /* Set position to relative */
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
    /* Allow the select to take remaining space */
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
    position: absolute;
    right: -15px;
    bottom: 50px;
    background-color: black;
    border-radius: 10px 0 0 10px;
    width: 50px;
}

form {
    position: relative;
}

.printer i {
    color: white;
}

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