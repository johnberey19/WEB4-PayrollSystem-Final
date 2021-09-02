

export class Person {
  constructor() {
    this.personID = new Number();
    this.fname = new String();
    this.mname = new String();
    this.lname = new String();
    this.bdate = new String();
    this.address = new String();
    this.contact = new String();
  }
  generateID() {
    firebase.database().ref()
      .child("Person")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.personID = 1 + snapshot.numChildren();
        } else {
          this.personID = 1;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  isExisting(personID = new Number()) {
    var exist = new Boolean();
    firebase.database().ref()
      .child("Person")
      .child(personID)
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
  getFullName() {
    return this.fname + " " + this.mname + " " + this.lname;
  }
  write(
    fname = new String(),
    mname = new String(),
    lname = new String(),
    bdate = new String(),
    address = new String(),
    contact = new String()
  ) {
    this.fname = fname;
    this.mname = mname;
    this.lname = lname;
    this.bdate = bdate;
    this.address = address;
    this.contact = contact;
    firebase.database().ref("Person/" + this.personID).set({
      personID: this.personID,
      fname: this.fname,
      mname: this.mname,
      lname: this.lname,
      bdate: this.bdate,
      address: this.address,
      contact: this.contact,
    });
  }
  delete(personID = new Number()) {
    if (this.isExisting(personID) == true) {
      firebase.database().ref().child("Person").child(personID).removeValue();
      alert("removed successfully");
    } else {
      alert("No data available");
    }
  }
  read(personID = new Number()) {
    firebase.database().ref()
      .child("Person")
      .child(personID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.personID = snapshot.child("personID").val();
          this.fname = snapshot.child("fname").val();
          this.mname = snapshot.child("mname").val();
          this.lname = snapshot.child("lname").val();
          this.bdate = snapshot.child("bdate").val();
          this.address = snapshot.child("address").val();
          this.contact = snapshot.child("contact").val();
        } else {
          alert("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
