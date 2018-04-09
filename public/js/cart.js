function showNotification(text) {
    swal({
        title: "Có lỗi xảy ra",
        text: text,
        icon: "error",
        buttons: {
            reTry: "Thử lại",
        },
    })
}

getProductsCartCheckOut();

$('.checkout button').click((e) => {
    if (!localStorage.cart) { return } 

    try {
        var cart = JSON.parse(localStorage.cart);
        if (!cart || !cart.products) {  return }
        if (cart.products.length == 0) { return }

        var promoCode = $('#voucher-input').val();

        var products = [];

        cart.products.forEach(product => {
            if (!product.id) { return }
            if (!product.color) { return }
            if (!product.quantity) { return }

            var p = {
                id: product.id,
                color: product.color,
                quantity: product.quantity
            }

            products.push(p);
        });

        var parameters = {
            products: products
        }

        if (promoCode && promoCode != 'undefined') {
            parameters.promoCode = promoCode
        }

       $.post('/thanh-toan', {
            parameters: parameters
       }, (data) => {
           console.log(data);
           if (data.error) {
               showNotification(data.error);
               return
           }

           var order = data.order;
           if (!order) {
               showNotification('Không thể khởi tạo quá trình thanh toán, vui lòng thử lại sau!');
               return
           }

           location.href = '/thanh-toan'

       }).error((err) => {
           console.log(err);
       })

    } catch (error) {
        return
    }        
});

$('.cart-overview').delegate('a.remove-from-cart', 'click', (e) => {
    var id = $(e.currentTarget).attr('data-id-product'),
    color = $(e.currentTarget).attr('data-color-product'),
    price = $(e.currentTarget).attr('data-raw-price'),
    quantity = $(e.currentTarget.parentElement.parentElement.parentElement).find(`input#${id}`).val();

    //remove it in localStorage
    if (removeFromCart(id, color)) {

        var cartSummary = $('.cart-summary');

        var totalItems = $(cartSummary).find('div#cart-subtotal-products span.js-subtotal').attr('data-total-quantity');
        var totalSubPrices = $(cartSummary).find('div#cart-subtotal-products span.value').attr('data-raw-price');
        var totalPrices = $(cartSummary).find('div.cart-total span.value').attr('data-total-raw-price');

        //adjust in summary cart
        $(cartSummary).find('div#cart-subtotal-products span.js-subtotal').attr('data-total-quantity', totalItems - 1);
        $(cartSummary).find('div#cart-subtotal-products span.js-subtotal').text(totalItems - 1 + " sản phẩm");
        $(cartSummary).find('div#cart-subtotal-products span.value').text(numberWithCommas(totalSubPrices - (quantity * price)) + " VNĐ")
        $(cartSummary).find('div#cart-subtotal-products span.value').attr('data-raw-price', totalSubPrices - (quantity * price))
        $(cartSummary).find('div.cart-total span.value').attr('data-total-raw-price', totalSubPrices - (quantity * price));
        $(cartSummary).find('div.cart-total span.value').text(numberWithCommas(totalSubPrices - (quantity * price)) + " VNĐ")

        //adjust in header
        fetchCartPreview();

        $('.cart-overview').find(`li[data-id-product=${id}]`).remove();
    } 
});