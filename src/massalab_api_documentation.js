// Notes:
//  -   use the main request in each request.
//  -   change only the ApiUrl and ApiData in each request.
//  -   each string start with $ is variable.
//  -   the response is the result of axios.post(ApiUrl, ApiData).
//  -   code authentication [get token] should be executed during the initial page load
//      at least once to ensure authorized access to the requested endpoints.
//  -   code authentication [set token] should be excuted once the user logs in

// main request
axios.post(ApiUrl, ApiData).then(response => {
    if (response.status === 200) {
        console.log(response);
    }
}).catch(error => {
    console.log(error);
    if (error.response) {
        console.error(error.response.data);
    }
})

// get token from localStorage and set it to Authorization header
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

// set token to localStorage after login
localStorage.setItem('token', response.data.token);

// links and datas

// Login
ApiUrl = 'http://127.0.0.1:8000/api/signin/';
ApiData = {
    'username': '$username',
    'password': '$password',
};

response = {
    "message": "Login successful",
    "user": "$username_logged_in",
    "token": "$authentication_token", // should be stored in local_storage
}

// Signup
ApiUrl = 'http://127.0.0.1:8000/api/create_user/';
ApiData = {
    "user": {
        "username": "$username",
        "password": "$password",
        "email": "$email"
    },
    "user_profile": {
        "role": "$role", // can be [DOCTOR = 'd', LABORATORY = 'l', DELIVERY = 'e', NORMAL = 'n']
        "phoneNumber" : "$phonenumber", // should be in format: +[country code][number] e.g.: +3592345678
    },
    // if user is laboratory
    "laboratory_profile": {
        "name": "$laboratory_name",
        "location": "$location" // location in hexadecimal form: (eg. 0101000020E6100000FFFFFFFFFFEF9EBF01EF1DE7FF499F3F)
    },
    // if user is doctor
    "doctor_profile": {
        "name": "$doctor_name",
        "location": "$location", // location in hexadecimal form: (eg. 0101000020E6100000FFFFFFFFFFEF9EBF01EF1DE7FF499F3F)
        "laboratory": "$laboratoryId" // id of laboratory that the doctor belongs to
    },
};

response = {
    "user": {
        "id": "$userId", // integer
        "password": "$hashed_password",
        "last_login": "$last_login", // (eg. 2024-03-25T11:09:38.597450Z)
        "is_superuser": "$is_superuser", // boolean, whether this user iss admin
        "username": "$username",
        "first_name": "$first_name",
        "last_name": "$last_name",
        "email": "$email",
        "is_staff": "$is_staff",  // boolean, whether this user can manage users and groups.
        "is_active": "$is_active", //  boolean, whether this account is active.
        "date_joined": "$date_joined",
        "groups": "$groups", // list of group names this user belongs to
        "user_permissions": "$permissions"  // list of permission granted to user.
    },
    "user_profile": {
        "id": "$user_profile_id",
        "role": "$role",
        "phoneNumber": "$phone_number", 
        "user": "$userId"
    },
    "specific_profile": "normal user", // if delivery or normal
    "specific_profile": {
        "id": "$specific_profile_id",
        "name": "${laboratory|doctor}_name",
        "location": "$location", // in point format (eg. SRID=4326;POINT (-0.03021240234375 0.0305557236492708))
        "user": "$userId"
    }, // if doctor or laboratory
    "login_info": {
        "message": "Login successful",
        "user": "$username"
    }
}

// Create Order
ApiUrl = 'http://127.0.0.1:8000/api/create_order/';
let formData = new FormData();
formData.append('voice_record', "$file");
ApiData = {
    "name": "$patient_name",
    "age": "$patient_age", // integer
    "teethNbr": "$patient_teeth_number", // integer
    "gender": "$patient_gender",  // can be [male = M, female = F]
    "price": "$price", // integer
    "note": "$order_details",
};
for (let key in ApiData) {
if (data.hasOwnProperty(key)) {
    formData.append(key, data[key]);
}
}

