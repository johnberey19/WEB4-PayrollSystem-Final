import { Department } from "./Department.js";

var dept = new Department();

var department = new Vue({
    el:'#modal',
    data:{
        departId: new Number(),
        descrpition: new String(),
        listDepartment :[]
    },
    methods:{
      saveDepartment() {
        dept = new Department()
        dept.generateID();
        setTimeout(() => {
          try {
            dept.write(this.descrpition, true);
            alert("Add Successfully");
            this.clearInput();
            setTimeout(() => {
              try {
                this.listRefresh();
                alert("Position List Updated");
              } catch (error) {
                alert("Retrieve Position List Failed");
              }
            }, 2000);
          } catch (error) {
            console.log(error);
            alert("Added Failed");
          }
        }, 2000);
      },
      listRefresh() {
        firebase
          .database()
          .ref()
          .child("Department")
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              this.listDepartment.length = 0;
              for (let index = 1; index <= snapshot.numChildren(); index++) {
                this.departId = snapshot
                .child(index)
                .child("departmentID")
                .val();
                this.description = snapshot
                .child(index)
                .child("positionDesc")
                .val();
              this.listDepartment.push(this.departId,this.description);
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
          .child("Department")
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              setTimeout(() => {
              this.listDepartment.length = 0;
              for (let index = 1; index <= snapshot.numChildren(); index++) {
                this.departId = snapshot
                .child(index)
                .child("departmentID")
                .val();
                this.description = snapshot
                .child(index)
                .child("positionDesc")
                .val();
              this.listDepartment.push(this.departId,this.description);
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
      clearInput(){
        this.departId=null;
        this.description=null;
      }
    }
})