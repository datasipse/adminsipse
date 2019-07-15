var provider = new firebase.auth.GoogleAuthProvider();
$('#login').click(function(){
 
  firebase.auth().onAuthStateChanged(function(user) 
  { var user = firebase.auth().currentUser;
    if (user) 
    {  
         // User is signed in.
         var displayName = user.displayName;
        // var email = user.email;
         //var emailVerified = user.emailVerified;
         //var photoURL = user.photoURL;
         //var isAnonymous = user.isAnonymous;
         //var uid = user.uid;
         //var providerData = user.providerData;
      if (user!= null)
      {  //si el usuario esta logueado hacemos..
        alert('Usuario logueado: '+ displayName+ '. Bienvenido!!!');
        window.location.href="/menu";
      }
    }
    else {
      firebase.auth()
      .signInWithPopup(provider)
      .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      window.location.href="/menu";
      //$('#root').append("<img width='100'  height='100' class='img-circle'  src='"+result.user.photoURL+"'/>");
    
      });
    }
  });



});





