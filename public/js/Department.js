

export class Department {
  constructor() {
    this.departmentID = new Number();
    this.departmentDesc = new String();
    this.status = new Boolean();
  }
  generateID() {
    firebase.database().ref()
      .child("Department")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.departmentID = 1 + snapshot.numChildren();
        } else {
          this.departmentID = 1;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  isExisting(departmentID = new Number()){
    var exist = new Boolean();
    firebase.database().ref()
      .child("Department")
      .child(departmentID)
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
  write(departmentDesc = new String(), status = new Boolean()) {
    this.departmentDesc = departmentDesc;
    this.status = status;
    firebase.database().ref("Department/" + this.departmentID).set({
        departmentID : this.departmentID,
        departmentDesc : this.departmentDesc,
        status : this.status
    });
  }
  delete(departmentID = new Number()){
    if (this.isExisting(departmentID) == true){
      firebase.database().ref()
      .child("Department")
      .child(departmentID)
      .removeValue();
      alert("removed successfully");
    }
    else{
      alert("No data available");
    }
  }
  read(departmentID = new Number()) {
    firebase.database().ref()
      .child("Department")
      .child(departmentID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.departmentID = snapshot.child("departmentID").val();
          this.departmentDesc = snapshot.child("departmentDesc").val();
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