response = {
    "id": "$order_id",
    "records": {
        "voice_record": "$voice_record_file_src",
        "order": "$order_id"
    },
    "name": "$patient_name",
    "age": "$patient_age",
    "teethNbr": "$patient_teeth_number",
    "gender": "$patient_gender",
    "color": "$color", // always null
    "type": "$type", // always null
    "status": "$status", // u by default (underway)
    "last_updated": "$last_update_date", // datetime format
    "created_at": "2024-03-26T16:54:50.411130Z", // datetime format
    "note": "$order_details", 
    "price": "$price",
    "been_payed": "$been_payed",
    "not_payed": "$not_payed",
    "is_delivered": "$is_delivered", //  boolean, whether the order is delivered or not
    "doctor": "$doctor_profile_id",
}

// Get Orders
// method : GET
// Doctor
ApiUrl = 'http://127.0.0.1:8000/api/doctor/all_orders/'; // to get all orders
ApiUrl = 'http://127.0.0.1:8000/api/doctor/all_orders/?status=u'; // to get uderway orders only
ApiUrl = 'http://127.0.0.1:8000/api/doctor/all_orders/?status=e'; // to get end orders only
// Laboratory
ApiUrl = 'http://127.0.0.1:8000/api/laboratory/all_orders/'; // to get all orders
ApiUrl = 'http://127.0.0.1:8000/api/laboratory/all_orders/?status=u'; // to get uderway orders only
ApiUrl = 'http://127.0.0.1:8000/api/laboratory/all_orders/?status=e'; // to get end orders only
// Delivery
ApiUrl = 'http://127.0.0.1:8000/api/delivery/all_orders/'; // to get all orders
ApiUrl = 'http://127.0.0.1:8000/api/delivery/all_orders/?status=u'; // to get uderway orders only
ApiUrl = 'http://127.0.0.1:8000/api/delivery/all_orders/?status=e'; // to get end orders only

response = [
    {
        "id": "$order_id",
        "records": {
            "voice_record": "$voice_record_file_src",
            "order": "$order_id"
        },
        "name": "$patient_name",
        "age": "$patient_age",
        "teethNbr": "$patient_teeth_number",
        "gender": "$patient_gender",
        "color": "$color", // always null
        "type": "$type", // always null
        "status": "$status", // u by default (underway)
        "last_updated": "$last_update_date", // datetime format
        "created_at": "2024-03-26T16:54:50.411130Z", // datetime format
        "note": "$order_details", 
        "price": "$price",
        "been_payed": "$been_payed",
        "not_payed": "$not_payed",
        "is_delivered": "$is_delivered", //  boolean, whether the order is delivered or not
        "doctor": "$doctor_profile_id",
    },
    {
        "id": "$order_id",
        "records": {
            "voice_record": "$voice_record_file_src",
            "order": "$order_id"
        },
        "name": "$patient_name",
        "age": "$patient_age",
        "teethNbr": "$patient_teeth_number",
        "gender": "$patient_gender",
        "color": "$color", // always null
        "type": "$type", // always null
        "status": "$status", // u by default (underway)
        "last_updated": "$last_update_date", // datetime format
        "created_at": "2024-03-26T16:54:50.411130Z", // datetime format
        "note": "$order_details", 
        "price": "$price",
        "been_payed": "$been_payed",
        "not_payed": "$not_payed",
        "is_delivered": "$is_delivered", //  boolean, whether the order is delivered or not
        "doctor": "$doctor_profile_id",
    },
    // rest of orders
]

// Update Order
// method : PATCH
// Doctor
ApiUrl = 'http://localhost:8000/api/doctor/edit_order/$order_id/';
// Laboratory
ApiUrl = 'http://localhost:8000/api/laboratory/edit_order/$order_id/';
// Delivery
ApiUrl = 'http://localhost:8000/api/delivery/edit_order/$order_id/';

ApiData = { // you can send only the data that you want to update
    "name": "$patient_name",
    "age": "$patient_age", // integer
    "teethNbr": "$patient_teeth_number", // integer
    "gender": "$patient_gender",  // can be [male = M, female = F]
    "price": "$price", // integer
    "note": "$order_details",
};

