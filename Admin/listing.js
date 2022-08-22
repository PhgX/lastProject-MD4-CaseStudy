const API_URL = "http://localhost:3000";
let token = JSON.parse(localStorage.getItem("accessToken"));
let totalProduct = 0;
if (!token) {
  location.href = "login.html";
} else {
  $(function () {
    showOrderDetailCount();
    showListProduct();
  });
}
function showOrderDetailCount() {
  $.ajax({
    type: "GET",
    headers: {
      Authorization: "Bearer " + token.token,
    },
    url: `${API_URL}/orders/count`,
    success: function (data) {
      let html = `${data}`;
      $("#countOrder").html(html);
    }})
}
function showListProduct() {
  $.ajax({
    type: "GET",
    headers: {
      Authorization: "Bearer " + token.token,
    },
    url: `${API_URL}/products`,
    success: function (data) {
      let html = "";
      totalProduct = data.length;
      for (let i = 0; i < data.length; i++) {
        
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
                            <img src="${data[i].image}" width="150" height="150">
                        </a>
                    </div>
                    <div class="p-3 position-relative">
                        <div class="list-card-body">
                            <h6 class="mb-1"><a href="detail.html" class="text-black">${data[i].name}
                                </a>
                            </h6>
                            <p class="text-gray mb-3">${data[i].tag[0].name}</p>
                            <p class="mb-1" style="color: Green">${data[i].restaurant.name}</p>
                            <p class="text-gray mb-3 time"><span
                                    class="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2"><i
                                        class="icofont-wall-clock"></i> 15–25 min</span> <span
                                    class="float-right text-black-50"> ${data[i].price}</span></p>
                        </div>
                        <div class="list-card-badge">
                            <span class="badge badge-danger">OFFER</span> <small>${data[i].discount.name} off</small>
                        </div>
                        <div>
                            <div class="list-card-badge">
                                <input hidden type="text" name="productId" id="productId-${data[i]._id}" value="${data[i]._id}"/>
                                <input hidden type="text" name="productName" id="productName-${data[i]._id}" value="${data[i].name}"/>
                                <input hidden type="text" name="productPrice" id="productPrice-${data[i]._id}" value="${data[i].price}"/>
                                <input hidden type="text" name="discount" id="discount-${data[i]._id}" value="${data[i].discount.value}"/>
                                <input type="number" name="amount" id="amount-${data[i]._id}" placeholder="Nhập số lượng" required/>
                            </div>
                            <div >
                                <button onclick="addToCart('${data[i]._id}')">Đặt hàng</button>
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

// function cartCheck() {
//   let orderId = $("#orderId").val();
//   if (orderId == "") {
//     orderProduct();
//   } else {
//     addNewOrderToCart();
//   }
// }

// function orderProduct() {
//   let productId = $("#productId").val();
//   let productName = $("#productName").val();
//   let productPrice = $("#productPrice").val();
//   let discount = $("#discount").val();
//   let amount = $("#amount").val();
//   let userId = $("#userId").val();
//   let totalMoney = productPrice * discount * amount;
//   let orderInfo;
//   orderInfo = {
//     userId: userId,
//     productId: productId,
//     productName: productName,
//     productPrice: productPrice,
//     discount: discount,
//     amount: amount,
//     totalMoney: totalMoney,
//   };

//   if (
//     productId &&
//     productName &&
//     productPrice &&
//     discount &&
//     amount > 0 &&
//     userId &&
//     totalMoney
//   ) {
//     $.ajax({
//       type: "POST",
//       headers: {
//         Authorization: "Bearer " + token.token,
//         "Content-Type": "application/json",
//       },
//       url: `${API_URL}/list/products`,
//       data: JSON.stringify(orderInfo),
//       success: function (data) {
//         $('#amount').val("");
//         let orderId = data.orderId;
//         $('#orderId').html(orderId);
//         console.log("data", data);
//         Swal.fire(
//           "Xin Cám ơn quý khách",
//           "Đặt hàng thành công!",
//           "success"
//           );
//         $.ajax({
//           type: "GET",
//           headers: {
//             Authorization: "Bearer " + token.token,
//           },
//           url: `${API_URL}/list/products`,
//           success: function (data) {
//             console.log("createnewOrder()", data);
//             let html = "";
//             html += `<p class="mb-2"><i class="icofont-ui-press text-danger food-item"></i>Tên sản phẩm: ${productName}
//               Giá: ${productPrice}VNĐ x Số lượng: ${amount} <span class="float-right text-secondary">Thành tiền: ${totalMoney}VNĐ</span></p>`;
//             $("#showCart").html(html);
//             let html2 = '';
//             html2 += `<p class="mb-0 font-weight-bold text-secondary">Tổng hóa đơn<span 
//             class="float-right text-dark"></span></p>`
//             let html1 = '';
//             // html1 += `<span class="badge badge-success" id="countOrder">${countOrderDetail}</span>`
//             // $('#countOrder').html(html1);
//           },
//           error: function(error) {
//               console.log(error);
//           }
//         });
//       },
//       error: function(error) {
//           console.log(error);
//       }
//     });
//   }
  
// }


function addToCart(productId) {
  let product = $(`#productId-${productId}`).val();
  let productPrice = +$(`#productPrice-${productId}`).val();
  let discount = +$(`#discount-${productId}`).val();
  let amount = +$(`#amount-${productId}`).val();
  if (amount !== 0) {
    console.log(amount)
    console.log(productPrice)
    console.log(discount)
    
    let orderDetailPrice = productPrice  * amount ;
    console.log(orderDetailPrice)
  let orderDetailInfo = {
    product: product,
    price: orderDetailPrice,
    amount: amount
  }
  $.ajax({
    type: 'POST',
        url: `${API_URL}/orderdetails`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token
        },
        data: JSON.stringify(orderDetailInfo),
        success: function () {
          Swal.fire(
            "Xin Cám ơn quý khách",
            "Đặt hàng thành công!",
            "success"
        )
        showOrderDetailCount()
        console.log(amount)
    console.log(productPrice)
    console.log(discount)
    console.log(orderDetailPrice)

        }
  })
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'Chưa nhập số lượng',
      footer: '<a href="home.html">Quay trở lại trang chủ</a>',
    });
  }
  
}