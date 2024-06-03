<template>
    <section class="all-orders">
        <div class="sidebar" :class="{ 'active': isActiveSidebar }">
            <router-link to="/newOrder" style="text-decoration: underline;">New Order</router-link>
            <router-link to="/allorders">All Orders</router-link>
        </div>
        <div class="content" style="overflow:auto;">
            <form @submit.prevent="preventSub">
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
                    </div>
                    <div>
                        <label class="form-label">Type</label>
                        <select class="form-select" v-model="type">
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
                    <img src="@/assets/illustrateTeethimage.png" alt="Teeth Image" width="100%" height="50%">
                    <label>Requirments</label>
                    <textarea name="" id="" style="overflow:auto; width:100%; height: 25%" v-model="note"></textarea>
                    <div class="container">
                        <div class="display">
                            <p>{{ message }}</p>
                        </div>
                    </div>
                </div>
                <label for="images">Images</label>
                <div class="images" id="images">
                    <input type="file" name="image" id="image" accept="image/*" @change="handleImageChange">
                    <input type="file" name="image1" id="image1" accept="image/*" @change="handleImageChange1">
                    <input type="file" name="image2" id="image2" accept="image/*" @change="handleImageChange2">
                </div>
                <label for="video">Video</label>
                <div class="video" id="video">
                    <input type="file" name="image" id="image" accept="video/*" @change="handleImageChangeVideo">
                </div>
                <div class="screen">
                    <label for="file">Screen Device</label>
                    <input type="file" name="file" id="file" @change="handleFile">
                </div>
                <div class="print&sub">
                    <div class="sub">
                        <button class="btn btn" title="Save" type="Submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
export default {
    name: "newOrder",
    data() {
        return {
            isActiveSidebar: false,
            users: [],
            Patientname: "",
            errorName: "",
            Age: "",
            sex: "",
            numberofteeth: "",
            Toothcolor: "",
            type: "",
            note: "",
            currentState: 'Initial',
            message: '',
            mediaRecorder: null,
            audioURL: '',
            inputURL: "",
            contract: {},
            totalPrice: "",
            doc_id: "",
            images: [],
            imagePreviews: [],
            image: null,
            image1: null,
            image2: null,
            specdesc:"",
            video:null,
            file: null,
        };
    },
    methods: {
        handleFileChange(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.images.push(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreviews.push(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        },
        handleImageChange(event) {
            this.image = event.target.files[0];
        }, 
        handleImageChange1(event) {
            this.image1 = event.target.files[0];
        },
        handleImageChange2(event) {
            this.image2 = event.target.files[0];
        },
        handleImageChangeVideo(event){
            this.video = event.target.files[0];
        },
        handleFile(event){
            this.file = event.target.files[0];
        },
        checkName() {
            const name = this.Patientname;
            return name !== "";
        },
        preventSub(e) {
            e.preventDefault();
            if (this.Patientname.trim() === "" || this.Age.trim() === "" || this.numberofteeth.trim() === "") {
                alert("Please fill patient name, age and number of teeth");
                return;
            }
            const formData = new FormData();
            formData.append('patientName', this.Patientname);
            formData.append('age', this.Age);
            formData.append('color', this.Toothcolor);
            formData.append('sex', this.sex);
            formData.append('teethNo', this.numberofteeth);
            formData.append('description', this.note);
            formData.append('type', this.type);
            // this.images.forEach((image) => {
            //     formData.append('images[]', image);
            // });
            formData.append('image', this.image);
            formData.append('image1', this.image1);
            formData.append('image2', this.image2);
            formData.append('video', this.video);
            formData.append('file', this.file);
            axios.post('https://dentist-labs.onrender.com/doctors/orders/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'DEN ' + localStorage.getItem('token'),
                }
            }).then((response) => {
                alert("order sent successfully");
                console.log(formData);
                console.log(response.data);
                //this.$router.go();
            }).catch(error => {
                console.error("Error fetching data:", error);
                if (error.response.status === 400) {
                    alert("Doctor not registered on a lab");
                } else {
                    alert("An error occurred while sending the order. Please try again.");
                }
            })
        },
    },

}
</script>
<style scoped>
@media print {
    .sidebar {
        display: block;
    }

    .content {
        position: absolute;
        width: 90%;
        left: -20%;
        top: 0;
    }

    button,
    i {
        display: block;
    }

}


#contentPrint {
    display: none;
    color: red;
}



.contentPrint {
    display: none;
    color: red;
    background-color: red;
}

label {
    color: #33a1f1;
    font-size: larger;
    margin-top: 10px;
    text-decoration: underline;
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

.images{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
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