response = {
    "id": "$order_id",
    "records": {
        "voice_record": "$voice_record_file_src",
        "order": "$order_id"
    },
    "name": "$patient_name",
    "age": "$patient_age",
    "teethNbr": "$patient_teeth_number",
    "gender": "$patient_gender",
    "color": "$color", // always null
    "type": "$type", // always null
    "status": "$status", // u by default (underway)
    "last_updated": "$last_update_date", // datetime format
    "created_at": "2024-03-26T16:54:50.411130Z", // datetime format
    "note": "$order_details", 
    "price": "$price",
    "been_payed": "$been_payed",
    "not_payed": "$not_payed",
    "is_delivered": "$is_delivered", //  boolean, whether the order is delivered or not
    "doctor": "$doctor_profile_id",
}

// Delete Order
// method : PATCH
ApiUrl = 'http://localhost:8000/api/delete_order/$order_id/';

response = {
    "message": "Order deleted successfully"
}

// Get one Order
// method : Get
// Doctor
ApiUrl = 'http://localhost:8000/api/doctor/get_order/$order_id/';
// Laboratory
ApiUrl = 'http://localhost:8000/api/laboratory/get_order/$order_id/';
// Doctor
ApiUrl = 'http://localhost:8000/api/delivery/get_order/$order_id/';

response = {
    "id": "$order_id",
    "records": {
        "voice_record": "$voice_record_file_src",
        "order": "$order_id"
    },
    "name": "$patient_name",
    "age": "$patient_age",
    "teethNbr": "$patient_teeth_number",
    "gender": "$patient_gender",
    "color": "$color", // always null
    "type": "$type", // always null
    "status": "$status", // u by default (underway)
    "last_updated": "$last_update_date", // datetime format
    "created_at": "2024-03-26T16:54:50.411130Z", // datetime format
    "note": "$order_details", 
    "price": "$price",
    "been_payed": "$been_payed",
    "not_payed": "$not_payed",
    "is_delivered": "$is_delivered", //  boolean, whether the order is delivered or not
    "doctor": "$doctor_profile_id",
}


// Laboratory Financials
// method : GET
ApiUrl = 'http://localhost:8000/api/laboratory/financials/';
ApiData = { // if not send get all financials
    "start_date": "$start_date", // in the format  YYYY-MM-DD
    "end_date": "$end_date" // in the format  YYYY-MM-DD
};

response = [
    {
        "doctor": "$doctor_id",
        "doctor__name": "$doctor_name",
        "total_orders": "$total_number_of_orders", // integer
        "total_price": "$total_price", //  float number 
        "total_been_payed": "$total_been_payed", //  float number 
        "total_not_payed": "$total_not_payed", //  float number 
    },
    {
        "doctor": "$doctor_id",
        "doctor__name": "$doctor_name",
        "total_orders": "$total_number_of_orders", // integer
        "total_price": "$total_price", //  float number 
        "total_been_payed": "$total_been_payed", //  float number 
        "total_not_payed": "$total_not_payed", //  float number 
    },
    // other doctors
]

// Delivery Financials
// method : GET
ApiUrl = 'http://localhost:8000/api/delivery/financials/';
ApiData = { // if not send get all financials
    "start_date": "$start_date", // in the format  YYYY-MM-DD
    "end_date": "$end_date" // in the format  YYYY-MM-DD
};

response = [
    {
        "doctor__laboratory__name": "$laboratory_name",
        "total_orders": "$total_number_of_orders", // integer
        "total_price": "$total_price", //  float number 
        "total_been_payed": "$total_been_payed", //  float number 
        "total_not_payed": "$total_not_payed", //  float number 
    },
    {
        "doctor__laboratory__name": "$laboratory_name",
        "total_orders": "$total_number_of_orders", // integer
        "total_price": "$total_price", //  float number 
        "total_been_payed": "$total_been_payed", //  float number 
        "total_not_payed": "$total_not_payed", //  float number 
    },
    // other laboratories
]


