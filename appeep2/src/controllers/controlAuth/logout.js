
$("#logout").click(function(event){
    event.preventDefault();
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
     alert("Cerró la sesión!!");
     window.location.href="/";
    }).catch(function(error) {
      // An error happened.
    });
});