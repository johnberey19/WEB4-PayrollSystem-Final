import { Employee } from "./Employee.js";
import { Attendance } from "./Attendance.js";
import { Contribution } from "./Contribution.js";
import { Adjustment } from "./Adjustment.js";

export class Salary {
  constructor() {
    this.salaryID = new Number();
    this.employee = new Employee();
    this.dateStart = new Date();
    this.dateEnd = new Date();
    this.totalHoursWorked = new Number();
    this.totalOTHours = new Number();
    this.regularPay = new Number();
    this.otPay = new Number();
    this.sss = new Number();
    this.pagIbig = new Number();
    this.philHealth = new Number();
    this.grossPay = new Number();
    this.totalAdjustment = new Number();
    this.netPay = new Number();

    this.listAdjustment = new Array(new Adjustment());
    this.listAttendance = new Array(new Attendance());
    this.listContribution = new Array(new Contribution());
  }
  generateID() {
    firebase.database().ref()
      .child("Salary")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.salaryID = 1 + snapshot.numChildren();
        } else {
          this.salaryID = 1;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  isExisting(salaryID = new Number()) {
    var exist = new Boolean();
    firebase.database().ref()
      .child("Salary")
      .child(salaryID)
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
  computeTotalHoursWorked() {
    for (let index = 0; index < this.listAttendance.length; index++) {
      this.totalHoursWorked += this.listAttendance[index].hoursWorked;
    }
  }
  computeTotalOTHours() {
    for (let index = 0; index < this.listAttendance.length; index++) {
      this.totalOTHours += this.listAttendance[index].otHours;
    }
  }
  computeRegPay() {
    this.computeTotalHoursWorked();
    this.regularPay = this.totalHoursWorked * this.employee.hourlyRate;
  }
  computeOTPay() {
    this.computeTotalOTHours();
    this.otPay = this.totalOTHours * (this.employee.hourlyRate * 1.25);
  }
  computeGrossPay() {
    this.computeRegPay();
    this.computeOTPay();
    this.grossPay = this.regularPay + this.otPay;
  }
  computeSSS() {
    if (this.listContribution[0].constributionDesc == "SSS") {
      this.sss = this.grossPay * (this.listContribution[0].contributionRate*.01);
    } else {
      this.sss = 0;
    }
  }
  computePagIbig() {
    if (this.listContribution[1].constributionDesc == "Pag-Ibig") {
      this.pagIbig = this.grossPay * (this.listContribution[1].contributionRate*.01);
    } else {
      this.pagIbig = 0;
    }
  }
  computePhilHealth() {
    if (this.listContribution[2].constributionDesc == "PhilHealth") {
      this.philHealth =
        this.grossPay * (this.listContribution[2].contributionRate*.01);
    } else {
      this.philHealth = 0;
    }
  }
  computeTotalAdjustments() {
    this.computeGrossPay();
    this.computeSSS();
    this.computePagIbig();
    this.computePhilHealth();
    this.totalAdjustment = 0;
    for (let index = 0; index < this.listAdjustment.length; index++) {
      if (this.listAdjustment[index].classification == true) {
        //addition
        this.totalAdjustment += this.listAdjustment[index].amount;
      } else {
        //deduction
        this.totalAdjustment -= this.listAdjustment[index].amount;
      }
    }
    this.totalAdjustment -= this.sss;
    this.totalAdjustment -= this.pagIbig;
    this.totalAdjustment -= this.philHealth;
  }
  computeNetPay() {
    this.computeTotalAdjustments();
    this.netPay = this.grossPay + this.totalAdjustment;
  }

  write(
    employee = new Employee(),
    dateStart = new Date(),
    dateEnd = new Date(),
    listAdjustment = new Array(new Adjustment()),
    listAttendance = new Array(new Attendance()),
    listContribution = new Array(new Contribution())
  ) {
    this.employee = employee;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.listAttendance = listAttendance;
    this.listAdjustment = listAdjustment;
    this.listContribution = listContribution;
    this.computeNetPay();
    firebase.database().ref("Salary/" + this.salaryID).set({
      salaryID: this.salaryID,
      employeeID: this.employee.employeeID,
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      totalHoursWorked: this.totalHoursWorked,
      totalOTHours: this.totalOTHours,
      regularPay: this.regularPay,
      otPay: this.otPay,
      sss: this.sss,
      pagIbig: this.pagIbig,
      philHealth: this.philHealth,
      grossPay: this.grossPay,
      totalAdjustment: this.totalAdjustment,
      netPay: this.netPay,
    });
  }
  delete(salaryID = new Number()) {
    if (this.isExisting(salaryID) == true) {
      firebase.database().ref().child("Salary").child(salaryID).removeValue();
      alert("removed successfully");
    } else {
      alert("No data available");
    }
  }
  read(salaryID = new Number()) {
    firebase.database().ref()
      .child("Salary")
      .child(salaryID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.salaryID = snapshot.child("salaryID").val();
          this.employee.employeeID = snapshot.child("employeeID").val();
          this.dateStart = snapshot.child("dateStart").val();
          this.dateEnd = snapshot.child("dateEnd").val();
          this.totalHoursWorked = snapshot.child("totalHoursWorked").val();
          this.totalOTHours = snapshot.child("totalOTHours").val();
          this.regularPay = snapshot.child("regularPay").val();
          this.otPay = snapshot.child("otPay").val();
          this.sss = snapshot.child("sss").val();
          this.pagIbig = snapshot.child("pagIbig").val();
          this.philHealth = snapshot.child("philHealth").val();
          this.grossPay = snapshot.child("grossPay").val();
          this.totalAdjustment = snapshot.child("totalAdjustment").val();
          this.netPay = snapshot.child("netPay").val();
        } else {
          alert("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
