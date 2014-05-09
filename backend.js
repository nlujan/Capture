
/* var userAuth = {[{"email": "test1", "password": "password1"}, {}]}*/
var userAuth = {"users":[]};

BackendIsUser = function(email, password) {
  for (var i = 0; i < userAuth["users"].length; i++) {
    var user_cred = userAuth["users"][i];
    if (user_cred["email"] === email && user_cred["password"] === password) {
      return true;
    }
  }

  return false;
}

BackendCreateUser = function(email, password) {
  

  userAuth["users"].push({"email":email, "password":password});
}

