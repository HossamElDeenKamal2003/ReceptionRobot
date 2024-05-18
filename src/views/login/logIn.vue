<template>
  <div>
    <navBar />
    <div class="container" :class="{ change: isFlipped }">
      <p>{{ signUpError }}</p>
      <div class="forms-container">
        <div class="form-control signup-form">
          <form action="#">
            <h2 style="margin-top: 280px">Signup</h2>
            <input
              type="text"
              placeholder="Username"
              v-model="signUp.usernameSign"
              name="usernamesign"
              required
            />
            <span v-if="usernameError !== ''" style="color: red">{{
              usernameError
            }}</span>
            <input
              type="text"
              placeholder="phoneNumber"
              v-model="signUp.phoneNumber"
            />
            <span v-if="usernameError !== ''" style="color: red">{{
              phoneNumberError
            }}</span>
            <input
              type="email"
              placeholder="Email"
              required
              v-model="signUp.Email"
            />
            <span v-if="usernameError !== ''" style="color: red">{{
              EmailError
            }}</span>
            <input
              type="Number Of bulding"
              placeholder="Number Of bulding"
              required
              v-model="signUp.numerofbuilding"
            />
            <span v-if="usernameError !== ''" style="color: red">{{
              numerofbuildingError
            }}</span>
            <input
              type="Number Of Floor"
              placeholder="Number Of Floor"
              required
              v-model="signUp.numberofroof"
            />
            <span v-if="usernameError !== ''" style="color: red">{{
              numberofroofError
            }}</span>
            <input
              type="text"
              placeholder="Address"
              required
              v-model="address"
            />
            <span v-if="usernameError !== ''" style="color: red">{{
              addressError
            }}</span>
            <input
              type="password"
              placeholder="Password"
              required
              v-model="signUp.passwordSign"
            />
            <span v-if="usernameError !== ''" style="color: red">{{
              passwordError
            }}</span>
            <input
              type="password"
              placeholder="Confirm password"
              required
              v-model="signUp.reaptedPassword"
            />
            <p v-if="latitude && longitude">
              Latitude: {{ latitude }}<br />
              Longitude: {{ longitude }}
            </p>
            <div>
              <input
                type="radio"
                id="doctor"
                name="role"
                value="DOC"
                v-model="signUp.role"
              />
              <label for="doctor">Doctor</label>
              <input
                type="radio"
                id="laboratory"
                name="role"
                value="LAB"
                v-model="signUp.role"
              />
              <label for="laboratory">Laboratory</label>
              <input
                type="radio"
                id="normal"
                name="role"
                value="NOM"
                v-model="signUp.role"
              />
              <label for="normal">Normal</label>
            </div>
            <button @click="getCurrentLocationAndSubmit">Signup</button>
          </form>
          <!-- <span>or signup with</span>
          <div class="socials">
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-google-plus-g"></i>
            <i class="fab fa-linkedin-in"></i>
          </div> -->
        </div>
        <div class="form-control signin-form">
          <form action="#">
            <h2>Signin</h2>
            <input
              type="text"
              placeholder="Username"
              required
              name="usernamelog"
              v-model="this.login.usernameLog"
            />
            <input
              type="password"
              placeholder="Password"
              required
              v-model="this.login.passwordLog"
            />
            <button @click="Login">Signin</button>
          </form>
          <!-- <span>or signin with</span> -->
          <!-- <div class="socials">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-google-plus-g"></i>
                        <i class="fab fa-linkedin-in"></i>
                    </div> -->
        </div>
      </div>
      <div class="intros-container">
        <div class="intro-control signin-intro">
          <div class="intro-control__inner">
            <h2>Welcome back!</h2>
            <p>
              Welcome back! We are so happy to have you here. It's great to see
              you again. We hope you had a safe and enjoyable time away.
            </p>
            <button @click="flipForms">No account yet? Signup.</button>
          </div>
        </div>
        <div class="intro-control signup-intro">
          <div class="intro-control__inner">
            <h2>Come join us!</h2>
            <p>
              We are so excited to have you here. If you haven't already, create
              an account to get access to exclusive offers, rewards, and
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

