

export class Contribution {
  constructor() {
    this.contributionID = new Number();
    this.constributionDesc = new String();
    this.contributionRate = new Number();
  }
  generateID() {
    firebase.database().ref()
      .child("Contribution")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.contributionID = 1 + snapshot.numChildren();
        } else {
          this.contributionID = 1;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  isExisting(contributionID = new Number()){
    var exist = new Boolean();
    firebase.database().ref()
      .child("Contribution")
      .child(contributionID)
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
  
  write(constributionDesc = new String(), contributionRate = new Number()) {
    this.constributionDesc = constributionDesc;
    this.contributionRate = contributionRate;
    firebase.database().ref("Contribution/" + this.contributionID).set({
      contributionID : this.contributionID,
      constributionDesc : this.constributionDesc,
      contributionRate : this.contributionRate
    });
  }
  delete(contributionID = new Number()){
    if (this.isExisting(contributionID) == true){
      firebase.database().ref()
      .child("Contribution")
      .child(contributionID)
      .removeValue();
      alert("removed successfully");
    }
    else{
      alert("No data available");
    }
  }
  read(contributionID = new Number()) {
    firebase.database().ref()
      .child("Contribution")
      .child(contributionID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.contributionID = snapshot.child("contributionID").val();
          this.constributionDesc = snapshot.child("constributionDesc").val();
          this.contributionRate = snapshot.child("contributionRate").val();
        } else {
          alert("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
