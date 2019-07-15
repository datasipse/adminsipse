//OBSERVAMOS COMPORTAMIENTO DEL LOGIN
function controlGate() {
    firebase.auth().onAuthStateChanged(function (user) {
        var user = firebase.auth().currentUser;
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            //var isAnonymous = user.isAnonymous;
            //var uid = user.uid;
            //var providerData = user.providerData;
            if (user != null) {
                if (emailVerified==true){
                    //aqui me concecto  la base de datosy comparo los email si existe lo dejo pasar sino pa fuera
                    document.getElementById('root').innerHTML="<img width='45' height='45' class='rounded-circle'  src='"+photoURL+"'/>";
                    document.getElementById('hola').innerHTML=displayName;
                    document.getElementById('hola2').innerHTML=user.email;
                    // validar con base de datsos interna por ahora json...
                    const xhttp = new XMLHttpRequest();
                    xhttp.open('GET','/controlMiscelanius/bdUser.json',true);
                    xhttp.send();
                    xhttp.onreadystatechange =function(){
                        // let control=0;
                        if (this.readyState==4 && this.status==200)
                        {
                          let USUARIOS= JSON.parse(this.responseText);
                          for( let usuario of USUARIOS){
                       
                            if (usuario.Email==email){
                                document.getElementById('nombreProfesional').value= usuario.Nombre;
                                document.getElementById('idprofesional').value= usuario.Pass;
                                document.getElementById('perfil').value= usuario.Perfil;
                          
                            }
                          }
                        }
                    }
                }
            }
        } else {
            // User is signed out.
            // window.alert("Usted debe registrarse para poder ingresar a esta página!!");
            window.location.href = "/";
        }// fin else
    });//fin auth
}