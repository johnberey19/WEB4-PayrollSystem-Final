
export class Position {
  constructor() {
    this.positionID = new Number();
    this.positionDesc = new String();
    this.status = new Boolean();
  }
  generateID() {
    firebase.database().ref()
      .child("Position")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.positionID = 1 + snapshot.numChildren();
        } else {
          this.positionID = 1;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  isExisting(positionID = new Number()) {
    var exist = new Boolean();
    firebase.database().ref()
      .child("Position")
      .child(positionID)
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
  write(positionDesc = new String(), status = new Boolean()) {
    this.positionDesc = positionDesc;
    this.status = status;
    firebase.database().ref("Position/" + this.positionID).set({
      positionID: this.positionID,
      positionDesc: this.positionDesc,
      status: this.status,
    });
  }
  delete(positionID = new Number()) {
    if (this.isExisting(positionID) == true) {
      firebase.database().ref().child("Position").child(positionID).removeValue();
      alert("removed successfully");
    } else {
      alert("No data available");
    }
  }
  read(positionID = new Number()) {
    firebase.database().ref()
      .child("Position")
      .child(positionID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.positionID = snapshot.child("positionID").val();
          this.positionDesc = snapshot.child("positionDesc").val();
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
