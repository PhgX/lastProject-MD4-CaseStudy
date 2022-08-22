const API_URL = "http://localhost:3000";
let token = JSON.parse(localStorage.getItem("accessToken"));
let totalProduct = 0;
if (!token) {
  location.href = "login.html";
} else {
  $(function () {
    showOrderDetailCount();
    showListOrderDetails();
    showOrderPrice();
  });
}
function showOrderPrice() {
  $.ajax({
    type: "GET",
    headers: {
      Authorization: "Bearer " + token.token,
    },
    url: `${API_URL}/orders`,
    success: function (data) {
      let html = `<div class="mb-2 bg-white rounded p-2 clearfix">
                            
      <h6 class="font-weight-bold mb-0">Tổng thanh toán <span class="float-right">${data}</span></h6>
  </div>
  <a href="thanks.html" class="btn btn-success btn-block btn-lg">Thanh toán ${data}
      <i class="icofont-long-arrow-right"></i></a>`
      $("#totalPrice").html(html);
    }})
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
function showListOrderDetails() {
  $.ajax({
    type: "GET",
    headers: {
      Authorization: "Bearer " + token.token,
    },
    url: `${API_URL}/orderdetails`,
    success: function (data) {
      let html = "";
      totalProduct = data.length;
      for (let i = 0; i < data.length; i++) {
        
        html += `<div class="d-flex mb-4 osahan-cart-item-profile">
        <img class="img-fluid mr-3 rounded-pill" alt="osahan" src="../assets/img/2.jpg">
        <div class="d-flex flex-column">
            <h6 class="mb-1 text-white">${data[i].product.restaurant.name}
            </h6>
            <p class="mb-0 text-white"><i class="icofont-location-pin"></i>  ${data[i].product.restaurant.address}</p>
        </div>
    </div>
    <div class="bg-white rounded shadow-sm mb-2">
        <div class="gold-members p-2 border-bottom">
            <p class="text-gray mb-0 float-right ml-2">${data[i].price}</p>
            <span class="count-number float-right">
                <button class="btn btn-outline-secondary  btn-sm left dec"> <i
                        class="icofont-minus"></i> </button>
                <input class="count-number-input" type="text" value="${data[i].amount}" readonly="">
                <button class="btn btn-outline-secondary btn-sm right inc"> <i
                        class="icofont-plus"></i> </button>
            </span>
            <div class="media">
                <div class="mr-2"><i class="icofont-ui-press text-danger food-item"></i></div>
                <div class="media-body">
                    <p class="mt-1 mb-0 text-black">${data[i].product.name}</p>
                </div>
            </div>
        </div>
        
    </div>
    <div class="mb-2 bg-white rounded p-2 clearfix">
        <div class="input-group input-group-sm mb-2">
            <input type="text" class="form-control" placeholder="Mã giảm giá">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" id="button-addon2"><i
                        class="icofont-sale-discount"></i> APPLY</button>
            </div>
        </div>
        <div class="input-group mb-0">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="icofont-comment"></i></span>
            </div>
            <textarea class="form-control" placeholder="Cửa hàng cần chú ý..."
                aria-label="With textarea"></textarea>
        </div>
    </div>`;
      }
      $("#orderDetailsList").html(html);
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


function addToCart() {
  let productId = $("#productId").val();
  let productPrice = $("#productPrice").val();
  let discount = $("#discount").val();
  let amount = $("#amount").val();
  let orderDetailPrice = productPrice * discount * amount;
  let orderDetailInfo = {
    product: productId,
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
        showListOrderDetails();
        showOrderPrice();
        }
  })
}