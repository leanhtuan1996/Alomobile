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
        method: "PUT",
        success: (data) => {
            window.location.reload();
        },
        error: (err) => {
            window.location.reload();
        }
    })
}

function checkAvailable(id, quantity, color, cb) {
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

function checkRemainingQuantity(id, color, remainingQuantity, orderingQuantity) {

}

function updateFromCart(id, color, quantity) {
    if (!localStorage.cart || localStorage.cart.length == 0) { return }
    var idx = localStorage.cart.findIndex(element => {
        return element.id = id && element.color == color
    });

    if (idx && idx > -1) {
        localStorage.cart[idx].quantity = quantity
    }
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

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function fetchCartPreview(products) {
    if (!products) { return }

    $.get('/api/v1/order/detailCart', {
        products: JSON.stringify(products)
    }, (data) => {
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
        }
    });
});

(function () {
    if (!localStorage.cart) { return }

    var cart;

    try {
        cart = JSON.parse(localStorage.cart);
    } catch (error) {
        return
    }

    var products = cart.products;

    if (!products || products.length == 0) { return }

    $.get('/api/v1/order/detailCart', {
        products: JSON.stringify(products)
    }, (data) => {
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
