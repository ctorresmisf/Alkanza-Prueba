//Access auth service
var auth = firebase.auth();

//Login de usuarios
getId('usericon').addEventListener('click', function() {
   var provider = new firebase.auth.GoogleAuthProvider(); 
   auth.signInWithPopup(provider)
   .then(function(resp) {
       var user = resp.user;
       showMessage('Welcome: '+ user.displayName, 'success');
   })
   .catch(function(err) {
       showMessage('Error: '+ err, 'error');
   })
});

auth.onAuthStateChanged(function(user) {
    if (user) {
        getId('usericon').style.display = 'none';
        getId('logouticon').style.display = 'block';
    }else{
        getId('usericon').style.display = 'block';
        getId('logouticon').style.display = 'none';
    }
});

getId('logouticon').addEventListener('click', function() {
    auth.signOut()
    .then(function() {
        showMessage('You are now signed out', 'log');
    });
});