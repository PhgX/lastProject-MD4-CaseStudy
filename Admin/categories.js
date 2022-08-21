const API_URL = "http://localhost:3000";
      let token = JSON.parse(localStorage.getItem("accessToken"));
      let role = localStorage.getItem("role");
      let totalProduct = 0;
      if (!token) {
        location.href = "login.html";
      } else {
        $(function () {
          getCategoryList();
        });
      }
      function getCategoryList() {
        $.ajax({
          type: "GET",
          headers: {
            Authorization: "Bearer " + token.token,
          },
          url: `${API_URL}/categories`,
          success: function (data) {
            totalCategory = data.length;
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
            $("#categories").html(html);
          },
        });
      }