function showNotify(text) {
    swal({
        title: "Đăng nhập thất bại",
        text: text,
        icon: "error",
        buttons: {
            reTry: "Đã rõ",
        },
    })
}

function isValidDate(dateString) {
    var regEx = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    if (!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    // if (!d.getTime() && d.getTime() !== 0) return false; // Invalid date
    // return d.toISOString().slice(0, 10) === dateString;

    return (!isNaN(d))
}

function logout() {
    $.ajax({
        url: "/sign-out",
        method: "GET",
        success: (data) => {
            if (data.error) { return };
            localStorage.removeItem('cart');
            window.location.reload();
        },
        error: (err) => {
           // window.location.reload();
           //console.log(err);
        }
    })
}

function checkAvailable(id, quantity, color, cb) {

    //get quantity of product in current cart
    var products = getProductsInCart();
    if (products.length > 0) {
        var product = products.find(element => {
            return element.id == id && element.color == color
        });

        if (product) {
            quantity = Number.parseInt(quantity) + Number.parseInt(product.quantity);
        }
    }

    $.get('/api/v1/order/checkAvailable', {
        id: id,
        quantity: quantity,
        color: color
    }, (data) => {
        return data.error == null ? cb(true) : cb(false)
    }).error((err) => {
        return cb(false)
    });
}

function checkAvailableWithoutPlus(id, quantity, color, cb) {
    $.get('/api/v1/order/checkAvailable', {
        id: id,
        quantity: quantity,
        color: color
    }, (data) => {
        return data.error == null ? cb(true) : cb(false)
    }).error((err) => {
        return cb(false)
    });
}

function getProductsInCart() {
    if (!localStorage.cart) { return [] }

    var cart;

    try {
        cart = JSON.parse(localStorage.cart);
    } catch (error) {
        return []
    }

    products = cart.products;

    if (!products || products.length == 0) { return [] }
    return products
}

function addToCart(item) {
    if (!item.id) { return false }
    if (!item.color) { return false }
    if (!item.quantity) { return false }

    try {
        item.quantity = Number.parseInt(item.quantity);
        item.id = String(item.id);
        item.color = String(item.color);
    } catch (error) {
        return null
    }

    if (!localStorage) {
        return null
    }

    if (!localStorage.cart) {
        return saveToStorage([item])
    } else {
        var cart;
        try {
            cart = JSON.parse(localStorage.cart);
        } catch (error) {
            return null
        }

        if (!cart) { return null }
        var products = cart.products;
        if (!Array.isArray(products)) { return null }

        var idx = findItemExist(products, item.id, item.color);
        if (idx > -1) {
            products[idx].quantity += item.quantity
            return saveToStorage(products)
        } else {
            products.push(item);
            return saveToStorage(products);
        }
    }
}

function saveToStorage(products) {
    try {
        localStorage.cart = JSON.stringify({ products: products });
        fetchCartPreview(products);
        return products
    } catch (error) {
        return null
    }
}

function findItemExist(products, id, color) {
    return products.findIndex(element => {
        return element.id == id && element.color == color
    });
}

function removeFromCart(id, color) {
    if (!localStorage.cart) { return false }
    if (!id) { return false }
    if (!color) { return false }

    var cart;

    try {
        cart = JSON.parse(localStorage.cart);
    } catch (error) {
        return false
    }

    var products = cart.products;

    if (!Array.isArray(products)) { return false }

    if (!products || products.length == 0) { return false }

    var idx = products.findIndex(e => {
        return e.id == id && e.color == color
    });

    if (idx == -1) { return false }

    products.splice(idx, 1);

    try {
        localStorage.cart = JSON.stringify({ products: products });
        return products
    } catch (error) {
        return false
    }
}

function updateQuantityItemsInCart(id, color, quantity) {
    checkAvailableWithoutPlus(id, quantity, color, (isAvailable) => {
        if (isAvailable) {
            var products = getProductsInCart();
            if (products.length > 0) {
                var idx = products.findIndex(element => {
                    return element.id == id && element.color == color
                });

                if (idx > -1) {
                    products[idx].quantity = quantity;
                    saveToStorage(products);
                }
            }
        }
    });
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$('.cart-items-preview').bind('DOMSubtreeModified', (e) => {
    var product = $(e.currentTarget).find('li');
    if (!product || product.length == 0) {
        $(e.currentTarget.parentElement).find('div.checkout a').addClass('disabled')
    } else {
        $(e.currentTarget.parentElement).find('div.checkout a').removeClass('disabled')
    }
});

function getProductsCart(products = null, cb) {

    if (!products) {
        if (!localStorage.cart) { return cb([]) }

        var cart;

        try {
            cart = JSON.parse(localStorage.cart);
        } catch (error) {
            return cb([])
        }

        products = cart.products;

        if (!products || products.length == 0) { return cb([]) }
    }

    $.get('/api/v1/order/detailCart', {
        products: JSON.stringify(products)
    }, (data) => {
        return cb({
            products: data.products
        })
    });
}

function fetchCartPreview(products) {
    if (!products) { return }

    getProductsCart(products, (data) => {
        if (!Array.isArray(data.products)) { return }

        var blockCartPreview = $('.blockcart');

        var totalPricesHeader = $(blockCartPreview).find('div.header span.item_total');

        //set total items in header
        $(blockCartPreview).find('div.header span.item_count').text(data.products.length);
        $(blockCartPreview).find('div.header span.item_count').attr('data-total-items', data.products.length)

        var totalPricesContent = $(blockCartPreview).find('div.body div.price_content span.value');

        var itemContentElement = $(blockCartPreview).find('div.body ul');

        $(itemContentElement).find('li').remove();

        var totalPrices = 0;
        var items = ``;
        data.products.forEach((product, index) => {
            totalPrices += product.detail.price * product.quantity;
            items += `<li style="padding: 20px 0; border-bottom: 1px solid #ededed; overflow: hidden;" id="${product._id}">
                <div class="img_content">
                    <img class="product-image img-responsive" src="${product.images[0].url}" width=100px; alt="" title="" style="float: left; margin: 0 20px 0 0; position: relative;">
                    <span class="product-quantity" style="position: absolute; top: 5px; left: 5px; min-width: 25px; line-height: 23px; -webkit-border-radius: 100%; -moz-border-radius: 100%; border-radius: 100%; padding: 2px 0 0; text-align: center; background: #ff6d02; color: white; font-size: 16px;">x${product.quantity}</span>
                </div>
                <div class="right_block" style="overflow: hidden; position: relative; padding: 0 15px 0 0;">
                    <a href="/${product.alias}-${product._Id}"><span class="product-name" style="display: block; overflow: hidden; word-wrap: break-word; text-overflow: ellipsis; white-space: nowrap; color: #666666; text-transform: capitalize; font-size: 16px; line-height: 20px;">${product.name}</span></a>
                    <span class="product-price" style="display: block; margin: 10px 0 0; color: #ff6d02;">${numberWithCommas(product.detail.price) + " VNĐ"}</span>
                    <a class="remove-from-cart" rel="nofollow" href="javascript: void(0);" data-id-product="${product._id}" data-color-product="${product.detail.color.hex}" data-quantity="${product.quantity}" data-price="${product.detail.price}" title="Remove from cart" style="display: block; position: absolute; top: 0; right: 0; color: #777;">
                        <i class="fa-remove"></i>
                    </a>
                    <div class="attributes_content" style="display: block; font-size: 14px; line-height: 20px; color: #777; margin: 5px 0 0; ">
                        <span style="float: left;"><strong>Color</strong>:<div style="background-color: ${product.detail.color.hex}; border-radius: 50%; width: 20px; height: 20px; display: inline-block; border-width: 1px; border-style: solid; border-color: grey; margin-left: 5px ;position: absolute;" title="Cosmos"></div>
                        </span><br>
                    </div>
                </div>
            </li> `
        });

        $(itemContentElement).append(items);

        //set total price in header

        $(totalPricesHeader).text(numberWithCommas(totalPrices) + " VNĐ");
        $(totalPricesHeader).attr('data-raw-price', totalPrices)

        //set total price in popup preview cart
        $(totalPricesContent).text(numberWithCommas(totalPrices) + " VNĐ");
        $(totalPricesContent).attr('data-raw-price', totalPrices)
    });
}

function fetchCartPreview() {
    getProductsCart(null, (data) => {

        var totalPrices = 0;

        var blockCartPreview = $('.blockcart');

        var totalPricesHeader = $(blockCartPreview).find('div.header span.item_total');

        var totalPricesContent = $(blockCartPreview).find('div.body div.price_content span.value');

        var itemContentElement = $(blockCartPreview).find('div.body ul');

        $(itemContentElement).find('li').remove();

        if (!Array.isArray(data.products)) {
            //set total items in header
            $(blockCartPreview).find('div.header span.item_count').text(0);
            $(blockCartPreview).find('div.header span.item_count').attr('data-total-items', 0)
        } else {
            var items = ``;
            data.products.forEach((product, index) => {
                totalPrices += product.detail.price * product.quantity;
                items += `<li style="padding: 20px 0; border-bottom: 1px solid #ededed; overflow: hidden;" id="${product._id}">
                    <div class="img_content">
                        <img class="product-image img-responsive" src="${product.images[0].url}" width=100px; alt="" title="" style="float: left; margin: 0 20px 0 0; position: relative;">
                        <span class="product-quantity" style="position: absolute; top: 5px; left: 5px; min-width: 25px; line-height: 23px; -webkit-border-radius: 100%; -moz-border-radius: 100%; border-radius: 100%; padding: 2px 0 0; text-align: center; background: #ff6d02; color: white; font-size: 16px;">x${product.quantity}</span>
                    </div>
                    <div class="right_block" style="overflow: hidden; position: relative; padding: 0 15px 0 0;">
                        <a href="/${product.alias}-${product._id}"><span class="product-name" style="display: block; overflow: hidden; word-wrap: break-word; text-overflow: ellipsis; white-space: nowrap; color: #666666; text-transform: capitalize; font-size: 16px; line-height: 20px;">${product.name}</span></a>
                        <span class="product-price" style="display: block; margin: 10px 0 0; color: #ff6d02;">${numberWithCommas(product.detail.price) + " VNĐ"}</span>
                        <a class="remove-from-cart" rel="nofollow" href="javascript: void(0);" data-id-product="${product._id}" data-color-product="${product.detail.color.hex}" data-quantity="${product.quantity}" data-price="${product.detail.price}" title="Remove from cart" style="display: block; position: absolute; top: 0; right: 0; color: #777;">
                            <i class="fa-remove"></i>
                        </a>
                        <div class="attributes_content" style="display: block; font-size: 14px; line-height: 20px; color: #777; margin: 5px 0 0; ">
                            <span style="float: left;"><strong>Màu</strong>:<div style="background-color: ${product.detail.color.hex}; border-radius: 50%; width: 20px; height: 20px; display: inline-block; border-width: 1px; border-style: solid; border-color: grey; margin-left: 5px ;position: absolute;" title="Cosmos"></div>
                            </span><br>
                        </div>
                    </div>
                </li> `
            });

            $(itemContentElement).append(items);

            //set total items in header
            $(blockCartPreview).find('div.header span.item_count').text(data.products.length);
            $(blockCartPreview).find('div.header span.item_count').attr('data-total-items', data.products.length)
        }

        //set total price in header
        $(totalPricesHeader).text(numberWithCommas(totalPrices) + " VNĐ");
        $(totalPricesHeader).attr('data-raw-price', totalPrices)

        //set total price in popup preview cart
        $(totalPricesContent).text(numberWithCommas(totalPrices) + " VNĐ");
        $(totalPricesContent).attr('data-raw-price', totalPrices)
    });
}

//remove item in cart preview
jQuery(document).ready(($) => {
    $('.blockcart').delegate('a.remove-from-cart', 'click', (e) => {
        e.preventDefault();

        var blockCart = $('.blockcart');
        var id = $(e.currentTarget).attr('data-id-product');
        var color = $(e.currentTarget).attr('data-color-product');
        var quantity = $(e.currentTarget).attr('data-quantity');
        var price = $(e.currentTarget).attr('data-price');

        if (removeFromCart(id, color)) {
            //adjust html
            var totalPricesHeader = $(blockCart).find('div.header span.item_total');
            var totalPricesContent = $(blockCart).find('div.body div.price_content span.value');

            var totalItems = $(blockCart).find('div.header span.item_count').attr('data-total-items') - 1;
            var totalPrices = $(totalPricesHeader).attr('data-raw-price') - (price * quantity);

            //set total items in header
            $(blockCart).find('div.header span.item_count').text(totalItems);
            $(blockCart).find('div.header span.item_count').attr('data-total-items', totalItems)

            //set total price in popup preview cart
            $(totalPricesHeader).text(numberWithCommas(totalPrices) + " VNĐ");
            $(totalPricesHeader).attr('data-raw-price', totalPrices)
            $(totalPricesContent).text(numberWithCommas(totalPrices) + " VNĐ");
            $(totalPricesContent).attr('data-raw-price', totalPrices)

            $(blockCart).find(`li#${id}`).remove();

            getProductsCartCheckOut();
        }
    });
});

function getProductsCartCheckOut() {
    getProductsCart(null, (data) => {
        var items = '<ul class="cart-items">';

        var products = data.products;

        var cartOverView = $('#main div.cart-overview');
        $(cartOverView).find('li').remove();
        var cartSummary = $('#main div.cart-summary');

        if (!Array.isArray(products) || products.length == 0) {
            $(cartOverView).append(`<span class="no-items" style="text-align: center;">Không có sản phẩm nào trong giỏ hàng</span>`);
            $('#main').find('button').addClass('disabled')
            $('.cart-summary').find('div#cart-subtotal-products span.js-subtotal').attr('data-total-quantity', 0);
            $('.cart-summary').find('div#cart-subtotal-products span.js-subtotal').text(0 + " sản phẩm");
            $('.cart-summary').find('div#cart-subtotal-products span.value').text(0 + " VNĐ")
            $('.cart-summary').find('div#cart-subtotal-products span.value').attr('data-raw-price', 0)
            $('.cart-summary').find('div.cart-total span.value').attr('data-total-raw-price', 0);
            $('.cart-summary').find('div.cart-total span.value').text(0 + " VNĐ")
            return
        }

        var totalPrices = 0;

        products.forEach(product => {
            totalPrices += product.quantity * product.detail.price
            items += `
                <li class="cart-item" data-id-product="${product._id}">
                    <div class="product-line-grid">
                            <!--  product left content: image-->
                        <div class="product-line-grid-left col-md-3 col-xs-4">
                            <span class="product-image media-middle">
                                <img src="${product.images[0].url}" alt="${product.images[0].alt}">
                            </span>
                        </div>
                            <!--  product left body: description -->
                        <div class="product-line-grid-body col-md-4 col-xs-8">
                            <div class="product-line-info">
                                <a class="label" href="/${product.alias}-${product._id}" data-id_customization="0">${product.name}</a>
                            </div>
                            <div class="product-line-info product-price h6 has-discount" style="margin: 5px 0px 5px 0px;">
                                <div class="current-price">
                                    <span class="price" style="font-size: 25px;">${numberWithCommas(product.detail.price) + " VNĐ"}</span>
                                </div>
                            </div>
                            <br>
                            <div class="product-line-info">
                                <span class="label">Màu:</span>
                                <div style="background-color: ${product.detail.color.hex}; border-radius: 50%; width: 20px; height: 20px; display: inline-block; border-width: 1px; border-style: solid; border-color: grey; margin-left: 5px ;position: absolute;" title="Cosmos"></div>
                            </div>
                        </div>
                        <!--  product left body: description -->
                        <div class="product-line-grid-right product-line-actions col-md-5 col-xs-12">
                            <div class="row">
                                <div class="col-xs-4 hidden-md-up"></div>
                                <div class="col-md-10 col-xs-6">
                                    <div class="row">
                                        <div class="col-md-6 col-xs-6 qty">
                                            <input type="text" name="qty" id="${product._id}" value="${product.quantity}" class="input-group product-quantity" min="1" max="${product.detail.quantity}" data-color-product="${product.detail.color.hex}" data-price-product="${product.detail.price}" aria-label="Quantity">
                                        </div>
                                        <div class="col-md-6 col-xs-2 price">
                                            <span class="product-price" style="line-height: 25px; font-size: 16px;">
                                                <strong data-raw-price="${product.quantity * product.detail.price}">
                                                        ${numberWithCommas(product.quantity * product.detail.price) + " VNĐ"}
                                                </strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2 col-xs-2 text-xs-right">
                                    <div class="cart-line-product-actions">
                                        <a class="remove-from-cart" href="javascript: void(0)" data-id-product="${product._id}" data-color-product="${product.detail.color.hex}" data-raw-price="${product.detail.price}">
                                            <i class="material-icons float-xs-left">delete</i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </li>
            `
        });

        items += '</ul>'

        $(cartOverView).append(items);

        //sub total prices
        $(cartSummary).find('div#cart-subtotal-products span.value').text(numberWithCommas(totalPrices) + " VNĐ");
        $(cartSummary).find('div#cart-subtotal-products span.value').attr('data-raw-price', totalPrices);

        //total prices            
        $(cartSummary).find('div.cart-total span.value').text(numberWithCommas(totalPrices) + " VNĐ");
        $(cartSummary).find('div.cart-total span.value').attr('data-total-raw-price', totalPrices);

        //total item            
        $(cartSummary).find('div#cart-subtotal-products span.js-subtotal').text(products.length + " sản phẩm");
        $(cartSummary).find('div#cart-subtotal-products span.js-subtotal').attr('data-total-quantity', products.length);

        //init touchSpin
        products.forEach(product => {
            $(`input[id=${product._id}]`).TouchSpin({
                verticalbuttons: true,
                verticalupclass: "material-icons touchspin-up",
                verticaldownclass: "material-icons touchspin-down",
                buttondown_class: "btn btn-touchspin js-touchspin",
                buttonup_class: "btn btn-touchspin js-touchspin",
                min: 1,
                max: product.detail.quantity
            });

            $(`input[id=${product._id}]`).on("change", (e) => {
                var quantity_max = $(e.currentTarget).attr('max');
                //selector
                var totalPriceElement = $(e.currentTarget.parentElement.parentElement.parentElement).find('span.product-price strong');
                var subTotalPriceElement = $('#main div.cart-summary').find('div#cart-subtotal-products span.value');
                var totalPricesElement = $('#main div.cart-summary').find('div.cart-total span.value')


                //variable
                var totalPrice = $(totalPriceElement).attr('data-raw-price');
                var quantity = $(e.currentTarget).val();
                var color = $(e.currentTarget).attr('data-color-product');
                var price = $(e.currentTarget).attr('data-price-product');
                
                var totalPrices = 0;

                //adjust total price
                $(totalPriceElement).attr('data-raw-price', quantity * price);
                $(totalPriceElement).text(numberWithCommas(quantity * price) + " VNĐ");


                $(cartOverView).find('ul.cart-items li').each((index, element)  => {
                    totalPrices += Number.parseInt($(element).find('span.product-price strong').attr('data-raw-price'));
                });

                //sub total prices
                $(subTotalPriceElement).text(numberWithCommas(totalPrices) + " VNĐ");
                $(subTotalPriceElement).attr('data-raw-price', totalPrices);

                //total prices            
                $(totalPricesElement).text(numberWithCommas(totalPrices) + " VNĐ");
                $(totalPricesElement).attr('data-total-raw-price', totalPrices);

                updateQuantityItemsInCart(product._id, color, quantity)
            });
        });
    });
}

(function () {
    getProductsCart(null, (data) => {
        if (!Array.isArray(data.products)) { return }

        var blockCartPreview = $('.blockcart');

        var totalPricesHeader = $(blockCartPreview).find('div.header span.item_total');

        //set total items in header
        $(blockCartPreview).find('div.header span.item_count').text(data.products.length);
        $(blockCartPreview).find('div.header span.item_count').attr('data-total-items', data.products.length)

        var totalPricesContent = $(blockCartPreview).find('div.body div.price_content span.value');

        var itemContentElement = $(blockCartPreview).find('div.body ul');

        $(itemContentElement).find('li').remove();

        var totalPrices = 0;
        var items = ``;
        data.products.forEach((product, index) => {
            totalPrices += product.detail.price * product.quantity;
            items += `<li style="padding: 20px 0; border-bottom: 1px solid #ededed; overflow: hidden;" id="${product._id}">
                <div class="img_content">
                    <img class="product-image img-responsive" src="${product.images[0].url}" width=100px; alt="" title="" style="float: left; margin: 0 20px 0 0; position: relative;">
                    <span class="product-quantity" style="position: absolute; top: 5px; left: 5px; min-width: 25px; line-height: 23px; -webkit-border-radius: 100%; -moz-border-radius: 100%; border-radius: 100%; padding: 2px 0 0; text-align: center; background: #ff6d02; color: white; font-size: 16px;">x${product.quantity}</span>
                </div>
                <div class="right_block" style="overflow: hidden; position: relative; padding: 0 15px 0 0;">
                    <a href="/${product.alias}-${product._id}"><span class="product-name" style="display: block; overflow: hidden; word-wrap: break-word; text-overflow: ellipsis; white-space: nowrap; color: #666666; text-transform: capitalize; font-size: 16px; line-height: 20px;">${product.name}</span></a>
                    <span class="product-price" style="display: block; margin: 10px 0 0; color: #ff6d02;">${numberWithCommas(product.detail.price) + " VNĐ"}</span>
                    <a class="remove-from-cart" rel="nofollow" href="javascript: void(0);" data-id-product="${product._id}" data-color-product="${product.detail.color.hex}" data-quantity="${product.quantity}" data-price="${product.detail.price}" title="Remove from cart" style="display: block; position: absolute; top: 0; right: 0; color: #777;">
                        <i class="fa-remove"></i>
                    </a>
                    <div class="attributes_content" style="display: block; font-size: 14px; line-height: 20px; color: #777; margin: 5px 0 0; ">
                        <span style="float: left;"><strong>Màu</strong>:<div style="background-color: ${product.detail.color.hex}; border-radius: 50%; width: 20px; height: 20px; display: inline-block; border-width: 1px; border-style: solid; border-color: grey; margin-left: 5px ;position: absolute;" title="Cosmos"></div>
                        </span><br>
                    </div>
                </div>
            </li> `
        });

        $(itemContentElement).append(items);

        //set total price in header

        $(totalPricesHeader).text(numberWithCommas(totalPrices) + " VNĐ");
        $(totalPricesHeader).attr('data-raw-price', totalPrices)

        //set total price in popup preview cart
        $(totalPricesContent).text(numberWithCommas(totalPrices) + " VNĐ");
        $(totalPricesContent).attr('data-raw-price', totalPrices)
    });
})();
