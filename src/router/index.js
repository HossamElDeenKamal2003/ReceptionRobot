import { createRouter, createWebHistory } from "vue-router";
import homeView from "../views/Home/homeView.vue";
import logIn from "@/views/login/logIn.vue";
import doctorView from "@/views/DoctorsPage/doctorView.vue";
import allOrders from "@/views/DoctorsPage/AllOrders.vue";
import deliveryPage from "@/views/DoctorsPage/deliveryPage.vue";
import financePage from "@/views/DoctorsPage/financePage.vue";
import editPage from "@/views/DoctorsPage/editPage.vue";
import socialPage from "@/views/social/mainPage.vue";
import allOrderslabs from "@/views/labs/allordersPage.vue";
import deliveryAdmin from "@/views/delivery/deliveryadminPage.vue";
import financeDel from "@/views/delivery/financeDel.vue";
import contactLab from "@/views/labs/contactPage.vue";
import doctorLab from "@/views/labs/doctorPage.vue";
import deliveryLab from "@/views/labs/deliveryLab.vue";
import financeLabs from "@/views/labs/financeLab.vue";
import showOrder from "@/views/labs/showOrder.vue";
import adminPanel from "@/components/admin/adminPanel.vue";
const routes = [
  {
    path:"/adminpanel",
    name:"adminPanel",
    component:adminPanel,
  }
  ,
  {
    path: "/",
    name: "home",
    component: homeView,
  },
  {
    path: "/login",
    name: "login",
    component: logIn,
  },
  {
    path:"/newOrder",
    name:"newOrder",
    component: doctorView,
  },
  {
    path:"/allorders",
    name:"allorders",
    component: allOrders,
  },
  {
    path:"/delievry",
    name:"delievery",
    component:deliveryPage,
  },
  {
    path:"/finance",
    name:"finance",
    component:financePage
  },
  {
    path:"/edit/:id",
    name:"edit",
    component:editPage,
    props:true
  },
  {
    path:"/social",
    name:"social",
    component:socialPage,
  },
  {
    path:"/labs",
    name:"labs",
    component:allOrderslabs
  },
  {
    path:"/contactEdit/:id",
    name:"contactEdit",
    component:contactLab,
    props:true
  },
  {
    path:"/deliveryAdmin",
    name:"deliveryAdmin",
    component:deliveryAdmin
  },
  {
    path:"/allOrderslabs",
    name:"allOrderslabs",
    component:allOrderslabs,
  },
  {
    path:"/financeDel",
    name:"financeDel",
    component:financeDel,
  },
  {
    path:"/contact",
    name:"contact",
    component:contactLab,
  },
  {
    path:"/doctorLab",
    name:"doctorLab",
    component:doctorLab,
  },
  {
    path:"/deliveryLabs",
    name:"deliveryLabs",
    component:deliveryLab,
  },
  {
    path:"/showorder/:id",
    name:"showOrder",
    component:showOrder,
    props:true
  },
  {
    path:"/financeLabs",
    name:"financeLabs",
    component:financeLabs
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
