import { Contribution } from "./Contribution.js";

document.getElementById("btnSave").onclick = function () {
    
};
document.getElementById("btnClose").onclick = function () {
  adjustment.clearInput();
};

var contribute = new Contribution();

var contribution = new Vue({
    el:'#contribution',
    data:{
        sss: new Number(),
        pagibig: new Number,
        philHealth:new Number
    }
})