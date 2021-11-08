<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>CRUD App</title>
  </head>
  <body>
    <div class="main">
      <div class="add-user">
        <h1>CRUD App</h1>
        <h2>Add/Update/View/Delete Users</h2>
        <form action="" class="userdata">
          <div class="input-con">
            <label for="userid">ID</label>
            <input type="text" name="userid" id="userid" />
          </div>
          <div class="input-con">
            <label for="Name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div class="input-con">
            <label for="Email">Email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div class="input-con">
            <label for="address">Address</label>
            <textarea name="address" id="address" cols="28" rows="5"></textarea>
          </div>
        </form>
        <div class="btn-con">
          <div class="add-btnc">
            <button id="add">Add</button>
          </div>
          <div class="update-btnc">
            <button id="update">Update</button>
          </div>
          <div class="view-btnc">
            <button id="view">View</button>
          </div>
          <div class="delete-btnc">
            <button id="delete">Delete</button>
          </div>
        </div>
        <div class="responsec">
          <div class="idresc">
            <p>ID</p>
            <p id="idres"></p>
          </div>
          <div class="nameresc">
            <p>Name</p>
            <p id="nameres"></p>
          </div>
          <div class="emailresc">
            <p>Email</p>
            <p id="emailres"></p>
          </div>
          <div class="addresc">
            <p>Address</p>
            <p id="addres"></p>
          </div>
        </div>
      </div>
    </div>
    <script src="index.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </body>
</html>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Ubuntu", sans-serif;
}

h2,
h1 {
  text-align: center;
  margin: 25px;
}

.add-user {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.userdata {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  align-content: center;
  background-color: #ddd;
  grid-gap: 10px;
}

.input-con {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

form label {
  display: inline-block;
}

form input {
  margin: 25px;
  padding: 5px;
}

textarea {
  margin: 10px;
}

.btn-con {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  padding: 10px;
}

.add-btnc,
.edit-btnc,
.view-btnc,
.delete-btnc {
  margin: 10px;
  padding: 10px;
}

#add,
#update,
#view,
#delete {
  padding: 5px 10px;
  background: #111;
  color: #ddd;
  cursor: pointer;
  border-radius: 5px;
}

.responsec {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px 0;
  background-color: #ddd;
  padding: 5px;
  border: 1px solid #111;
}
</style>

<script>
  // User Add
document.getElementById("add").addEventListener("click", async (event) => {
  event.preventDefault();

  let userid = Number(document.getElementById("userid").value);
  console.log("userid", userid);
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  axios
    .post("https://crud-app-ai.herokuapp.com/user", {
      // userid: userid,
      name: name,
      email: email,
      address: address,
    })
    .then(function (response) {
      console.log(response);
      document.getElementById("idres").value = "";
      document.getElementById("nameres").innerHTML = response.data.name;
      document.getElementById("emailres").innerHTML = response.data.email;
      document.getElementById("addres").innerHTML = response.data.address;
    })
    .catch(function (error) {
      console.log(error);
    });
});

// View all users

document.getElementById("view").addEventListener("click", async (event) => {
  event.preventDefault();
  let userid = Number(document.getElementById("userid").value);
  //   let name = document.getElementById("name").value;
  //   let email = document.getElementById("email").value;
  //   let address = document.getElementById("address").value;
  axios
    .get("https://crud-app-ai.herokuapp.com/users")
    .then(function (response) {
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i] === response.data.length) {
          break;
        }
        console.log("response", response.data[i], response.data.length);
        document.getElementById("idres").innerHTML +=
          response.data[i].userid + "<br>";
        document.getElementById("nameres").innerHTML +=
          response.data[i].name + "<br>";
        document.getElementById("emailres").innerHTML +=
          response.data[i].email + "<br>";
        document.getElementById("addres").innerHTML +=
          response.data[i].address + "<br>";
      }
      console.log("userid", userid);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Update users
document.getElementById("update").addEventListener("click", async (event) => {
  event.preventDefault();

  let userid = Number(document.getElementById("userid").value);
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  axios
    .put(`https://crud-server-api-nodejs.herokuapp.com/user/${userid}`, {
      name: name,
      email: email,
      address: address,
      userid: userid,
    })
    .then(function (response) {
      console.log(response);
      document.getElementById("idres").innerHTML = response.data.userid;
      document.getElementById("nameres").innerHTML = response.data.name;
      document.getElementById("emailres").innerHTML = response.data.email;
      document.getElementById("addres").innerHTML = response.data.address;
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Delete users
document.getElementById("delete").addEventListener("click", async (event) => {
  event.preventDefault();

  let userid = Number(document.getElementById("userid").value);
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  axios
    .delete(`https://crud-server-api-nodejs.herokuapp.com/user/${userid}`)
    .then(function (response) {
      console.log(response);
      document.getElementById("idres").innerHTML = response.data;
      document.getElementById("nameres").innerHTML = response.data;
      document.getElementById("emailres").innerHTML = response.data;
      document.getElementById("addres").innerHTML = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
});
  
</script>
