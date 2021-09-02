import { Employee } from "./Employee.js";


export class Adjustment {
  constructor() {
    this.adjustmentID = new Number();
    this.employee = new Employee();
    this.classification = new Boolean();
    this.adjustmentDesc = new String();
    this.amount = new Number();
    this.date = new Date();
  }
  generateID() {
    firebase.database().ref()
      .child("Adjustment")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.adjustmentID = 1 + snapshot.numChildren();
        } else {
          this.adjustmentID = 1;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  isExisting(adjustmentID = new Number()){
    var exist = new Boolean();
    firebase.database().ref()
      .child("Adjustment")
      .child(adjustmentID)
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
  
  write(employee = new Employee(),
  classification = new Boolean(),
  adjustmentDesc = new String(),
  amount = new Number(),
  date = new Date()) {
    this.employee = employee;
    this.classification = classification;
    this.adjustmentDesc = adjustmentDesc;
    this.amount = amount;
    this.date = date;
    firebase.database().ref("Adjustment/" + this.adjustmentID).set({
        adjustmentID : this.adjustmentID,
        employeeID :this.employee.employeeID,
        classification : this.classification,
        adjustmentDesc : this.adjustmentDesc,
        amount : this.amount,
        date : this.date
    });
  }
  delete(adjustmentID = new Number()){
    if (this.isExisting(adjustmentID) == true){
      firebase.database().ref()
      .child("Adjustment")
      .child(adjustmentID)
      .removeValue();
      alert("removed successfully");
    }
    else{
      alert("No data available");
    }
  }
  read(adjustmentID = new Number()) {
    firebase.database().ref()
      .child("Adjustment")
      .child(adjustmentID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.adjustmentID = snapshot.child("adjustmentID").val();
          this.employee.employeeID = snapshot.child("employeeID").val();
          this.classification = snapshot.child("classification").val();
          this.adjustmentDesc = snapshot.child("adjustmentDesc").val();
          this.amount = snapshot.child("amount").val();
          this.date = snapshot.child("date").val();
        } else {
          alert("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
