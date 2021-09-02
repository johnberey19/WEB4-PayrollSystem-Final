import {Attendance} from "./Attendance.js";
import { Employee } from "./Employee.js";

var attend = new Attendance();
var emp = new Employee();

document.getElementById("btnSave").onclick = function () {
    
};
document.getElementById("btnClose").onclick = function () {
  adjustment.clearInput();
};
var attendance = new Vue({
    el:'#attendance',
    data:{
        empId: new Number(),
        timeIn: new Date(),
        timeOut: new Date()

    }
})