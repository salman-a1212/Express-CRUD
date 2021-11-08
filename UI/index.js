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
