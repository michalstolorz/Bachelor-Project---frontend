import Vue from "vue";
import VueRouter from "vue-router";
import Repair from "../views/Repair.vue";
import Repairs from "../views/Repairs.vue";
import AddRepair from "../views/AddRepair.vue";
import RepairTypes from "../views/RepairTypes.vue";
import RegisterEmployee from "../views/RegisterEmployee.vue";
import RegisterCustomer from "../views/RegisterCustomer.vue";
import Login from "../views/Login.vue";
import CustomerRepairs from "../views/CustomerRepairs.vue";
import CustomerRepair from "../views/CustomerRepair.vue";
import RepairsForAssign from "../views/RepairsForAssign.vue";
import Parts from "../views/Parts.vue";
import CreateInvoice from "../views/CreateInvoice.vue";
import Users from "../views/Users.vue";
import ChangePassword from "../views/ChangePassword.vue";
import EditUser from "../views/EditUser.vue";
import EditUserByAdmin from "../views/EditUserByAdmin.vue";
import Forbidden from "../views/Forbidden.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/repair/:id",
    name: "Repair",
    component: Repair,
  },
  {
    path: "/repairs",
    name: "Repairs",
    component: Repairs,
  },
  {
    path: "/repairTypes",
    name: "RepairTypes",
    component: RepairTypes,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/addRepair",
    name: "AddRepair",
    component: AddRepair,
  },
  {
    path: "/registerEmployee",
    name: "RegisterEmployee",
    component: RegisterEmployee,
  },
  {
    path: "/registerCustomer",
    name: "RegisterCustomer",
    component: RegisterCustomer,
  },
  {
    path: "/customerRepairs",
    name: "CustomerRepairs",
    component: CustomerRepairs,
  },
  {
    path: "/customerRepair/:id",
    name: "CustomerRepair",
    component: CustomerRepair,
  },
  {
    path: "/repairsForAssign",
    name: "RepairsForAssign",
    component: RepairsForAssign,
  },
  {
    path: "/parts",
    name: "Parts",
    component: Parts,
  },
  {
    path: "/createInvoice",
    name: "CreateInvoice",
    component: CreateInvoice,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    component: ChangePassword,
  },
  {
    path: "/editUser",
    name: "EditUser",
    component: EditUser,
  },
  {
    path: "/editUserByAdmin/:userId",
    name: "EditUserByAdmin",
    component: EditUserByAdmin,
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: Forbidden,
  },
  {
    path: "/notFound",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
