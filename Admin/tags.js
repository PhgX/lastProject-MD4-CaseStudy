const API_URL = "http://localhost:3000";
      let token = JSON.parse(localStorage.getItem("accessToken"));
      let totalUsers = 0;
      if (!token) {
        location.href = "login.html";
      } else {
        $(function () {
          getTagsList();
        });
      }
      function logout() {
        localStorage.clear()
    }
      function getTagsList() {
        $.ajax({
          type: "GET",
          headers: {
            Authorization: "Bearer " + token.token,
          },
          url: `${API_URL}/tags`,
          success: function (data) {
            totalTags = data.length;
            let html = "";
            console.log(data);
            for (let i = 0; i < data.length; i++) {
              html += `<tr id="${data[i]._id}">
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>
        <button type="button" onclick="showUpdateForm('${
          data[i]._id
        }')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Update
        </button>
    
        <button class="btn btn-danger" onclick="showConfirmDelete('${
          data[i]._id
        }')">Delete</button></td>
    </tr>`;
            }
            $("#tags").html(html);
          },
        });
      }