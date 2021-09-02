document.getElementById("btnSave").onclick = function () {
    
};
document.getElementById("btnClose").onclick = function () {
  adjustment.clearInput();
};

var salary = new Vue({
    el:'salary',
    data:{
        empId: new Number(),
        startDate:new Date(),
        endDate:new Date,
        totalHrWrk: new Number(),
        totalOt:new Number(),
        regPay:new Number(),
        otPay:new Number(),
        sss:new Number(),
        pagibig:new Number(),
        philHealth: new Number(),
        gPay:new Number(),
        totalAdjustment:new Number(),
        nPay:new Number()
    },
    methods:{
        
    }
})