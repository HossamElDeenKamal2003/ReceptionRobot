<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div class="parent">
        <img src="@/assets/firstImage.jpg" alt="">
        <div class="text">
            <h1 style="color:#33A1F1;">Recption Robot</h1>
            <h5 style="color:black;">Manage Your Labs Efficiently!</h5>
            <button class="btn btn-primary" @click="showCards"><span>Learn More</span></button>
        </div>
        <div class="cards" id="cards" v-bind:style="{ display: visable }">
            <div class="card" style="width: 18rem; hei">
                <div class="card-body">
                    <h5 class="card-title">Dental Doctors</h5>
                    <p class="card-text">For Dental Doctor we help him to send and recieve Orders from to labs </p>
                </div>
            </div>
            <div class="card" style="width: 18rem;height:15rem;">
                <div class="card-body" style="background-color: #356F99;">
                    <h5 class="card-title">Delivery</h5>
                    <p class="card-text">we have delievery part that link between doctors and labs </p>
                </div>
            </div>
            <div class="card" style="width: 18rem; height:15rem;">
                <div class="card-body">
                    <h5 class="card-title">Labs</h5>
                    <p class="card-text">we help labs to send dental products to doctors by using our platform, manage Financial accounts and other</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
    margin-top: 1px;
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: top;
}

p{
    text-transform: capitalize;
}
h1 {
    font-size: 3em;
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
h5 {
    font-size: 1.7em;
    animation-name: slide-in;
    animation-duration: 2s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}
@keyframes slide-in {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
.text {
    translate: -30% -280%;
}

.btn {
    width: 200px;
    font-size: 1.5em;
    border-radius: 100px;
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
button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
}

button span:after {
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
}

button:hover span {
    padding-right: 25px;
}

button:hover span:after {
    opacity: 1;
    right: 0;
}

.cards{
    justify-content: space-around;
    translate:0 -150%;
    flex-wrap: wrap;
    animation-name: slide-axis;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}

@keyframes slide-axis {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
.card-body{
    background-color: #51ADF0;
    color: white;

}
@media only screen and (max-width: 768px) {
    .parent{
        height: fit-content;
    }
    .cards{
        translate:0 -70%;
        gap: 15px;
    }
    .text{
        translate: 2% -320%;
    }
}

@media only screen and (max-width: 895px){
    .cards{
        translate:0 -60%;
        gap: 15px;
    }
}


</style>
<script>
export default {
    name: 'firstSection',
    data() {
        return {
            visable: "none",
            justify:""
        }
    },
    methods:{
        showCards(){
            this.visable = "flex";
            this.justify = "space-around";
        }
    }
}
</script>