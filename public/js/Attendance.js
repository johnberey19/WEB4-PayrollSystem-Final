import { Employee } from "./Employee.js";


export class Attendance {
  constructor() {
    this.attendanceID = new Number();
    this.employee = new Employee();
    this.timeIn = new Date();
    this.timeOut = new Date();
    this.hoursWorked = new Number();
    this.otHours = new Number();
  }
  generateID() {
    firebase.database().ref()
      .child("Attendance")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.attendanceID = 1 + snapshot.numChildren();
        } else {
          this.attendanceID = 1;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  isExisting(attendanceID = new Number()) {
    var exist = new Boolean();
    firebase.database().ref()
      .child("Attendance")
      .child(attendanceID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          exist = true;
        } else {
          exist = false;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return exist;
  }
  computeWorkingHours() {
    var tempHW = this.timeOut.getHours() - this.timeIn.getHours(); //comp hours
    var tempM = this.timeOut.getMinutes() - this.timeIn.getMinutes(); //comp minutes
    var tempfinal = new Number();
    tempHW *= 60; //hours to mins
    tempfinal = tempHW + tempM; //total working mins
    if (Math.floor(tempfinal / 60) < 1) {
      //less than 1hr
      if (tempfinal > 29) {
        this.hoursWorked = 1;
        this.otHours = 0;
      } else {
        this.hoursWorked = 0;
        this.otHours = 0;
      }
    } else {
      //1hr or more
      if (Math.floor(tempfinal / 60) > 7) {
        // 8hrs or more
        this.hoursWorked = 8; //get 8 regular work hr
        tempfinal -= this.hoursWorked * 60; //diminish 8 reg work hr to total working mins
        if (tempfinal > 29) {
          //if OT > 29mins
          this.otHours = Math.floor(tempfinal/60);//get OT hrs
          tempfinal -= this.otHours * 60;
          if(tempfinal>29){//if OT mins left > 29mins
            this.otHours+=1;
          }
        }
      } else {
        //1-7hrs
        this.hoursWorked = Math.floor(tempfinal/60);//get undertime work hr
        tempfinal-=this.hoursWorked*60;//diminish undertime work hr to total working mins
        if (tempfinal > 29) {
          //if working mins >= 30
          this.hoursWorked += 1;
          this.otHours = 0;
        }
        else{
          this.otHours = 0;
        }
      }
    }
  }
  write(employee = new Employee(), timeIn = new Date(), timeOut = new Date()) {
    this.employee = employee;
    this.timeIn = timeIn;
    this.timeOut = timeOut;
    this.computeWorkingHours();
    firebase.database().ref("Attendance/" + this.attendanceID).set({
      attendanceID: this.attendanceID,
      employeeID: this.employee.employeeID,
      timeIn: this.timeIn,
      timeOut: this.timeOut,
      hoursWorked: this.hoursWorked,
      otHours: this.otHours,
    });
  }
  delete(attendanceID = new Number()) {
    if (this.isExisting(attendanceID) == true) {
      firebase.database().ref().child("Attendance").child(attendanceID).removeValue();
      alert("removed successfully");
    } else {
      alert("No data available");
    }
  }
  retrieve(attendanceID = new Number()) {
    firebase.database().ref()
      .child("Attendance")
      .child(attendanceID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.attendanceID = snapshot.child("attendanceID").val();
          this.employee.employeeID = snapshot.child("empoyeeID").val();
          this.timeIn = snapshot.child("timeIn").val();
          this.timeOut = snapshot.child("timeOut").val();
          this.hoursWorked = snapshot.child("hoursWorked").val();
          this.otHours = snapshot.child("otHours").val();
        } else {
          alert("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
