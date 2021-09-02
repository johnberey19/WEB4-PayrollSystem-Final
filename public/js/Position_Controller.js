import { Position } from "./Position.js";

var position = new Position();

var pos = new Vue({
  el: "#position",
  data: {
    positionId: new Number(),
    description: new String(),
    listPosition :[],
  },
  methods: {
    savePosition() {
      position = new Position();
      position.generateID();
      setTimeout(() => {
        try {
          position.write(this.description, true);
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
        .child("Position")
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.listPosition.length = 0;
            for (let index = 1; index <= snapshot.numChildren(); index++) {
              this.description = snapshot
              .child(index)
              .child("positionDesc")
              .val();
            this.listPosition.push(this.description);
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
        .child("Position")
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            setTimeout(() => {
            this.listPosition.length = 0;
            for (let index = 1; index <= snapshot.numChildren(); index++) {
                this.description = snapshot
                .child(index)
                .child("positionDesc")
                .val();
              this.listPosition.push(this.description);
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
      this.positionId=null;
      this.description=null;
    },
  },
  mounted(){
   this.onloadListRefresh()
 }
});
