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
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="text-center">Name</th>
              <th scope="col" class="text-center">Email</th>
              <th scope="col" class="text-center">Address</th>
            </tr>
          </thead>
          <tbody id="result" class="text-center"></tbody>
        </table>
      </div>
    </div>
    <script src="index.js"></script>
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
.update-btnc,
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

.text-center {
  text-align: center;
}

table {
  margin: 50px;
}

th {
  border-bottom: 1px dashed #111;
}

</style>

<script>
 // User Add
const addUser = () => {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  axios
    .post("https://crudapiserver1.herokuapp.com/user", {
      name: name,
      email: email,
      address: address,
    })
    .then(function (response) {
      console.log(response);
      getUsers();
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getUsers = () => {
  const result = document.getElementById("result");
  axios
    .get("https://crudapiserver1.herokuapp.com/users")
    .then(function (response) {
      console.log(response.data);
      const users = response.data;
      // console.log(users)
      const userList = users.map((user) => {
        return ` <tr> <td> ${user.name} </td> <td> ${user.email} </td> <td> ${user.address} </td></tr>`;
      });
      result.innerHTML = "";
      result.innerHTML = userList.join("");
    })
    .catch(function (error) {
      console.log(error);
    });
};

let addBtn = document.getElementById("add");
let viewBtn = document.getElementById("view");
let updateBtn = document.getElementById("update");
let deletBtn = document.getElementById("delete");

addBtn.addEventListener("click", addUser);

// update data
const updateData = async () => {
  let userid = document.getElementById("userid").value;
  console.log("userid", userid);
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;

  if (name) {
    axios
      .put(`https://crudapiserver1.herokuapp.com/user/${userid}`, { name })
      .then((res) => getUsers());
  }
  if (email) {
    axios
      .put(`https://crudapiserver1.herokuapp.com/user/${userid}`, { email })
      .then((res) => getUsers());
  }
  if (address) {
    axios
      .put(`https://crudapiserver1.herokuapp.com/user/${userid}`, { address })
      .then((res) => getUsers());
  }
};

updateBtn.addEventListener("click", updateData);

// delete user
const deleteUser = () => {
  let userid = document.getElementById("userid").value;
  const result = document.getElementById("result");
  if (userid) {
    axios
      .delete(`https://crudapiserver1.herokuapp.com/user/${userid}`)
      .then(() => getUsers());
  }
  result.innerHTML = "";
};

deletBtn.addEventListener("click", deleteUser);

// search a single user
const getUser = () => {
  let userid = document.getElementById("userid").value;
  const result = document.getElementById("result");
  axios
    .get(`https://crudapiserver1.herokuapp.com/user/${userid}`)
    .then(function (response) {
      console.log(response.data);
      const users = response.data;
      result.innerHTML = ` <tr> <td> ${users.name} </td> <td> ${users.email} </td> <td> ${users.address} </td></tr>`;
    })
    .catch(function (error) {
      console.log(error);
    });
};

viewBtn.onclick = function viewRun() {
  let userid = document.getElementById("userid").value;
  if (userid === "") {
    getUsers();
  } else {
    getUser();
  }
};

  
</script>
