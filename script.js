function DataTable(config) {
  if (config.apiUrl) {
    fetch(config.apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Create table header
        let tableHtml = `<table>
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
