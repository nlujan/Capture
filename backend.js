/*var chatRef = new Firebase('https://capturee.firebaseio.com');
var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
  if (error) {
    //login failed
    console.log(error);
  } else if (user) {
    //user authenticated with firebase
    $("#user_name").html(emailInput);
            $("#addButton").click();
    console.log('user id '+user.uid + ', provider: '+ user.provider);
  } else {
    //user is logged out
  }
});

var BackendLogIn = function(email, password) {
  auth.login('password', {
    email: email,
    password: password,
    rememberMe: true
  });
}

var BackendCreateUser = function(email, password) {
  auth.createUser(email, password, function(error, user) {
    if (!error) {
      console.log('user id: '+ user.uid + ', Email: '+ user.email);

      return true;
    }
    else {
      return false;
    }
  });
}

var BackendLogOut = function() {
  auth.logout();
}

*/

//var userAuth = {[{"email": "test1", "password": "password1"}, {}]}
var fb = new Firebase("https://capturee.firebaseio.com/users");

BackendLogIn = function(email, password) {
  var oldUser = new Firebase("https://capturee.firebaseio.com/users/"+email);
  var loggedIn = false;
  oldUser.on('value', function(snapshot) {
    if (snapshot.val() !== null && snapshot.val().password === password){
      loggedIn = true;
      
      $("#user_name").html(email);
            $("#addButton").click();
    } else {
      //tell them it was unsuccessful
    }
  });

}

BackendCreateUser = function(email, password) {
  
  var newUser = new Firebase("https://capturee.firebaseio.com/users/"+email);
  newUser.set( {"password":password});
  //userAuth["users"].push({"email":email, "password":password});
}

