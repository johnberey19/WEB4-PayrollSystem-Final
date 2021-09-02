import { Person } from "./Person.js";
import { Position } from "./Position.js";
import { Department } from "./Department.js";

export class Employee {
  constructor() {
    this.employeeID = new Number();
    this.person = new Person();
    this.position = new Position();
    this.hourlyRate = new Number();
    this.department = new Department();
    this.status = new Boolean();
    this.type = new Boolean();
  }
  generateID() {
    firebase
      .database()
      .ref()
      .child("Employee")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.employeeID = 1010000 + snapshot.numChildren();
        } else {
          this.employeeID = 1010001;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  isExisting(employeeID = new Number()) {
    var exist = new Boolean();
    firebase
      .database()
      .ref()
      .child("Employee")
      .child(employeeID)
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
  write(
    person = new Person(),
    position = new Position(),
    hourlyRate = new Number(),
    department = new Department(),
    status = new Boolean(),
    type = new Boolean()
  ) {
    this.person = person;
    this.position = position;
    this.department = department;
    this.hourlyRate = hourlyRate;
    this.status = status;
    this.type = type;
    firebase
      .database()
      .ref("Employee/" + this.employeeID)
      .set({
        employeeID: this.employeeID,
        personID: this.person.personID,
        positionID: this.position.positionID,
        hourlyRate: this.hourlyRate,
        departmentID: this.department.departmentID,
        status: this.status,
        type: this.type,
      });
  }
  delete(employeeID = new Number()) {
    if (this.isExisting(employeeID) == true) {
      firebase
        .database()
        .ref()
        .child("Employee")
        .child(employeeID)
        .removeValue();
      alert("removed successfully");
    } else {
      alert("No data available");
    }
  }
  read(employeeID = new Number()) {
    firebase
      .database()
      .ref()
      .child("Employee")
      .child(employeeID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.employeeID = snapshot.child("employeeID").val();
          this.person.personID = snapshot.child("personID").val();
          this.position.positionID = snapshot.child("positionID").val();
          this.hourlyRate = snapshot.child("hourlyRate").val();
          this.department.departmentID = snapshot.child("departmentID").val();
          this.status = snapshot.child("status").val();
          this.type = snapshot.child("type").val();
        } else {
          alert("No data available");
        }
      })
  }
}
