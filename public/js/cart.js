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

        var promoCode = checkAvailablePromoCode();

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
            parameters.promoCode = promoCode,
            parameters.discount = $('#cart-subtotal-discount span.value').attr('data-raw-price') || 0;
        }        

        $.post('/thanh-toan', {
            parameters: parameters
        }, (data) => {
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

function checkAvailablePromoCode() {
    return $('#voucher-block').find('div.voucher-use span.gift-card-item').attr('data-id-gift');
}

function showNotifier(status, content) {
    swal('Thông báo', content, status)
}

jQuery(document).ready(($) => {
    $('#check_promo_code').click((e) => {

        var promo_code = $('#voucher-input').val();
        if (!promo_code) { return }

        if (!checkAvailablePromoCode()) {
            
            $.post('/api/v1/check-promo-code', {
                promo_code: promo_code
            }, (data) => {
                if (data.promotion) {
                                            
                    var id = data.promotion._id,
                        discount = data.promotion.discount,
                        type = data.promotion.type,
                        totalMinOrder = data.promotion.totalMinOrder,
                        maxDiscount = data.promotion.maxDiscount,
                        subTotalBill = $('#cart-subtotal-products span.value').attr('data-raw-price');
                        totalBill =  $('#cart-total span.value').attr('data-total-raw-price');

                    if (!subTotalBill) {
                        showNotifier('error', `Mã ${promo_code} không thể được sử dụng.`)
                        return
                    }

                    if (totalMinOrder) {
                        if (!subTotalBill) {
                            showNotifier('error', `Mã ${promo_code} chỉ áp dụng cho đơn hàng có giá trị ${totalMinOrder} trở lên.`)
                            return
                        } else {
                            if (subTotalBill < totalMinOrder) {
                                showNotifier('error', `Mã ${promo_code} chỉ áp dụng cho đơn hàng có giá trị ${totalMinOrder} trở lên.`)
                                return
                            }
                        }
                    }      
                             
                    switch (type) {
                        case 'percent':
                            var price_discount = (subTotalBill * discount) / 100;

                            if (maxDiscount) {
                                if (price_discount > maxDiscount) {
                                    usePromoCode(id, promo_code, maxDiscount, subTotalBill - maxDiscount);
                                } else {
                                    usePromoCode(id, promo_code, price_discount, subTotalBill - price_discount)
                                }
                            } else {
                                usePromoCode(id, promo_code, price_discount, subTotalBill - price_discount)
                            }

                            break;
                    
                        default:
                            if (maxDiscount) {
                                if (discount > subTotalBill) {
                                    usePromoCode(id, promo_code, maxDiscount, subTotalBill - maxDiscount)
                                } else {
                                    usePromoCode(id, promo_code, discount, subTotalBill - discount)
                                }
                            } else {
                                usePromoCode(id, promo_code, discount, subTotalBill - discount);
                            }
                            break;
                    }                          

                } else {
                    showNotifier('error', `Mã ${promo_code} không hợp lệ hoặc hết hạn sử dụng!`);
                }
            }).error((err) => {
                showNotifier('error', `Lỗi không xác định, vui lòng tải lại trang và thử lại.`)
            })
        } else {
            showNotifier('error', 'Chỉ có thể áp dụng 1 mã giảm giá cho mỗi đơn hàng.');
        }
    });

    $('#voucher-block div.voucher-use').delegate('button', 'click', (e) => {
        location.reload();
    })

    function usePromoCode(idGift, promo_code, price, totalOrder) {
        var content = `
            <span class="label label-success gift-card-item" data-id-gift=${idGift}>
                <span class="coupon-disc">${promo_code}</span>
                <button type="button" class="btn btn-default btn-remove-coupon"><i class="fa fa-times"></i></button>
            </span>                            
        `

        if (checkAvailablePromoCode()) { return }
        $('#voucher-block').find('div.voucher-use p.note-coupon').before(content);
        $('#voucher-input').val('');
        $('#cart-subtotal-discount span.value').attr('data-raw-price', price)
        $('#cart-subtotal-discount span.value').text("- " + numberWithCommas(price) + ' VNĐ')
        $('#cart-total span.value').attr('data-total-raw-price', totalOrder);
        $('#cart-total span.value').text(numberWithCommas(totalOrder) + " VNĐ");
    }
});