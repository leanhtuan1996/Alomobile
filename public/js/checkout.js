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

(function () {
    //html element
    var summaryBlock = $('#js-checkout-summary');
    var itemsCartBlock = $(summaryBlock).find('div#cart-summary-product-list ul.media-list');

    $(itemsCartBlock).find('li').remove();

    if (!localStorage.cart) { location.href = "/gio-hang"; return }

    try {
        var cart = JSON.parse(localStorage.cart);
        if (!cart || !cart.products) { location.href = "/gio-hang"; return }
        if (cart.products.length == 0) { location.href = "/gio-hang"; return }
    } catch (error) {
        location.href = "/gio-hang"; return
    }

    //get products in cart
    getProductsCart((data) => {
        if (data.products.length != 0) {
            var items = "";
            var totalSubPrice = 0;
            data.products.forEach(product => {
                totalSubPrice += product.detail.price * product.quantity;
                items += `
                    <li class="media" style="margin-bottom: 5px;">
                        <div class="media-left">
                            <a href="/${product.alias}-${product._id};"
                                title="${product.name}">
                                <img class="media-object" src="${product.images[0].url}"
                                    alt="${product.images[0].alt}">
                            </a>
                        </div>
                        <div class="media-body">
                            <span class="product-name">${product.name}</span>
                            <span class="product-quantity">x${product.quantity}</span>
                            <span class="product-price float-xs-right">${numberWithCommas(product.quantity * product.detail.price) + " VNĐ"}</span>
                        </div>
                    </li>
                `
            });

            $(itemsCartBlock).append(items);

            $(summaryBlock).find('#cart-subtotal-products span.value').text(numberWithCommas(totalSubPrice) + " VNĐ");
            $(summaryBlock).find('div.cart-summary-products p.total-items-cart').text(data.products.length + " sản phẩm")            

            var discount = $(summaryBlock).find('#cart-subtotal-discount span.value').attr('data-raw-price');
            if (discount) {
                $(summaryBlock).find('#cart-subtotal-discount span.value').text(numberWithCommas(discount) + " VNĐ");
                $(summaryBlock).find('div.cart-summary-totals').find('span.value').text(numberWithCommas(totalSubPrice - discount) + " VNĐ")
                $(summaryBlock).find('div.cart-summary-totals').find('span.value').attr('data-raw-price', totalSubPrice - discount);
            }
        } else {
            location.href = "/gio-hang"
        }
    });
})();

