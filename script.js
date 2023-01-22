function DataTable(config) {
  if (config.apiUrl) {
    fetch(config.apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Create table header
        let tableHtml = `<table id="tableId">
        <div>
        <button id="addUser" onclick ="addUser()">Add user</button>
        </div>
      <thead>
          <th>№</th>`;
        for (let i = 0; i < Object.entries(config.columns).length; i++) {
          tableHtml += `<th>${config.columns[i].title}</th>`;
        }
        tableHtml += `<th>Actions</th>
            </tr>
          </thead>
          <tbody>`;

        // Create table body
        for (var key of Object.entries(data.data)) {
          tableHtml += `<tr>
        <td>${key["0"]}</td>
        <td>${key["1"].name}</td>
        <td>${key["1"].surname}</td>   
        <td><img class="avatar" alt="avatar" src="${
          key["1"].avatar
        }"></img></td>
        <td>${key["1"].birthday.slice(0, 10)}</td> 
        <td><button class="button-delete" onclick ="deleteUser(${
          key["0"]
        })">Delete</button></td>
        </tr>`;
        }

        tableHtml += `
        </tbody>
      </table>`;

        document.getElementById("usersTable").innerHTML = tableHtml;
      });
  } else {
    alert("Check the api url!");
  }
}

function deleteUser(userID) {
  fetch(config1.apiUrl + `/${userID}`, {
    method: "DELETE",
  }).then(() => {
    DataTable(config1);
  });
}

function addUser() {
  if (!document.querySelector("input")) {
    const row = document.createElement("tr");
    const td = document.createElement("td");

    td.innerHTML = "";
    row.appendChild(td);

    for (let i = 0; i < Object.entries(config1.columns).length; i++) {
      const tdLoop = document.createElement("td");
      const inp = `<div class="input-container">
        <input class="input"
          type="text"
          id="${config1.columns[i].value}" 
          name="${config1.columns[i].value}" 
          placeholder="${config1.columns[i].value}">
        </div>`;
      tdLoop.innerHTML = inp;
      row.appendChild(tdLoop);
    }

    const add = document.createElement("td");
    const buttonAdd = `<button class="add-button">Add</button>`;
    add.innerHTML = buttonAdd;
    row.appendChild(add);

    document
      .getElementById("tableId")
      .childNodes[3].insertBefore(
        row,
        document.getElementById("tableId").childNodes[3].firstChild
      );
  }

  let elementsArray = document.querySelectorAll("input");

  elementsArray.forEach(function (elem) {
    elem.addEventListener("focus", checkInputs);
    elem.addEventListener("keypress", addingUser);
  });

  function checkInputs() {
    elementsArray.forEach(function (elem) {
      if (elem.value === "") {
        elem.classList.add("red-border");
      } else {
        elem.classList.remove("red-border");
      }
    });
  }

  document.querySelector(".add-button").addEventListener("click", addingUser);

  function addingUser() {
    checkInputs();

    let name = document.querySelector("input[name=name]").value;
    let surname = document.querySelector("input[name=surname]").value;
    let avatar = document.querySelector("input[name=avatar]").value;
    let birthday = document.querySelector("input[name=birthday]").value;

    if (name && surname && birthday && avatar) {
      fetch(config1.apiUrl, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          surname: surname,
          avatar: avatar,
          birthday: birthday,
        }),
      })
        .then((data) => {
          alert("Added");
          console.log(data);
          DataTable(config1);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
}

const config1 = {
  parent: "#usersTable",
  columns: [
    { title: "Name", value: "name" },
    { title: "Surname", value: "surname" },
    { title: "Avatar", value: "avatar" },
    { title: "Birthday", value: "birthday" },
  ],
  apiUrl: "https://mock-api.shpp.me/otsyrulyk/users",
};

DataTable(config1);
