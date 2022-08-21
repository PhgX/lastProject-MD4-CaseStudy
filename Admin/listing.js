const API_URL = "http://localhost:3000";
let token = JSON.parse(localStorage.getItem("accessToken"));
let totalProduct = 0;
if (!token) {
  location.href = "login.html";
} else {
  $(function () {
    getProductList();
  });
}

function drawCategorySelectOption() {
  $.ajax({
    type: "GET",
    headers: {
      Authorization: "Bearer " + token.token,
    },
    url: `${API_URL}/categories`,
    success: function (data) {
      let html = "<option>Select category</option>";
      for (let category of data) {
        html += `<option value="${category._id}">${category.name}</option>`;
      }
      $("#category").html(html);
    },
  });
}

function getProductList() {
  $.ajax({
    type: "GET",
    headers: {
      Authorization: "Bearer " + token.token,
    },
    url: `${API_URL}/products`,
    success: function (data) {
      totalProduct = data.length;
      let html = "";
      for (let i = 0; i < data.length; i++) {
        html += `<tr id="${data[i]._id}">
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].amount}</td>
        <td><img src="${API_URL}/${data[i].image}" alt=""></td>
        <td>${data[i].category ? data[i].category.name : ""}</td>
        <td>
        <button type="button" onclick="showUpdateForm('${
          data[i]._id
        }')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Update
        </button>
        </td>
        <td><button class="btn btn-danger" onclick="showConfirmDelete('${
          data[i]._id
        }')">Delete</button></td>
    </tr>`;
      }
      $("#products").html(html);
    },
  });
}

function showConfirmDelete(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteProduct(id);
    }
  });
}

function deleteProduct(id) {
  $.ajax({
    type: "DELETE",
    url: `${API_URL}/products/${id}`,
    headers: {
      Authorization: "Bearer " + token.token,
    },
    success: function () {
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      $(`#${id}`).remove();
    },
  });
}

function resetForm() {
  $("#name").val("");
  $("#price").val("");
  $("#amount").val("");
  $("#image").val("");
  $("#description").val("");
}

function createProduct() {
  let name = $("#name").val();
  let price = $("#price").val();
  let amount = $("#amount").val();
  let image = $("#image").val();
  let description = $("#description").val();
  let categoryId = $("#category").val();
  let product = {
    name: name,
    price: price,
    amount: amount,
    image: image,
    description: description,
    category: {
      _id: categoryId,
    },
  };
  $.ajax({
    type: "POST",
    url: `${API_URL}/products`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    },
    data: JSON.stringify(product),
    success: function (data) {
      totalProduct++;
      let html = `<tr id="${data._id}">
        <td>${totalProduct}</td>
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td>${data.amount}</td>
        <td><img src="${API_URL}/${data.image}" alt=""></td>
        <td>${data.category ? data.category.name : ""}</td>
        <td>
        <button type="button" onclick="showUpdateForm('${
          data._id
        }')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Update
        </button>
        </td>
        <td><button class="btn btn-danger" onclick="showConfirmDelete('${
          data._id
        }')">Delete</button></td>
    </tr>`;
      $("#products").append(html);
      resetForm();
    },
  });
}

function showCreateForm() {
  drawCategorySelectOption();
  resetForm();
  let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="createProduct()">Create</button>`;
  $("#title").html("Create Product");
  $("#footer").html(html);
}

function showUpdateForm(id) {
  let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="updateProduct('${id}')">Update</button>`;
  $("#title").html("Update Product");
  $("#footer").html(html);
  getProduct(id);
}

function updateProduct(id) {
  let name = $("#name").val();
  let price = $("#price").val();
  let amount = $("#amount").val();
  let image = $("#image").val();
  let description = $("#description").val();
  let categoryId = $("#category").val();
  let product = {
    name: name,
    price: price,
    amount: amount,
    image: image,
    description: description,
    category: {
      _id: categoryId,
    },
  };
  $.ajax({
    type: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    },
    url: `${API_URL}/products/${id}`,
    data: JSON.stringify(product),
    success: function (data) {
      let html = `<tr id="${data._id}">
        <td>${totalProduct}</td>
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td>${data.amount}</td>
        <td><img src="${API_URL}/${data.image}" alt=""></td>
        <td>${data.category ? data.category.name : ""}</td>
        <td>
        <button type="button" onclick="showUpdateForm('${
          data._id
        }')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Update
        </button>
        </td>
        <td><button class="btn btn-danger" onclick="showConfirmDelete('${
          data._id
        }')">Delete</button></td>
    </tr>`;
      $(`#${id}`).replaceWith(html);
      Swal.fire("Updated!", "Product has been updated.", "success");
    },
  });
}

function getProduct(id) {
  $.ajax({
    type: "GET",
    headers: {
      Authorization: "Bearer " + token.token,
    },
    url: `${API_URL}/products/${id}`,
    success: function (data) {
      $("#name").val(data.name);
      $("#price").val(data.price);
      $("#amount").val(data.amount);
      $("#description").val(data.description);
      $("#image").val(data.image);
      $.ajax({
        type: "GET",
        headers: {
          Authorization: "Bearer " + token.token,
        },
        url: `${API_URL}/categories`,
        success: function (categories) {
          let html = "<option>Select category</option>";
          for (let category of categories) {
            if (category._id === data.category?._id) {
              html += `<option value="${category._id}" selected>${category.name}</option>`;
            } else {
              html += `<option value="${category._id}">${category.name}</option>`;
            }
          }
          $("#category").html(html);
        },
      });
    },
  });
}