// Get Or Create Contract
// if create new contract assign the lab to doctor id
ApiUrl = 'http://127.0.0.1:8000/api/get_or_create_contract/';
ApiData = {
    "doctor": "$doctor_profile_id"
};

response = {
    "id": "$contract_id",
    "description": "$description",
    "zircon_wave": "$price",
    "zircon_dental_direct": "$price",
    "zircon_emax_prime_ivoclar": "$price",
    "impress_crown": "$price",
    "impress_intaly": "$price",
    "impress_onlay": "$price",
    "impress_overlay": "$price",
    "pfm": "$price",
    "implant_zircon": "$price",
    "implant_pfm": "$price",
    "night_gard": "$price",
    "night_white": "$price",
    "retainer": "$price",
    "study_model": "$price",
    "snap_on_smile": "$price",
    "doctor": "$doctor_id",
    "lab": "$laboratory_id"
}

// Update Contract
ApiUrl = 'http://127.0.0.1:8000/api/edit_contract/$contract_id/';
ApiData = { // you can send only the data that you want to update
    "description": "$description",
    "zircon_wave": "$price",
    "zircon_dental_direct": "$price",
    "zircon_emax_prime_ivoclar": "$price",
    "impress_crown": "$price",
    "impress_intaly": "$price",
    "impress_onlay": "$price",
    "impress_overlay": "$price",
    "pfm": "$price",
    "implant_zircon": "$price",
    "implant_pfm": "$price",
    "night_gard": "$price",
    "night_white": "$price",
    "retainer": "$price",
    "study_model": "$price",
    "snap_on_smile": "$price",
};

response = {
    "id": "$contract_id",
    "description": "$description",
    "zircon_wave": "$price",
    "zircon_dental_direct": "$price",
    "zircon_emax_prime_ivoclar": "$price",
    "impress_crown": "$price",
    "impress_intaly": "$price",
    "impress_onlay": "$price",
    "impress_overlay": "$price",
    "pfm": "$price",
    "implant_zircon": "$price",
    "implant_pfm": "$price",
    "night_gard": "$price",
    "night_white": "$price",
    "retainer": "$price",
    "study_model": "$price",
    "snap_on_smile": "$price",
    "doctor": "$doctor_id",
    "lab": "$laboratory_id"
}

// Delete Order From Delivery
// Depricated (Don't use this API)
ApiUrl = 'http://localhost:8000/api/mark_as_delivered/';
ApiData = {
    "pk": "$order_id"
};

response = {
    "id": "$order_id",
    "records": {
        "voice_record": "$voice_record_file_src",
        "order": "$order_id"
    },
    "name": "$patient_name",
    "age": "$patient_age",
    "teethNbr": "$patient_teeth_number",
    "gender": "$patient_gender",
    "color": "$color", // always null
    "type": "$type", // always null
    "status": "$status", // u by default (underway)
    "last_updated": "$last_update_date", // datetime format
    "created_at": "2024-03-26T16:54:50.411130Z", // datetime format
    "note": "$order_details", 
    "price": "$price",
    "been_payed": "$been_payed",
    "not_payed": "$not_payed",
    "is_delivered": "$is_delivered", //  boolean, whether the order is delivered or not
    "doctor": "$doctor_profile_id",
}

// Laboratory's Doctors
// method : GET
ApiUrl = 'http://127.0.0.1:8000/api/lab_doctors/';

response = {
    "user": "$userId",
    "name": "$doctor_name",
    "laboratory": "$laboratory_id",
    "location": "$location", // in point format (eg. SRID=4326;POINT (-0.03021240234375 0.0305557236492708))
    "is_confirmed": "$is_confirmed", // boolean, not used
}

// 
ApiUrl = 'http://127.0.0.1:8000/api//';
ApiData = {
    'key': '$var',
};

response = {}
// <td><router-link :to="'/edit/' + order.id" class="edit">Edit</router-link></td>
