import { Adjustment } from "./Adjustment.js";
import { Employee } from "./Employee.js";

var emp = new Employee();
var adjustment = new Adjustment();

document.getElementById("btnSave").onclick = function () {
    
  };
  document.getElementById("btnClose").onclick = function () {
    adjustment.clearInput();
  };

var adjustment = new Vue({
    el:'#adjustments',
    data:{
        empId: new Number(),
        classification: new Boolean(),
        description: new String(),
        amount: new Number(),
        dt: new Date()
    },
    methods:{
        addAdjustments: function(){
            emp.read(empId);
            if(emp.employeeID == null){
                this.clearInput();
               

              }
              else
              {
                adjustment.generateID();
                adjustment.write(adjustment.adjustmentID, 
                                this.empId,
                                this.classification,
                                this.description,
                                this.amount,
                                this.date);
                              
                alert('Account created successfully!');
                this.clearInput();

              }
        },
        clearInput: function(){
            this.empId = null;
            this.classification = null;
            this.description = null;
            this.amount = null;
            this.date = null;
        }
    }
})