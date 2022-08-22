const API_URL = "http://localhost:3000";
      let token = JSON.parse(localStorage.getItem("accessToken"));
      let totalUsers = 0;
      if (!token) {
        location.href = "login.html";
      } else {
        $(function () {
          getProductList();
        });
      }
      function logout() {
        localStorage.clear()
    }
      function getProductList() {
        $.ajax({
          type: "GET",
          headers: {
            Authorization: "Bearer " + token.token,
          },
          url: `${API_URL}/products`,
          success: function (data) {
            totalProducts = data.length;
            console.log(data)
            let html = "";
            let tag = "";
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j< data[i].tag.length; j++) {
                    tag += `${data[i].tag[j].name}, `
                }
              html += `<tr id="${data[i]._id}">
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>
        <td><img src="${data[i].image}" alt="" width="150" height="150"></td>
        <td>${data[i].category.name}</td>
        <td>${data[i].restaurant.name}</td>
        <td>${data[i].discount.name}</td>
        <td>`        
        +tag+
        `</td>
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
    tag = ''
            }
            $("#products").html(html);
          },
        });
      }