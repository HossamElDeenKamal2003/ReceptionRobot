<template>
    <div>
        <navBar />
        <div class="container" :class="{ 'change': isFlipped }">
            <div class="forms-container">
                <div class="form-control signup-form">
                    <form action="#">
                        <h2>Signup</h2>
                        <input type="text" placeholder="Username" required />
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <input type="password" placeholder="Confirm password" required />
                        <button @click="getCurrentLocation">Get Current Location</button>
                        <p v-if="latitude && longitude">
                            Latitude: {{ latitude }}<br>
                            Longitude: {{ longitude }}
                        </p>
                        <button>Signup</button>
                    </form>
                    <span>or signup with</span>
                    <div class="socials">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-google-plus-g"></i>
                        <i class="fab fa-linkedin-in"></i>
                    </div>
                </div>
                <div class="form-control signin-form">
                    <form action="#">
                        <h2>Signin</h2>
                        <input type="text" placeholder="Username" required />
                        <input type="password" placeholder="Password" required />
                        <button>Signin</button>
                    </form>
                    <span>or signin with</span>
                    <div class="socials">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-google-plus-g"></i>
                        <i class="fab fa-linkedin-in"></i>
                    </div>
                </div>
            </div>
            <div class="intros-container">
                <div class="intro-control signin-intro">
                    <div class="intro-control__inner">
                        <h2>Welcome back!</h2>
                        <p>
                            Welcome back! We are so happy to have you here. It's great to
                            see you again. We hope you had a safe and enjoyable time away.
                        </p>
                        <button @click="flipForms">No account yet? Signup.</button>
                    </div>
                </div>
                <div class="intro-control signup-intro">
                    <div class="intro-control__inner">
                        <h2>Come join us!</h2>
                        <p>
                            We are so excited to have you here. If you haven't already,
                            create an account to get access to exclusive offers, rewards, and
                            discounts.
                        </p>
                        <button @click="flipForms">Already have an account? Signin.</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css");

* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

body {
    font-family: "Poppins", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ddd;
    font-size: 14px;
}

.container {
    background-color: #fff;
    width: 760px;
    max-width: 100vw;
    height: 480px;
    position: relative;
    overflow-x: hidden;
    transform: translate(0, 10%);
}

.container .forms-container {
    position: relative;
    width: 50%;
    text-align: center;
}

.container .forms-container .form-control {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 480px;
    transition: all 0.5s ease-in;
}

.container .forms-container .form-control h2 {
    font-size: 2rem;
}

.container .forms-container .form-control form {
    display: flex;
    flex-direction: column;
    margin: 0px 30px;
}

.container .forms-container .form-control form input {
    margin: 10px 0px;
    border: none;
    padding: 15px;
    background-color: #efefef;
    border-radius: 5px;
}

.container .forms-container .form-control form button {
    border: none;
    padding: 20px;
    margin-top: 5px;
    background-color: #059669;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
}

.container .forms-container .form-control form button:focus {
    outline: none;
}

.container .forms-container .form-control span {
    margin: 10px 0px;
}

.container .forms-container .form-control .socials i {
    margin: 0 5px;
    color: #fff;
    border-radius: 50%;
}

.container .forms-container .form-control .socials .fa-facebook-f {
    padding: 5px 8px;
    background-color: #3b5998;
}

.container .forms-container .form-control .socials .fa-google-plus-g {
    padding: 5px 4px;
    background-color: #db4a39;
}

.container .forms-container .form-control .socials .fa-linkedin-in {
    padding: 5px 6px;
    background-color: #0e76a8;
}

.container .forms-container .form-control.signup-form {
    opacity: 0;
    z-index: 1;
    left: 200%;
}

.container .forms-container .form-control.signin-form {
    opacity: 1;
    z-index: 2;
    left: 0%;
}

.container .intros-container {
    position: relative;
    left: 50%;
    width: 50%;
    text-align: center;
}

.container .intros-container .intro-control {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 480px;
    color: #fff;
    background: linear-gradient(170deg, #34d399, #059669);
    transition: all 0.5s ease-in;
}

.container .intros-container .intro-control .intro-control__inner {
    margin: 0px 30px;
}

.container .intros-container .intro-control button {
    border: none;
    padding: 15px 30px;
    background-color: #10b981;
    border-radius: 50px;
    color: #fff;
    margin: 10px 0px;
    cursor: pointer;
}

.container .intros-container .intro-control button:focus,
.container .intros-container .intro-control button:hover {
    outline: none;
    background-color: #059669;
}

.container .intros-container .intro-control h3,
.container .intros-container .intro-control p {
    margin: 10px 0px;
}

.container .intros-container .intro-control.signin-intro {
    opacity: 1;
    z-index: 2;
}

.container .intros-container .intro-control.signup-intro {
    opacity: 0;
    z-index: 1;
}

.change .forms-container .form-control.signup-form {
    opacity: 1;
    z-index: 2;
    transform: translateX(-100%);
}

.change .forms-container .form-control.signup-form button {
    background-color: #2563eb !important;
}

.change .forms-container .form-control.signin-form {
    opacity: 0;
    z-index: 1;
    transform: translateX(-100%);
}

.change .intros-container .intro-control {
    transform: translateX(-100%);
    background: linear-gradient(170deg, #3b82f6, #2563eb);
}

.change .intros-container .intro-control #signin-btn {
    background-color: #2563eb;
}

.change .intros-container .intro-control.signin-intro {
    opacity: 0;
    z-index: 1;
}

.change .intros-container .intro-control.signup-intro {
    opacity: 1;
    z-index: 2;
}

@media screen and (max-width: 480px) {
    .container {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .container .forms-container {
        order: 2;
        width: 100%;
        height: 50vh;
    }

    .container .forms-container .form-control {
        position: absolute;
        height: 50vh;
    }

    .container .forms-container .form-control.signup-form {
        left: 0%;
        margin-top: 70px;
    }

    .container .intros-container {
        order: 1;
        width: 100%;
        left: 0%;
        height: 40vh;
    }

    .container .intros-container .intro-control {
        position: absolute;
        height: 40vh;
    }

    .change .forms-container .form-control.signup-form {
        transform: translateX(0%);
    }

    .change .forms-container .form-control.signin-form {
        transform: translateX(0%);
    }

    .change .intros-container .intro-control {
        transform: translateX(0%);
    }
}
</style>
<script>
import navBar from "@/components/global/navBar.vue";
export default {
    name: "logIn",
    components: {
        navBar,
    },
    data() {
        return {
            address: '',
            isFlipped: false,
        };
    },
    methods: {
        flipForms() {
            this.isFlipped = !this.isFlipped;
        },
        // getCurrentLocation() {
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(
        //             this.onSuccess,
        //             this.onError
        //         );
        //     } else {
        //         console.log('Geolocation is not supported by this browser.');
        //     }
        // },
        // onSuccess(position) {
        //     this.latitude = position.coords.latitude;
        //     this.longitude = position.coords.longitude;
        // },
        onError(error) {
            console.log('Error occurred while getting geolocation:', error);
        }
    }
};
</script>