jQuery(document).ready(($) => {
    $.get('https://raw.githubusercontent.com/linhmtran168/vietnam-gis-crawler/master/data.json', (data) => {
        var optionSelectState = $('#checkout-addresses-step').find('select[name="id_state"]');
        var optionSelectDistrict = $('#checkout-addresses-step').find('select[name="id_district"]');
        var raw = JSON.parse(data);

        var options = "";
        for (const key in raw) {
            options += `<option value="${key}">${raw[key].name}</option>`
        }

        var optionsDictricts = "";
        for (const key in raw['1'].districts) {
            optionsDictricts += `<option value="${key}">${raw['1'].districts[key]}</option>`
        }

        $(optionSelectState).append(options);
        $(optionSelectDistrict).append(optionsDictricts);

        $('#checkout-addresses-step').find('select[name="id_state"]').change((e) => {
            var value = $(e.currentTarget).find('option:selected').val();
            for (const key in raw) {
                if (key == value) {
                    var optionsNewDictricts = '';
                    for (const key_district in raw[`${key}`].districts) {
                        optionsNewDictricts += `<option value="${key_district}">${raw[`${key}`].districts[key_district]}</option>`
                    }
                    $(optionSelectDistrict).find('option').remove();
                    $(optionSelectDistrict).append(optionsNewDictricts);
                    return
                }
            }
        });
    });

    $('.js-address-form form').submit((e) => {
        e.preventDefault();

        var fullName = $(e.currentTarget).find('input[name="fullName"]').val(),
            phone = $(e.currentTarget).find('input[name="phone"]').val(),
            address = $(e.currentTarget).find('input[name="address"]').val(),
            city = $(e.currentTarget).find('select[name="id_state"] option:selected').text(),
            zipPostalCode = $(e.currentTarget).find('input[name="postcode"]').val(),
            state = $(e.currentTarget).find('select[name="id_district"] option:selected').text();

        var toAddress = {
            fullName: fullName,
            phone: phone,
            address: address,
            city: city,
            state: state,
            zipPostalCode: zipPostalCode
        };

        $.ajax({
            url: '/api/v1/order/check-out',
            data: {
                toAddress: toAddress    
            },
            method: 'PUT',
            success: (data) => {
                if (!data.error) {
                    location.reload();
                } else {
                    var error = data.error;
                    if (typeof error == 'Object') {
                        error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                    }
                    showNotification(error)
                }
            }, 
            error: (err) => {
                var error = err;
                if (typeof error == 'Object') {
                    error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                }
                showNotification(error)
            }
        })


        // $('#checkout-addresses-step').removeClass('-current js-current-step')
        //$('#checkout-addresses-step').addClass('-complete');

        //$('#checkout-delivery-step').removeClass('-unreachable');
        //$('#checkout-delivery-step').addClass('-reachable -current js-current-step')
    });

    $('.delivery-options-list form').submit((e) => {
        e.preventDefault();

        $.ajax({
            url: '/api/v1/order/check-out',
            data: {
                note: $('#delivery_message').val() || '0'    
            },
            method: 'PUT',
            success: (data) => {
                if (!data.error) {
                    location.reload();
                } else {
                    var error = data.error;
                    if (typeof error == 'Object') {
                        error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                    }
                    showNotification(error)
                }
            }, 
            error: (err) => {
                var error = err;
                if (typeof error == 'Object') {
                    error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                }
                showNotification(error)
            }
        })

        // $('#checkout-delivery-step').removeClass('-current js-current-step')
        // $('#checkout-delivery-step').addClass('-complete');

        // if ($('#checkout-delivery-step').find('h1.step-title i.material-icons').length == 0) {
        //     $('#checkout-delivery-step').find('h1.step-title span.step-number').before('<i class="material-icons done"></i>')
        // }

        // if ($('#checkout-delivery-step').find('h1.step-title span.step-edit').length == 0) {
        //     $('#checkout-delivery-step').find('h1.step-title span.step-number').after('<span class="step-edit text-muted"><i class="material-icons edit">mode_edit</i> chỉnh sửa</span>')
        // }

        // $('#checkout-payment-step').removeClass('-unreachable');
        // $('#checkout-payment-step').addClass('-reachable -current js-current-step');
    });

    //sign up
    $('.js-customer-form').submit((e) => {
        e.preventDefault();

        //validate parameters
        var firstName = $('input[name="firstname"]').val(),
            lastName = $('input[name="lastname"]').val(),
            email = $('input[name="email"]').val(),
            password = $('input[name="password"]').val(),
            birthday = $('input[name="birthday"]').val(),
            sex = $('input[name="id_gender"]:checked').val(),
            isRegistered_NewLetters = $('input[name="option"]:checked').val() == 1 ? true : false;

        if (!firstName) {
            showNotify("Vui lòng nhập họ của bạn.");
            return
        }

        if (!lastName) {
            showNotify("Vui lòng nhập tên của bạn.");
            return
        }

        if (!email) {
            showNotify("Vui lòng nhập Email của bạn.");
            return
        }

        if (!password) {
            showNotify("Vui lòng nhập mật khẩu.");
            return
        }

        if (!sex) {
            showNotify("Vui lòng chọn giới tính.");
            return
        }

        //
        var user = {
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password,
            birthday: birthday,
            sex: sex,
            isRegistered_NewLetters: isRegistered_NewLetters
        }

        $.post(
            '/api/v1/user/sign-up',
            {
                credential: user
            },
            (data) => {
                if (data.error) {
                    showNotify(data.error || "Đã xảy ra lỗi không xác định, vui lòng thử lại sau.");
                } else {
                    if (data.user) {
                        $.ajax({
                            url: '/api/v1/order/check-out',
                            data: {
                                byUser: data.user
                            },
                            method: 'PUT',
                            success: (data) => {
                                if (!data.error) {
                                    location.reload();
                                } else {
                                    var error = data.error;
                                    if (typeof error == 'Object') {
                                        error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                                    }
                                    showNotification(error)
                                }
                            },
                            error: (err) => {
                                var error = err;
                                if (typeof error == 'Object') {
                                    error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                                }
                                showNotification(error)
                            }
                        })
                    }
                }
            }
        );

    });

    //sign in
    $('#login-form').submit((e) => {
        e.preventDefault();

        //validate parameters
        var email = $("#email").val(),
            password = $("#password").val();

        if (!email) {
            showNotify('Vui lòng nhập Email');
            return
        }

        if (!password) {
            showNotify('Vui lòng nhập mật khẩu');
            return
        }

        var user = {
            email: email,
            password: password
        }

        $.post(
            '/api/v1/user/sign-in',
            {
                credential: user
            },
            (data) => {
                if (data.user) {
                    $.ajax({
                        url: '/api/v1/order/check-out',
                        data: {
                            byUser: data.user
                        },
                        method: 'PUT',
                        success: (data) => {
                            if (!data.error) {
                                location.reload();
                            } else {
                                var error = data.error;
                                if (typeof error == 'Object') {
                                    error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                                }
                                showNotification(error)
                            }
                        },
                        error: (err) => {
                            var error = err;
                            if (typeof error == 'Object') {
                                error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                            }
                            showNotification(error)
                        }
                    })
                } else {
                    var err = data.error || "Đã xảy ra lỗi không xác định, vui lòng thử lại sau.";
                    showNotify(err);
                    return
                }
            }
        );
    });
});