function showListProduct() {
  $.ajax({
    type: "GET",
    headers: {
      Authorization: "Bearer " + token.token,
    },
    url: `${API_URL}/list/products`,
    success: function (alldata) {
      let html = "";
      let userId = alldata.userId;
      let data = alldata.products;
      let orderId = "";
      for (let i = 0; i < data.length; i++) {
        let productID = data[i]._id;
        if (!productID) {
          productID = " ";
        }
        let productName = data[i].name;
        if (!productName) {
          productName = " ";
        }
        let productPrice = data[i].price;
        if (!productPrice) {
          productPrice = 0;
        }
        let tagValue = data[i].tag.name;
        let productTag;
        if (tagValue == undefined || tagValue == null) {
          productTag = " ";
        } else {
          productTag = tagValue.join(", ");
        }
        let productCategory = data[i].category.name;
        if (productCategory == undefined || productCategory == null) {
          productCategory = " ";
        }
        let productRestaurant = data[i].restaurant.name;
        if (productRestaurant == undefined || productRestaurant == null) {
          productRestaurant = " ";
        }
        let productDiscount = data[i].discount.name;
        if (productDiscount == undefined || productDiscount == null) {
          productDiscount = " ";
        }
        let productImage = data[i].image;
        if (!productImage) {
          productImage = " ";
        }
        let discount = data[i].discount.value;
        html += `<div class="col-md-4 col-sm-6 mb-4 pb-2">
                <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                    <div class="list-card-image">
                        <div class="star position-absolute"><span class="badge badge-success"><i
                                    class="icofont-star"></i> 3.1 (300+)</span></div>
                        <div class="favourite-heart text-danger position-absolute"><a href="detail.html"><i
                                    class="icofont-heart"></i></a></div>
                        <div class="member-plan position-absolute"><span
                                class="badge badge-dark">Promoted</span></div>
                        <a href="detail.html">
                            <img src="${productImage}" class="img-fluid item-img">
                        </a>
                    </div>
                    <div class="p-3 position-relative">
                        <div class="list-card-body">
                            <h6 class="mb-1"><a href="detail.html" class="text-black">${productRestaurant}
                                </a>
                            </h6>
                            <p class="text-gray mb-3">${productTag}</p>
                            <p class="mb-1" style="color: Green">${productName}</p>
                            <p class="text-gray mb-3 time"><span
                                    class="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2"><i
                                        class="icofont-wall-clock"></i> 15–25 min</span> <span
                                    class="float-right text-black-50"> ${productPrice}</span></p>
                        </div>
                        <div class="list-card-badge">
                            <span class="badge badge-danger">OFFER</span> <small>${productDiscount} off</small>
                        </div>
                        <div>
                            <div class="list-card-badge">
                                <input hidden type="text" name="productId" id="productId" value="${productID}"/>
                                <input hidden type="text" name="productName" id="productName" value="${productName}"/>
                                <input hidden type="text" name="productPrice" id="productPrice" value="${productPrice}"/>
                                <input hidden type="text" name="discount" id="discount" value="${discount}"/>
                                <input hidden type="text" name="userId" id="userId" value="${userId}"/>
                                <input hidden type="text" name="orderId" id="orderId" value="${orderId}"/>
                                <input type="number" name="amount" id="amount" class="form-label-group" placeholder="Nhập số lượng" required/>
                            </div>
                            <div >
                                <button onclick="cartCheck() " class="button-33">Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
      }
      $("#productList").html(html);
    },
  });
}

function cartCheck() {
  let orderId = $("#orderId").val();
  if (orderId == "") {
    orderProduct();
  } else {
    addNewOrderToCart();
  }
}

function orderProduct() {
  let productId = $("#productId").val();
  let productName = $("#productName").val();
  let productPrice = $("#productPrice").val();
  let discount = $("#discount").val();
  let amount = $("#amount").val();
  let userId = $("#userId").val();
  let totalMoney = productPrice * discount * amount;
  let orderInfo;
  orderInfo = {
    userId: userId,
    productId: productId,
    productName: productName,
    productPrice: productPrice,
    discount: discount,
    amount: amount,
    totalMoney: totalMoney,
  };

  if (
    productId &&
    productName &&
    productPrice &&
    discount &&
    amount > 0 &&
    userId &&
    totalMoney
  ) {
    $.ajax({
      type: "POST",
      headers: {
        Authorization: "Bearer " + token.token,
        "Content-Type": "application/json",
      },
      url: `${API_URL}/list/products`,
      data: JSON.stringify(orderInfo),
      success: function (data) {
        $('#amount').val("");
        let orderId = data.orderId;
        $('#orderId').html(orderId);
        console.log("data", data);
        Swal.fire(
          "Xin Cám ơn quý khách",
          "Đặt hàng thành công!",
          "success"
          );
        $.ajax({
          type: "GET",
          headers: {
            Authorization: "Bearer " + token.token,
          },
          url: `${API_URL}/list/products`,
          success: function (data) {
            console.log("createnewOrder()", data);
            let html = "";
            html += `<p class="mb-2"><i class="icofont-ui-press text-danger food-item"></i>Tên sản phẩm: ${productName}
              Giá: ${productPrice}VNĐ x Số lượng: ${amount} <span class="float-right text-secondary">Thành tiền: ${totalMoney}VNĐ</span></p>`;
            $("#showCart").html(html);
            // let html2 = '';
            // html2 += `<p class="mb-0 font-weight-bold text-secondary">Tổng hóa đơn<span 
            // class="float-right text-dark"></span></p>`
            // let html1 = '';
            // html1 += `<span class="badge badge-success" id="countOrder">${countOrderDetail}</span>`
            // $('#countOrder').html(html1);
          },
          error: function(error) {
              console.log(error);
          }
        });
      },
      error: function(error) {
          console.log(error);
      }
    });
  }
  
}


function addNewOrderToCart() {

}