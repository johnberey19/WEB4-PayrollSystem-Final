import { Employee } from "./Employee.js";

export class Account {
  constructor() {
    this.accountID = new Number();
    this.employee = new Employee();
    this.password = new String();
    this.secQuestion = new String();
    this.answer = new String();
    this.status = new Boolean();
  }
  generateID() {
    firebase.database().ref()
      .child("Account")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.accountID = 1 + snapshot.numChildren();
        } else {
          this.accountID = 1;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  isExisting(accountID = new Number()){
    var exist = new Boolean();
    firebase.database().ref()
      .child("Account")
      .child(accountID)
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
  password = new String(),
  secQuestion = new String(),
  answer = new String(),
  status = new Boolean()) {
    this.employee = employee;
    this.password = password;
    this.secQuestion = secQuestion;
    this.answer = answer;
    this.status = status;
    firebase.database().ref("Account/" + this.accountID).set({
        accountID : this.accountID,
        employeeID : this.employee.employeeID,
        password : this.password,
        secQuestion : this.secQuestion,
        answer : this.answer,
        status : this.status
    });
  }
  delete(accountID = new Number()){
    if (this.isExisting(accountID) == true){
      firebase.database().ref()
      .child("Account")
      .child(accountID)
      .removeValue();
      alert("removed successfully");
    }
    else{
      alert("No data available");
    }
  }
  read(accountID = new Number()) {
    firebase.database().ref()
      .child("Account")
      .child(accountID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.accountID = snapshot.child("accountID").val();
          this.employee.employeeID = snapshot.child("employeeID").val();
          this.password = snapshot.child("password").val();
          this.secQuestion = snapshot.child("secQuestion").val();
          this.answer = snapshot.child("answer").val();
          this.status = snapshot.child("status").val();
        } else {
          alert("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