$('#conditions-to-approve').delegate('input', 'click', (e) => {
    if ($(e.currentTarget).prop('checked')) {
        $('#payment-confirmation-block button[type="submit"]').removeClass('disabled')
    } else {
        $('#payment-confirmation-block button[type="submit"]').addClass('disabled');
    }
});

$('#conditions-to-approve').submit((e) => {

    e.preventDefault();

    if ($('#payment-confirmation-block button[type="submit"]').hasClass('disabled')) { return }

    //get payment method
    var method = $('#checkout-payment-step').find('input[type="radio"]:checked').attr('data-method-payment');

    if (!method) { return }

    switch (method) {
        case 'cod':

            var parameters = {
                status: 1,
                checkoutMethod: 'Cod'
            }

            $.ajax({
                url: '/api/v1/order/check-out',
                data: parameters,
                method: 'PUT',
                success: (data) => {
                    if (!data.error) {
                        //remove cart
                        localStorage.removeItem('cart');
                        location.href = `/dat-hang-thanh-cong?id=${data.order.alias}&email=${data.order.byUser.email}`
                    } else {
                        var error = data.error;
                        if (typeof error == 'Object') {
                            error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                        }
                        showNotification(error)
                    }
                },
                error: (err) => {
                    var error = err;
                    if (typeof error == 'Object') {
                        error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                    }
                    showNotification(error)
                }
            });
            
            break;
        case 'vtc-pay':
            $.post('/api/v1/order/request-payment', {
                method: 'vtc-pay'
            }, (data) => {
                if (data.error) {
                    var error = data.error;
                    if (typeof error == 'Object') {
                        error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                    }
                    showNotification(error)
                    return
                } 

                var href = data.href;
                if (!href) {
                    showNotification('Lỗi không xác định, vui lòng tải lại trang và thử lại');
                    return
                }

                location.href = href

            }).error((err) => {
                var error = err;
                if (typeof error == 'Object') {
                    error = 'Lỗi không xác định, vui lòng tải lại trang và thử lại'
                }
                showNotification(error)
            })
            break;
    }    
});
