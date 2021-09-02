import { Employee } from "./Employee.js";

var emp = new Employee();

document.getElementById('btnAdd').onclick = function(){

    employee.refeshDepartment();
    
}

var employee = new Vue({
  el: "#modal",
  data: {
    lname: new String(), //Person
    fname: new String(),
    mname: new String(),
    bdate: new Date(),
    address: new String(),
    contact: new String(),

    empID: new Number(), //Employee
    personID: new Number(),
    positionID: new Number(),
    deptID: new Number(),
    hourlyRate: new Number(),
    status: new Boolean(),
    type: new Boolean(),

    posDesc: new String(), //Position and Department
    depDesc: new String(),
    listPosition: [],
    listDepartment: [],

    fullName: new String(),
    listPos: [],
    listDep: [],
    listEmpStatus: [],
    listEmpID: [],
    listName: [],
  },
  method: {
    saveEmployee() {
      emp = new Employee();
      emp.generateID();
      setTimeout(() => {
        try {
          emp.person.generateID();
          setTimeout(() => {
            emp.person.write(
              this.fname,
              this.mname,
              this.lname,
              this.bdate,
              this.address,
              this.contact
            );
            setTimeout(() => {
              this.getPositionID();
              setTimeout(() => {
                this.getDeparmentID();
                setTimeout(() => {
                  emp.position.positionID = this.positionID;
                  emp.department.departmentID = this.deptID;
                  emp.write(
                    emp.person,
                    emp.position,
                    this.hourlyRate,
                    emp.department,
                    true,
                    this.type
                  );
                  setTimeout(() => {
                    this.listRefresh();
                  }, timeout);
                }, 2000);
              }, 2000);
            }, 2000);
          }, 2000);
        } catch (error) {
          console.log(error);
          alert("Added Failed");
        }
      }, 2000);
    },
    getPositionID() {
      firebase
        .database()
        .ref()
        .child("Position")
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            for (let index = 1; index <= snapshot.numChildren(); index++) {
              if (
                snapshot.child(index).child("positionDesc").val() ==
                this.posDesc
              ) {
                this.positionID = snapshot
                  .child(index)
                  .child("positionID")
                  .val();
                break;
              }
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getDeparmentID() {
      firebase
        .database()
        .ref()
        .child("Deparment")
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            for (let index = 1; index <= snapshot.numChildren(); index++) {
              if (
                snapshot.child(index).child("departmentDesc").val() ==
                this.depDesc
              ) {
                this.deptID = snapshot.child(index).child("departmentID").val();
                break;
              }
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    refreshPosDep(){
      alert("labas");
      this.refeshPosition();
      setTimeout(() => {
        this.refeshDepartment();
      }, 2000);
    },
    refeshPosition() {
      firebase
        .database()
        .ref()
        .child("Position")
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.listPosition.length = 0;
            for (let index = 1; index <= snapshot.numChildren(); index++) {
              this.posDesc = snapshot.child(index).child("positionDesc").val();
              this.listPosition.push(this.posDesc);
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    refeshDepartment() {
      firebase
        .database()
        .ref()
        .child("Department")
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.listDepartment.length = 0;
            for (let index = 1; index <= snapshot.numChildren(); index++) {
              this.posDesc = snapshot.child(index).child("positionDesc").val();
              this.listDepartment.push(this.depDesc);
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
        alert('show me');
    },
    listRefresh() {
      firebase
        .database()
        .ref()
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.listPosition.length = 0;
            this.listPos.length = 0;
            this.listDep.length = 0;
            this.listEmpStatus.length = 0;
            this.listEmpID.length = 0;
            this.listName.length = 0;
            for (
              let index = 1;
              index <= snapshot.child("Person").numChildren();
              index++
            ) {
              var qwe = 101000 + index;
              this.fname = snapshot
                .child("Person")
                .child(index)
                .child("fname")
                .val();
              this.mname = snapshot
                .child("Person")
                .child(index)
                .child("mname")
                .val();
              this.lname = snapshot
                .child("Person")
                .child(index)
                .child("lname")
                .val();
              this.fullName =
                this.fname + ", " + this.mname + ", " + this.lname;

              this.empID = snapshot
                .child("Employee")
                .child(qwe)
                .child("employeeID")
                .val();
              this.positionID = snapshot
                .child("Employee")
                .child(qwe)
                .child("positionID")
                .val();
              this.deptID = snapshot
                .child("Employee")
                .child(qwe)
                .child("departmentID")
                .val();
              this.status = snapshot
                .child("Employee")
                .child(qwe)
                .child("status")
                .val();

              this.posDesc = snapshot
                .child("Position")
                .child(this.positionID)
                .child("positionDesc")
                .val();
              this.depDesc = snapshot
                .child("Department")
                .child(this.deptID)
                .child("departmentDesc")
                .val();

              this.listName.push(this.fullName);
              this.listPos.push(this.posDesc);
              this.listDep.push(this.depDesc);
              this.listEmpStatus.push(this.status);
              this.listEmpID.push(this.empID);
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onloadListRefresh() {
      try {
        firebase
          .database()
          .ref()
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              setTimeout(() => {
                this.listPosition.length = 0;
                this.listPos.length = 0;
                this.listDep.length = 0;
                this.listEmpStatus.length = 0;
                this.listEmpID.length = 0;
                this.listName.length = 0;
                for (
                  let index = 1;
                  index <= snapshot.child("Person").numChildren();
                  index++
                ) {
                  var qwe = 101000 + index;
                  this.fname = snapshot
                    .child("Person")
                    .child(index)
                    .child("fname")
                    .val();
                  this.mname = snapshot
                    .child("Person")
                    .child(index)
                    .child("mname")
                    .val();
                  this.lname = snapshot
                    .child("Person")
                    .child(index)
                    .child("lname")
                    .val();
                  this.fullName =
                    this.fname + ", " + this.mname + ", " + this.lname;

                  this.empID = snapshot
                    .child("Employee")
                    .child(qwe)
                    .child("employeeID")
                    .val();
                  this.positionID = snapshot
                    .child("Employee")
                    .child(qwe)
                    .child("positionID")
                    .val();
                  this.deptID = snapshot
                    .child("Employee")
                    .child(qwe)
                    .child("departmentID")
                    .val();
                  this.status = snapshot
                    .child("Employee")
                    .child(qwe)
                    .child("status")
                    .val();

                  this.posDesc = snapshot
                    .child("Position")
                    .child(this.positionID)
                    .child("positionDesc")
                    .val();
                  this.depDesc = snapshot
                    .child("Department")
                    .child(this.deptID)
                    .child("departmentDesc")
                    .val();

                  this.listName.push(this.fullName);
                  this.listPos.push(this.posDesc);
                  this.listDep.push(this.depDesc);
                  this.listEmpStatus.push(this.status);
                  this.listEmpID.push(this.empID);
                }
              }, 2000);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
