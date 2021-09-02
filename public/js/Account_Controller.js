import { Account } from "./Account.js";
import { Employee } from "./Employee.js";
import { Person } from "./Person.js";
import { Position } from "./Position.js";
import { Department } from "./Department.js";
var acc1 = new Account();
var emp = new Employee();
var per = new Person();
var pos = new Position();
var dep = new Department();

document.getElementById("btnSave").onclick = function () {
  acc.saveAccount();
};
document.getElementById("btnClose").onclick = function () {
  acc.clearInput();
};

var acc = new Vue({
  el: "#account",
  data:{
    empId: new Number(),
    pass: new String(),
    secQuestion: new String(),
    ans: new String,
    status: true,
    listEmp: []
 },
  methods: {

    },

    clearInput: function () {
      this.empId = null;
      this.password = null;
      this.secQuestion = null;
      this.answer = null;
      this.status = null;
    },
});