.container .forms-container .form-control.signup-form::-webkit-scrollbar {
  display: none;
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
  /*overflow-x: hidden;*/
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
  overflow-y: scroll;
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
import axios from 'axios';

export default {
    name: "logIn",
    components: {
        navBar,
    },

    data() {
        return {
            isFlipped: false,
            address: '',
            signUpError:'',
            usernameError:'',
            passwordError:'',
            phoneNumberError:'',
            EmailError:'',
            numerofbuildingError:'',
            numberofroofError:'',
            addressError:'',
            signUp: {
                usernameSign: '',
                passwordSign: '',
                repeatedPassword: '',
                phoneNumber: '',
                numerofbuilding: '',
                numberofroof: '',
                Email: "",
                location: "",
                role: "",
            },
            login: {
                usernameLog: '',
                passwordLog: '',
            },
        };
    },
    methods: {
        flipForms() {
            this.isFlipped = !this.isFlipped;
        },
        getCurrentLocationAndSubmit(event) {
            event.preventDefault();
                let createUser_API = 'https://api.receptionrobot.net/users/signup';
                axios.post(createUser_API, {
                        "username": this.signUp.usernameSign,
                        "phone":this.signUp.phoneNumber,
                        "buildNo":this.signUp.numerofbuilding,
                        "floorNo":this.signUp.numberofroof,
                        "address":this.address,
                        "password": this.signUp.passwordSign,
                        "email": this.signUp.Email,
                        "role":this.signUp.role
                }).then((response) => {
                      localStorage.setItem('token', response.data.token);
                      localStorage.setItem('username', response.data.user.username);
                      localStorage.setItem('id', response.data.user.UID);
                      localStorage.setItem('contract', response.data.labContract)
                      this.$router.push('/');
                    }).catch((error=>{
                      if(error.response && error.response.status === 500){
                        alert("Please enter all data");
                      }
                    }))
                    // axios.post('http://45.93.138.72:3000/users/login', {
                    //     username: this.signUp.usernameSign,
                    //     password: this.signUp.passwordSign
                    // }).then(response => {
                    //     localStorage.setItem('token', response.data.token);
                    //     localStorage.setItem('username', response.data.user);
                    //     localStorage.setItem('id', response.data.id);
                    //     this.$router.push('/')
                    // }).catch(error => {
                    //     console.log(error);
                    // });
                    // console.log("loginSuccessfully");
                // }).catch(error => {
                //     console.log(error);
                    //alert(error.response.data);
                    // this.usernameError = error.response.data.username[0];
                    // this.passwordError = error.response.data.password[0];
                    // this.emailError = error.response.data.email[0];
                    // this.numberofroofError = error.response.data.numberofroof[0];
                    // this.numberofroof = error.response.data.numberofroof
                    // this.phoneNumberError = error.response.data.phoneNumber[0];
                
            // }
        },
        Login(e) {
            e.preventDefault();
            axios.post('https://api.receptionrobot.net/users/login', {
                username: this.login.usernameLog,
                password: this.login.passwordLog,
            }).then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('id', response.data.user._id);
                localStorage.setItem('UID', response.data.user.UID);
                localStorage.setItem('delSub', response.data.user.publicDelivery)
                localStorage.setItem('role', response.data.user.role);
                localStorage.setItem('contract', JSON.stringify(response.data.user.labContract));
                //console.log(response.data.user.role);
                this.$router.push('/');
            }).catch(error => {
                if (error.response && error.response.status === 401) {
            // Unauthorized access, i.e., incorrect username or password
                    alert('Incorrect username or password. Please try again.');
                } else {
                    // Other errors
                    alert('An error occurred while logging in. Please try again later.');
                }
            });
        },
    },
    watch:{
      signUpError(){
        if(this.signUp.passwordSign.length < 6){
          this.signUpError = "Password must be at least 6 characters";
        }
        if(this.signUp.passwordSign !== this.signUp.repeatedPassword){
          this.signUpError + ", two passwords field must be the same";
        }
      }
    }
};
</script>
