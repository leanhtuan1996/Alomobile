$('.price').each((index, price) => {
    if ($(price).html().match(/^[0-9]{1,}$/g)) {
        $(price).html(numberWithCommas($(price).html() + " VNĐ"));
    }
});

$('#quickview-modal').delegate('.input-color', 'click', (e) => {
    $('#quickview-modal > div > div > div.modal-body > div > div.col-md-7.col-sm-7 > div.product-prices > div.product-price.h5 > div > span').text(numberWithCommas($(e.currentTarget).attr("data-price") + " VNĐ"))
       
    var element = $('#quickview-modal span#product-availability')

    if ($(e.currentTarget).attr('data-quantity') > 0) {
        $(element).html('<i class="material-icons product-available">done</i>Còn Hàng');
        $('#quickview-modal button.add-to-cart').removeClass('disabled')
        $("input[id='quantity_want_modal']").trigger("touchspin.updatesettings", {
            max: $(e.currentTarget).attr('data-quantity'),
            min: 1
        });
    } else {
        $(element).html('<i class="material-icons product-unavailable">clear</i>Tạm Thời Hết Hàng');
        $('#quickview-modal button.add-to-cart').addClass('disabled')
        $("input[id='quantity_want_modal']").trigger("touchspin.updatesettings", {
            min: 0,
            max: 0
        });
    }
});

function findColorsAvailable(element = 'input[class="input-color"]') {
    var inputs = $(element);
    if (inputs) {
       
        for (let i = 0; i < inputs.length; i++) {
            const element = inputs[i];
            var quantity = $(element).attr('data-quantity');
            if (quantity && quantity > 0) {
                $(element).prop('checked', true);
                $(element).trigger('click')
                return;
            }

            if (i == inputs.length - 1) {
                $(inputs[0]).trigger('click')
            }
        }
    }
}    

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

$(document).ready(function() {
    getSpecialProducts();
    getNewProducts();

    $('.owl-carousel').delegate('.quick-view-product', 'click', (e) => {
        var id = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement).attr('data-id-product');
        if (id.match(/^[a-zA-z0-9]{24}$/g)) {
            getPreviewProduct(id, (result) => {

                var product = result.product;
                if (!product) { return }
                
                var quickViewModal = `
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-5 col-sm-5">
                                        <div class="images-container">
                                            <div class="product-cover">
                                                <img class="js-qv-product-cover" src="${product.images[0].url}"
                                                    alt="${product.images[0].alt}" title="" style="width:100%;" itemprop="image">
                                                <div class="layer hidden-sm-down" data-toggle="modal" data-target="#product-modal">
                                                    <i class="material-icons zoom-in"></i>
                                                </div>
                                            </div>
                                            <div class="js-qv-mask mask pos_content">
                                                <div class="product-images js-qv-product-images owl-carousel owl-loaded owl-drag">
                                                    
                                    `
                                    product.images.forEach((image, index) => {
                                        if (index > 0) {
                                            quickViewModal+= `
                                                <div class="thumb-container">
                                                    <img class="owl-lazy thumb js-thumb " data-image-medium-src="${image.url}"
                                                        data-image-large-src="${image.url}"
                                                        src="${image.url}"
                                                        alt="" title="" width="100" itemprop="image">
                                                </div>
                                            `
                                        }
                                    });          

                                    quickViewModal+= `
                                                </div>
                                            </div>
                                        </div>
                                        <div class="arrows js-arrows" style="display: none;">
                                            <i class="material-icons arrow-up js-arrow-up"></i>
                                            <i class="material-icons arrow-down js-arrow-down"></i>
                                        </div>
                                    </div>
                                    <div class="col-md-7 col-sm-7">
                                        <h1 class="h1 namne_details">${product.name}</h1>
                                        <div class="product-prices">
                                            <div class="product-price h5 " itemprop="offers" itemscope="" itemtype="https://schema.org/Offer">
                                                <link itemprop="availability" href="https://schema.org/InStock">
                                                <meta itemprop="priceCurrency" content="USD">
                                                <div class="current-price">
                                                    <span itemprop="price" content="30.5">${numberWithCommas(product.details[0].price) + " VNĐ"}</span>
                                                </div>
                                            </div>
                                            <div class="tax-shipping-delivery-label">
                                            </div>
                                        </div>
                                        <div class="product-actions">
                                            <form id="add-to-cart-or-refresh">
                                                <input type="hidden" name="token" value="ab378079e5855a38465963bba8a75c1b">
                                                <input type="hidden" name="id_product" value="5" id="product_page_product_id">
                                                <input type="hidden" name="id_customization" value="0" id="product_customization_id">
                                                <div class="product-variants">
                                                    <div class="clearfix product-variants-item">
                                                        <span class="control-label">Màu sắc</span>
                                                        <ul id="group_3">`

                                    if (product.details && product.details.length > 0) {                       
                                        product.details.forEach(c => {
                                            quickViewModal+= `
                                                <li class="float-xs-left input-container">
                                                    <label>
                                                        <input class="input-color" type="radio" data-price="${c.price}" data-quantity="${c.quantity}"  name="group[3]" data-color="${c.color.hex}">
                                                        <span class="color" style="background-color: ${c.color.hex}">
                                                            <span class="sr-only">${c.color.name}</span>
                                                        </span>
                                                    </label>
                                                </li>
                                            `
                                        });  
                                    } 
                                    quickViewModal += `
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="product-add-to-cart">
                                                    <span class="control-label">Số lượng</span>
                                                    <div class="product-quantity clearfix">
                                                            <div class="qty">
                                                                <input type="text" name="qty" id="quantity_want_modal" value="1" class="input-group" min="1" aria-label="Quantity">
                                                            </div>
                                                            <div class="add">
                                                                    <input type="hidden" name="id_product" value="${product._id}" class="product_id">
                                                                <input type="hidden" name="name" class="product_name" value="${product.name}">
                                                                <input type="hidden" name="img" class="product_img" value="${product.images[0].url}"> 
                                                                <button class="btn btn-primary add-to-cart" data-button-action="add-to-cart" type="submit">
                                                                    <i class="material-icons shopping-cart">add</i> Thêm vào giỏ hàng
                                                                </button>
                                                            </div>
                                                        </div>
                                                    <span id="product-availability">
                                                            <i class="material-icons product-available">done</i>
                                                        Còn Hàng
                                                    </span>
                                                    <p class="product-minimal-quantity">
                                                    </p>
                                                </div>
                                                <input class="product-refresh" data-url-update="false" name="refresh" type="submit" value="Refresh" hidden="">
                                            </form>
                                        </div>
                                        <div id="block-reassurance">
                                            <ul>
                                                <li>
                                                    <div class="block-reassurance-item">
                                                        <img src="/static/img/ic_verified_user_black_36dp_1x.png" alt="Security policy (edit with Customer reassurance module)">
                                                        <span class="h6" style="font-weight: 400;">Cam kết hàng chính hãng, bảo hành 12 tháng</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="block-reassurance-item">
                                                        <img src="/static/img/ic_local_shipping_black_36dp_1x.png" alt="Delivery policy (edit with Customer reassurance module)">
                                                        <span class="h6" style="font-weight: 400;">Miễn phí giao hàng</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="block-reassurance-item">
                                                        <img src="/static/img/ic_swap_horiz_black_36dp_1x.png" alt="Return policy (edit with Customer reassurance module)">
                                                        <span class="h6" style="font-weight: 400;">1 đổi 1 trong 3 tháng</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <div class="social-sharing">
                                    <span>Share</span>
                                    <ul>
                                        <li>
                                            <a href="http://www.facebook.com/sharer.php?u=http://demo.posthemes.com/pos_fastbuy/layout2/en/electronics/5-printed-summer-dress.html"
                                                title="Share" target="_blank">
                                                <i class="fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com/intent/tweet?text=Printed Summer Dress http://demo.posthemes.com/pos_fastbuy/layout2/en/electronics/5-printed-summer-dress.html"
                                                title="Tweet" target="_blank">
                                                <i class="fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://plus.google.com/share?url=http://demo.posthemes.com/pos_fastbuy/layout2/en/electronics/5-printed-summer-dress.html"
                                                title="Google+" target="_blank">
                                                <i class="fa-googleplus"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="http://www.pinterest.com/pin/create/button/?media=http://demo.posthemes.com/pos_fastbuy/layout2/242/printed-summer-dress.jpg&amp;url=http://demo.posthemes.com/pos_fastbuy/layout2/en/electronics/5-printed-summer-dress.html"
                                                title="Pinterest" target="_blank">
                                                <i class="fa-pinterest"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>   
                    
                    <style type="text/css">
                        .product-quantity #quantity_want_modal {
                        color: #232323;
                        background-color: #fff;
                        height: 2.75rem;
                        padding: .175rem .5rem;
                        width: 3rem
                    }
                    </style>
                `
                $('#quickview-modal').find('.modal-dialog').remove();

                $('#quickview-modal').append(quickViewModal).attr('data-id-product', product._id);
                initPreviewProductsSlider();                
                
                $("#quantity_want_modal").TouchSpin({ 
                    verticalbuttons: true, 
                    verticalupclass: "material-icons touchspin-up", 
                    verticaldownclass: "material-icons touchspin-down", 
                    buttondown_class: "btn btn-touchspin js-touchspin", 
                    buttonup_class: "btn btn-touchspin js-touchspin", 
                    min: 1,
                    max: 100
                });

                findColorsAvailable('#quickview-modal input[class="input-color"]');      
                
                $("input[id='quantity_want_modal']").on("touchspin.on.startspin", (e) => {
                    var colorSelected = $("#quickview-modal").find('input[class="input-color"]:checked');

                    if (!colorSelected) { return }
                    
                    $("input[id='quantity_want_modal']").trigger("touchspin.updatesettings", {
                        max: $(colorSelected).attr('data-quantity')
                    });
                });
            });
            $("#quickview-modal").modal('show');
        }
        
    });

    $('.owl-carousel').delegate('.add-to-cart', 'click', (e) => {  

        e.preventDefault();

        if ($(e.currentTarget.parentElement).find('button.disabled').length != 0) { return }

        var id = $(e.currentTarget.parentElement).find('input.product_id').val();
        var name = $(e.currentTarget.parentElement).find('input.product_name').val();
        var image = $(e.currentTarget.parentElement).find('input.product_img').val();
        var color = $(e.currentTarget.parentElement).find('input.product_color').val();
        var price = $(e.currentTarget.parentElement).find('input.product_price').val();

        var item = {
            id: id,
            color: color,
            quantity: 1
        }

        checkAvailable(id, 1, color, (isAvailable) => {
            if (isAvailable) {
                if (addToCart(item)) {
                    var modal = $('#blockcart-modal');

                    $(modal).find('div.modal-dialog').remove();

                    //get all products in cart
                    var totalPrice = $('.cart-preview span.item_total').attr("data-raw-price");
                    var totalItems = $('.cart-preview span.item_txt span.item_count').attr('data-total-items');

                    var content = `
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <h4 class="modal-title h6 text-sm-center" id="myModalLabel">
                                        <i class="material-icons"></i>Thêm sản phẩm vào giỏ hàng thành công</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-5 divide-right">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <img class="product-image" src="${image}" alt="" title="" itemprop="image">
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 class="h6 product-name" style="overflow: hidden;">${name}</h6>
                                                    <p>${numberWithCommas(price) + " VNĐ"}</p>   
                                                    <ul style="list-style-type: none;
                                                        margin: 0;
                                                        padding: 0;
                                                        overflow: hidden;">
                                                        <li style="float: left;">
                                                            <strong class="product-color">Màu sắc</strong>
                                                        </li>
                                                        <li style="background-color: ${color}; border-radius: 50%; width: 20px; height: 20px; display: inline-block; border-width: 1px; border-style: solid; border-color: grey; float: left; margin-left: 5px"
                                                            title="Cosmos">
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="cart-content">
                                                <p class="cart-products-count">Có ${Number.parseInt(totalItems) + 1} trong giỏ hàng.</p>
                                                <p><strong>Tổng giá sản phẩm:</strong> ${numberWithCommas(Number.parseInt(totalPrice) + Number.parseInt(price))} VNĐ</p>
                                                <p><strong>Phí giao hàng:</strong>Miễn phí</p>
                                                <p><strong>Tổng cộng:</strong> ${numberWithCommas(Number.parseInt(totalPrice) + Number.parseInt(price))} VNĐ</p>
                                            </div>
                                            <div class="cart-content-btn">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Tiếp tục mua sắm</button>
                                                <a href="/gio-hang" class="btn btn-primary">
                                                    <i class="material-icons"></i>Xem giỏ hàng
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <style>     
                            .material-icons {
                                font-family: Material Icons;
                                font-weight: 400;
                                font-style: normal;
                                font-size: 20px;
                                display: inline-block;
                                vertical-align: middle;
                                width: 1em;
                                height: 1em;
                                line-height: 1;
                                text-transform: none;
                                letter-spacing: normal;
                                word-wrap: normal;
                                white-space: nowrap;
                                direction: ltr;
                                -webkit-font-smoothing: antialiased;
                                text-rendering: optimizeLegibility;
                            }

                            #blockcart-modal strong,
                            p {
                                color: #333;
                                font-size: 14px;
                                font-weight: 600;
                            }
                        </style>
                    `

                    $(modal).append(content);                
                    $(modal).modal('show')
                } else {
                    showNotification('Thêm sản phẩm vào giỏ hàng thất bại, có thể hết số lượng hoặc sản phẩm không sẵn có!')
                }
            } else {
                showNotification('Thêm sản phẩm vào giỏ hàng thất bại, có thể hết số lượng hoặc sản phẩm không sẵn có!')
            }
        });
    });

    $('#quickview-modal').delegate('.add-to-cart', 'click', (e) => {
        if ($(e.currentTarget.parentElement).find('button.disabled').length != 0) { return }

        var id = $(e.currentTarget.parentElement).find('input.product_id').val();
        var name = $(e.currentTarget.parentElement).find('input.product_name').val();
        var image = $(e.currentTarget.parentElement).find('input.product_img').val();

        var colorInput = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement).find('input[type="radio"]:checked');
        var quantity = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement).find('input[type="text"]').val();
        var price = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement).find('input[type="radio"]:checked').attr('data-price');
        var color = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement).find('input[type="radio"]:checked').attr('data-color');

        var item = {
            id: id,
            color: color,
            quantity: quantity
        }

        checkAvailable(id, quantity, color, (isAvailable) => {
            if (isAvailable) {
                if (addToCart(item)) {
                    var modal = $('#blockcart-modal');

                    $(modal).find('div.modal-dialog').remove();

                    //get all products in cart
                    var totalPrice = $('.cart-preview span.item_total').attr("data-raw-price");
                    var totalItems = $('.cart-preview span.item_txt span.item_count').attr('data-total-items');

                    var content = `
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                    <h4 class="modal-title h6 text-sm-center" id="myModalLabel">
                                        <i class="material-icons"></i>Thêm sản phẩm vào giỏ hàng thành công</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-5 divide-right">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <img class="product-image" src="${image}" alt="" title="" itemprop="image">
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 class="h6 product-name" style="overflow: hidden;">${name}</h6>
                                                    <p>${numberWithCommas(price) + " VNĐ"}</p>   
                                                    <ul style="list-style-type: none;
                                                        margin: 0;
                                                        padding: 0;
                                                        overflow: hidden;">
                                                        <li style="float: left;">
                                                            <strong class="product-color">Màu sắc</strong>
                                                        </li>
                                                        <li style="background-color: ${color}; border-radius: 50%; width: 20px; height: 20px; display: inline-block; border-width: 1px; border-style: solid; border-color: grey; float: left; margin-left: 5px"
                                                            title="Cosmos">
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="cart-content">
                                                <p class="cart-products-count">Có ${Number.parseInt(totalItems) + 1} trong giỏ hàng.</p>
                                                <p><strong>Tổng giá sản phẩm:</strong> ${numberWithCommas(Number.parseInt(totalPrice) + Number.parseInt(price))} VNĐ</p>
                                                <p><strong>Phí giao hàng:</strong>Miễn phí</p>
                                                <p><strong>Tổng cộng:</strong> ${numberWithCommas(Number.parseInt(totalPrice) + Number.parseInt(price))} VNĐ</p>
                                            </div>
                                            <div class="cart-content-btn">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Tiếp tục mua sắm</button>
                                                <a href="/gio-hang" class="btn btn-primary">
                                                    <i class="material-icons"></i>Xem giỏ hàng
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <style>     
                            .material-icons {
                                font-family: Material Icons;
                                font-weight: 400;
                                font-style: normal;
                                font-size: 20px;
                                display: inline-block;
                                vertical-align: middle;
                                width: 1em;
                                height: 1em;
                                line-height: 1;
                                text-transform: none;
                                letter-spacing: normal;
                                word-wrap: normal;
                                white-space: nowrap;
                                direction: ltr;
                                -webkit-font-smoothing: antialiased;
                                text-rendering: optimizeLegibility;
                            }

                            #blockcart-modal strong,
                            p {
                                color: #333;
                                font-size: 14px;
                                font-weight: 600;
                            }
                        </style>
                    `

                    $(modal).append(content);                
                    $(modal).modal('show')
                } else {
                    showNotification('Thêm sản phẩm vào giỏ hàng thất bại, có thể hết số lượng hoặc sản phẩm không sẵn có!')
                }
            } else {
                showNotification('Thêm sản phẩm vào giỏ hàng thất bại, có thể hết số lượng hoặc sản phẩm không sẵn có!')
            }
        });      
    });

    getAccessories((cb) => {
        if (cb.length > 0) {
            var items = ``;
            cb.forEach((product) => {

                var details = product.details.find(element => {
                    return element.quantity > 0
                });

                items += `
                <!-- ITEM -->
                    <div class="item-product">
                        <article class="js-product-miniature" data-id-product="${product._id}" itemscope itemtype="http://schema.org/Product">
                            <div class="img_block">
                                <a href="${product.alias}-${product._id}" class="thumbnail product-thumbnail">
                                    <img src = "${product.images[0].url}"
                                        alt = "${product.images[0].alt}"
                                        data-full-size-image-url = "${product.images[0].url}"
                                    >
                                    <img class="img-responsive second-image animation1" src="${product.images[1].url}" alt="" itemprop="image"  />
                                        
                                </a>
                                <ul class="product-flag">
                                    <!-- <li class="discount-percentage" style="top: 10px;">-15%</li> -->
                                    <li class="new">New</li>
                                </ul>
                            </div>
                            <div class="product_desc">
                                <div class="desc_info">
                                    <h4><a href="/${product.alias}-${product._id}" title="${product.name}" itemprop="name" class="product_name">${product.name}</a></h4>
                                    <div class="hook-reviews">
                                        <div class="comments_note" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
                                            <div class="star_content clearfix">`

                                            if (product.reviews && product.reviews.length > 0) {
                                                var totalStar = 0;
                                                var avg = 0;
                                                product.reviews.forEach(r => {
                                                    totalStar+= r.star;
                                                });
    
                                                avg = Math.round(totalStar / product.reviews.length);
    
                                                for (let i = 1; i <= 5; i++) {
                                                    if (i <= avg) {
                                                        items+= `<div class="star star_on"></div>`
                                                    } else {
                                                        items+= `<div class="star"></div>`
                                                    }                                      
                                                }
    
                                            } else {
                                                items+=`<div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>`
                                            }

                                            items+= `</div>
                                            <span class="nb-comments"><span itemprop="reviewCount">1</span> Review(s)</span>
                                        </div>
                                    </div>
                                    <div class="product-price-and-shipping">`
                                            if (details) {
                                        items+= `<span itemprop="price" class="price ">${numberWithCommas(details.price + " VNĐ")}</span>`
                                    } else {
                                        items+= `<span itemprop="price" class="price ">${numberWithCommas(product.details[0].price + " VNĐ")}</span>`
                                    }

                                items+= `  
                                        <span class="sr-only">Price</span>
                                    </div>
                                    <div class="variant-links">
                                        <a href="/${product.alias}-${product._id}" class="color" title="Orange" style="background-color: #F39C11"><span class="sr-only">Orange</span></a>
                                        <span class="js-count count"></span>
                                    </div>
                                </div>
                                <ul class="add-to-links">
                                    <li class="cart">
                                        <div class="product-add-to-cart">
                                            <form class="add-to-cart-or-refresh">
                                                <input type="hidden" name="id_product" value="${product._id}" class="product_id">
                                                <input type="hidden" name="name" class="product_name" value="${product.name}">
                                                <input type="hidden" name="img" class="product_img" value="${product.images[0].url}"> 
                                                `

                                            if (details) {
                                                items+= `<input type="hidden" name="color" class="product_color" value="${details.color.hex}">
                                                <input type="hidden" name="price" class="product_price" value="${details.price}">
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            } else {
                                                items+= `
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default disabled" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            }

                                            
                                       items+=` </form>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);" class="quick-view quick-view-product"  title="Quick view">Quick view</a>
                                    </li>
                                    <li>
                                        <a href="/${product.alias}-${product._id}" class="links-details" title="Xem chi tiết">Details</a>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>
                    <!-- /ITEM -->
                `
            });
            
            $("#accessoriesProduct").append(items);
        }
        initProductCate('listAccessoriesCateProduct')
    });

    getPhones((cb) => {
        if (cb.length > 0) {
            var items = ``;
            cb.forEach((product) => {

                var details = product.details.find(element => {
                    return element.quantity > 0
                });

                items += `
                <!-- ITEM -->
                    <div class="item-product">
                        <article class="js-product-miniature" data-id-product="${product._id}" itemscope itemtype="http://schema.org/Product">
                            <div class="img_block">
                                <a href="${product.alias}-${product._id}" class="thumbnail product-thumbnail">
                        <img src = "${product.images[0].url}"
                            alt = "${product.images[0].alt}"
                            data-full-size-image-url = "${product.images[0].url}"
                        >
                                                <img class="img-responsive second-image animation1" 
                                                src="${product.images[1].url}" 
                                alt="" itemprop="image"  />
                                
                        </a>
                                <ul class="product-flag">
                                    <li class="new">New</li>
                                </ul>
                            </div>
                            <div class="product_desc">
                                <div class="desc_info">
                                    <h4><a href="${product.alias}-${product._id}" title="${product.name}" itemprop="name" class="product_name">${product.name}</a></h4>
                                    <div class="hook-reviews">
                                        <div class="comments_note" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
                                            <div class="star_content clearfix">`

                                            if (product.reviews && product.reviews.length > 0) {
                                                var totalStar = 0;
                                                var avg = 0;
                                                product.reviews.forEach(r => {
                                                    totalStar+= r.star;
                                                });
    
                                                avg = Math.round(totalStar / product.reviews.length);
    
                                                for (let i = 1; i <= 5; i++) {
                                                    if (i <= avg) {
                                                        items+= `<div class="star star_on"></div>`
                                                    } else {
                                                        items+= `<div class="star"></div>`
                                                    }                                      
                                                }
    
                                            } else {
                                                items+=`<div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>`
                                            }

                                            items+= `</div>
                                            <span class="nb-comments"><span itemprop="reviewCount">1</span> Review(s)</span>
                                        </div>
                                    </div>
                                    <div class="product-price-and-shipping">`

                                        if (details) {
                                            items+= `<span itemprop="price" class="price ">${numberWithCommas(details.price + " VNĐ")}</span>`
                                        } else {
                                            items+= `<span itemprop="price" class="price ">${numberWithCommas(product.details[0].price + " VNĐ")}</span>`
                                        }

                                        items+= `   
                                        <span class="sr-only">Price</span>
                                    </div>
                                    <div class="variant-links">
                                        <a href="${product.alias}-${product._id}" class="color" title="Orange" style="background-color: #F39C11"><span class="sr-only">Orange</span></a>
                                        <span class="js-count count"></span>
                                    </div>
                                </div>
                                <ul class="add-to-links">
                                    <li class="cart">
                                        <div class="product-add-to-cart">
                                                <form class="add-to-cart-or-refresh">
                                                <input type="hidden" name="id_product" value="${product._id}" class="product_id">
                                                <input type="hidden" name="name" class="product_name" value="${product.name}">
                                                <input type="hidden" name="img" class="product_img" value="${product.images[0].url}"> 
                                                `

                                            if (details) {
                                                items+= `<input type="hidden" name="color" class="product_color" value="${details.color.hex}">
                                                <input type="hidden" name="price" class="product_price" value="${details.price}">
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            } else {
                                                items+= `
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default disabled" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            }

                                            
                                       items+=` </form>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);" class="quick-view quick-view-product"  title="Quick view">Quick view</a>
                                    </li>
                                    <li>
                                        <a href="${product.alias}-${product._id}" class="links-details" title="Xem chi tiết">Details</a>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>
                    <!-- /ITEM -->
                `
            });
            
            $("#phone_product").append(items);
        }
        initProductCate('listPhoneCateProduct')
    });

    getTablets((cb) => {
        if (cb.length > 0) {
            var items = ``;
            cb.forEach((product) => {
                var details = product.details.find(element => {
                    return element.quantity > 0
                });
                items += `
                <!-- ITEM -->
                    <div class="item-product">
                        <article class="js-product-miniature" data-id-product="${product._id}" itemscope itemtype="http://schema.org/Product">
                            <div class="img_block">
                                <a href="${product.alias}-${product._id}" class="thumbnail product-thumbnail">
                        <img src = "${product.images[0].url}"
                            alt = "${product.images[0].alt}"
                            data-full-size-image-url = "${product.images[0].url}"
                        >
                                                <img class="img-responsive second-image animation1" 
                                                src="${product.images[1].url}" 
                                alt="" itemprop="image"  />
                                
                        </a>
                                <ul class="product-flag">
                                    <li class="new">New</li>
                                </ul>
                            </div>
                            <div class="product_desc">
                                <div class="desc_info">
                                    <h4><a href="${product.alias}-${product._id}" title="${product.name}" itemprop="name" class="product_name">${product.name}</a></h4>
                                    <div class="hook-reviews">
                                        <div class="comments_note" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
                                            <div class="star_content clearfix">`

                                            if (product.reviews && product.reviews.length > 0) {
                                                var totalStar = 0;
                                                var avg = 0;
                                                product.reviews.forEach(r => {
                                                    totalStar+= r.star;
                                                });
    
                                                avg = Math.round(totalStar / product.reviews.length);
    
                                                for (let i = 1; i <= 5; i++) {
                                                    if (i <= avg) {
                                                        items+= `<div class="star star_on"></div>`
                                                    } else {
                                                        items+= `<div class="star"></div>`
                                                    }                                      
                                                }
    
                                            } else {
                                                items+=`<div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>`
                                            }

                                            items+= `</div>
                                            <span class="nb-comments"><span itemprop="reviewCount">1</span> Review(s)</span>
                                        </div>
                                    </div>
                                    <div class="product-price-and-shipping">`

                                    if (details) {
                                        items+= `<span itemprop="price" class="price ">${numberWithCommas(details.price + " VNĐ")}</span>`
                                    } else {
                                        items+= `<span itemprop="price" class="price ">${numberWithCommas(product.details[0].price + " VNĐ")}</span>`
                                    }

                                    items+= `   
                                    <span class="sr-only">Price</span>
                                    </div>
                                    <div class="variant-links">
                                        <a href="${product.alias}-${product._id}" class="color" title="Orange" style="background-color: #F39C11"><span class="sr-only">Orange</span></a>
                                        <span class="js-count count"></span>
                                    </div>
                                </div>
                                <ul class="add-to-links">
                                    <li class="cart">
                                            <div class="product-add-to-cart">
                                                <form class="add-to-cart-or-refresh">
                                                <input type="hidden" name="id_product" value="${product._id}" class="product_id">
                                                <input type="hidden" name="name" class="product_name" value="${product.name}">
                                                <input type="hidden" name="img" class="product_img" value="${product.images[0].url}"> 
                                                `

                                            if (details) {
                                                items+= `<input type="hidden" name="color" class="product_color" value="${details.color.hex}">
                                                <input type="hidden" name="price" class="product_price" value="${details.price}">
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            } else {
                                                items+= `
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default disabled" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            }

                                            
                                       items+=` </form>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);" class="quick-view quick-view-product"  title="Quick view">Quick view</a>
                                    </li>
                                    <li>
                                        <a href="${product.alias}-${product._id}" class="links-details" title="Xem chi tiết">Details</a>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>
                    <!-- /ITEM -->
                `
            });
            
            $("#tablet_product").append(items);
        }
        initProductCate('listTabletCateProduct')
    });

    getLaptops((cb) => {
        if (cb.length > 0) {
            var items = ``;
            cb.forEach((product) => {
                var details = product.details.find(element => {
                    return element.quantity > 0
                });
                items += `
                <!-- ITEM -->
                    <div class="item-product">
                        <article class="js-product-miniature" data-id-product="${product._id}" itemscope itemtype="http://schema.org/Product">
                            <div class="img_block">
                                <a href="${product.alias}-${product._id}" class="thumbnail product-thumbnail">
                        <img src = "${product.images[0].url}"
                            alt = "${product.images[0].alt}"
                            data-full-size-image-url = "${product.images[0].url}"
                        >
                                                <img class="img-responsive second-image animation1" 
                                                src="${product.images[1].url}" 
                                alt="" itemprop="image"  />
                                
                        </a>
                                <ul class="product-flag">
                                    <li class="new">New</li>
                                </ul>
                            </div>
                            <div class="product_desc">
                                <div class="desc_info">
                                    <h4><a href="${product.alias}-${product._id}" title="${product.name}" itemprop="name" class="product_name">${product.name}</a></h4>
                                    <div class="hook-reviews">
                                        <div class="comments_note" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
                                            <div class="star_content clearfix">`
                                                

                                            if (product.reviews && product.reviews.length > 0) {
                                                var totalStar = 0;
                                                var avg = 0;
                                                product.reviews.forEach(r => {
                                                    totalStar+= r.star;
                                                });
    
                                                avg = Math.round(totalStar / product.reviews.length);
    
                                                for (let i = 1; i <= 5; i++) {
                                                    if (i <= avg) {
                                                        items+= `<div class="star star_on"></div>`
                                                    } else {
                                                        items+= `<div class="star"></div>`
                                                    }                                      
                                                }
    
                                            } else {
                                                items+=`<div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>
                                                <div class="star star_on"></div>`
                                            }

                                            items+= `</div>
                                            <span class="nb-comments"><span itemprop="reviewCount">1</span> Review(s)</span>
                                        </div>
                                    </div>
                                    <div class="product-price-and-shipping">`

                                    if (details) {
                                        items+= `<span itemprop="price" class="price ">${numberWithCommas(details.price + " VNĐ")}</span>`
                                    } else {
                                        items+= `<span itemprop="price" class="price ">${numberWithCommas(product.details[0].price + " VNĐ")}</span>`
                                    }

                                    items+= `   
                                    <span class="sr-only">Price</span>
                                    </div>
                                    <div class="variant-links">
                                        <a href="${product.alias}-${product._id}" class="color" title="Orange" style="background-color: #F39C11"><span class="sr-only">Orange</span></a>
                                        <span class="js-count count"></span>
                                    </div>
                                </div>
                                <ul class="add-to-links">
                                    <li class="cart">
                                            <div class="product-add-to-cart">
                                                <form class="add-to-cart-or-refresh">
                                                <input type="hidden" name="id_product" value="${product._id}" class="product_id">
                                                <input type="hidden" name="name" class="product_name" value="${product.name}">
                                                <input type="hidden" name="img" class="product_img" value="${product.images[0].url}"> 
                                                `

                                            if (details) {
                                                items+= `<input type="hidden" name="color" class="product_color" value="${details.color.hex}">
                                                <input type="hidden" name="price" class="product_price" value="${details.price}">
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            } else {
                                                items+= `
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default disabled" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            }

                                            
                                       items+=` </form>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);" class="quick-view quick-view-product"  title="Quick view">Quick view</a>
                                    </li>
                                    <li>
                                        <a href="${product.alias}-${product._id}" class="links-details" title="Xem chi tiết">Details</a>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>
                    <!-- /ITEM -->
                `
            });
            
            $("#laptop_product").append(items);
        }
        initProductCate('listLaptopCateProduct')
    });
});

function getSpecialProducts() {
    $.get('/api/v1/product/get-special-products', (data) => {
        var products = data.products;
        if (products && products.length > 0) {

            var items = ``;
          
            products.forEach((product) => {
                
                var image1 = product.images[0];
                var image2 = product.images[1]; 
                var name = product.name;
                var href = `${product.alias}-${product._id}`

                var details = product.details.find(element => {
                    return element.quantity > 0
                });


                items+= `

                <div class="item-product">                                            
                    <article class="js-product-miniature" data-id-product="${product._id}" itemscope>
                        <div class="img_block">
                            <a href="${href}" class="thumbnail product-thumbnail">
                                <img src = "${image1.url}" alt = "${image1.alt}" data-full-size-image-url = "${image1.url}" />
                                <img class="img-responsive second-image animation1" src="${image2.url}" alt="" itemprop="image"  />
                            </a>
                            <ul class="product-flag">
                                <!-- <li class="discount-percentage">-10%</li> -->
                                <li class="discount">Reduced price</li>
                                <li class="new">New</li>
                            </ul>
                        </div>
                        <div class="product_desc">
                            <div class="desc_info">
                                <h4><a href="${href}" title="Printed Dress" itemprop="name" class="product_name">${name}</a></h4>
                                <div class="hook-reviews">
                                    <div itemtype="http://schema.org/AggregateRating" itemscope="" itemprop="aggregateRating" class="comments_note">
                                        <div class="star_content clearfix">`


                                        if (product.reviews && product.reviews.length > 0) {
                                            var totalStar = 0;
                                            var avg = 0;
                                            product.reviews.forEach(r => {
                                                totalStar+= r.star;
                                            });

                                            avg = Math.round(totalStar / product.reviews.length);

                                            for (let i = 1; i <= 5; i++) {
                                                if (i <= avg) {
                                                    items+= `<div class="star star_on"></div>`
                                                } else {
                                                    items+= `<div class="star"></div>`
                                                }                                      
                                            }

                                        } else {
                                            items+=`<div class="star star_on"></div>
                                            <div class="star star_on"></div>
                                            <div class="star star_on"></div>
                                            <div class="star star_on"></div>
                                            <div class="star star_on"></div>`
                                        }
                                        


                                        items +=`</div>
                                    </div>
                                </div>
                                <div class="product-price-and-shipping">`

                                if (details) {
                                    items+= `<span itemprop="price" class="price ">${numberWithCommas(details.price + " VNĐ")}</span>`
                                } else {
                                    items+= `<span itemprop="price" class="price ">${numberWithCommas(product.details[0].price + " VNĐ")}</span>`
                                }

                                items+= `   
                                <span class="sr-only">Price</span>
                                </div>
                                <div class="product-desc" itemprop="description">
                                    <p>100% cotton double printed dress. Black and white striped top and orange high waisted skater skirt bottom.</p>
                                </div>
                                <div class="variant-links">
                                    <a href="${href}" class="color" title="Orange" style="background-color: #F39C11"><span class="sr-only">Orange</span></a>
                                    <span class="js-count count"></span>
                                </div>
                            </div>
                            <ul class="add-to-links">
                                <li class="cart">
                                        <div class="product-add-to-cart">
                                                <form class="add-to-cart-or-refresh">
                                                <input type="hidden" name="id_product" value="${product._id}" class="product_id">
                                                <input type="hidden" name="name" class="product_name" value="${product.name}">
                                                <input type="hidden" name="img" class="product_img" value="${product.images[0].url}"> 
                                                `

                                            if (details) {
                                                items+= `<input type="hidden" name="color" class="product_color" value="${details.color.hex}">
                                                <input type="hidden" name="price" class="product_price" value="${details.price}">
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            } else {
                                                items+= `
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default disabled" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            }

                                            
                                       items+=` </form>
                                        </div>
                                </li>
                                <li>
                                    <a href="javascript: void(0);" class="quick-view quick-view-product"  title="Quick view">Quick view</a>
                                </li>
                                <li>
                                    <a href="${href}" class="links-details" title="${name}">Details</a>
                                </li>
                            </ul>
                        </div>
                    </article>
                </div>
                `
            });     
            
            $("#special-product-block").append(items);

            initSpecialProductSlider();

        } else {
            initSpecialProductSlider();
        }
    });
}

function getNewProducts() {
    $.get('/api/v1/product/get-new-products', (data) => {
        var products = data.products;
        if (products && products.length > 0) {

            
            var items = ``;
            products.forEach((product) => { 

                 var details = product.details.find(element => {
                    return element.quantity > 0
                });


                items+= `
                <div class="item-product">
                    <article class="js-product-miniature" data-id-product="${product._id}" itemscope itemtype="http://schema.org/Product">
                        <div class="img_block">
                            <a href="/${product.alias}-${product._id}" class="thumbnail product-thumbnail">
                                <img class="owl-lazy"
                                    src = "${product.images[0].url}"
                                    alt = "${product.images[0].alt}"
                                    data-full-size-image-url = "${product.images[0].url}"
                                >
                                <img class="img-responsive second-image animation1" 
                                    src="${product.images[1].url}" 
                                    alt="${product.images[1].alt}" itemprop="image"  />
                                        
                            </a>
                            <ul class="product-flag">
                                <li class=" new">New</li>
                            </ul>
                        </div>
                        <div class="product_desc">
                            <div class="desc_info">
                                <h4><a href="/${product.alias}-${product._id}" title="Printed Summer Dress" itemprop="name" class="product_name">${product.name}</a></h4>
                                <div class="hook-reviews">
                                    <div itemtype="http://schema.org/AggregateRating" itemscope="" itemprop="aggregateRating" class="comments_note">
                                        <div class="star_content clearfix">`

                                        if (product.reviews && product.reviews.length > 0) {
                                            var totalStar = 0;
                                            var avg = 0;
                                            product.reviews.forEach(r => {
                                                totalStar+= r.star;
                                            });

                                            avg = Math.round(totalStar / product.reviews.length);

                                            for (let i = 1; i <= 5; i++) {
                                                if (i <= avg) {
                                                    items+= `<div class="star star_on"></div>`
                                                } else {
                                                    items+= `<div class="star"></div>`
                                                }                                      
                                            }

                                        } else {
                                            items+=`<div class="star star_on"></div>
                                            <div class="star star_on"></div>
                                            <div class="star star_on"></div>
                                            <div class="star star_on"></div>
                                            <div class="star star_on"></div>`
                                        }

                                        items+= `</div>
                                    </div>
                                </div>
                                <div class="product-price-and-shipping">`

                                    if (details) {
                                        items+= `<span itemprop="price" class="price ">${numberWithCommas(details.price + " VNĐ")}</span>`
                                    } else {
                                        items+= `<span itemprop="price" class="price ">${numberWithCommas(product.details[0].price + " VNĐ")}</span>`
                                    }

                                    items+= `   
                                    <span class="sr-only">Price</span>
                                    </div>
                                <div class="variant-links">
                                    <a href="/${product.alias}-${product._id}" class="color" title="Black" style="background-color: #434A54"><span class="sr-only">Black</span></a>
                                    <span class="js-count count"></span>
                                </div>
                            </div>
                            <ul class="add-to-links">
                                <li class="cart">
                                        <div class="product-add-to-cart">
                                                <form class="add-to-cart-or-refresh">
                                                <input type="hidden" name="id_product" value="${product._id}" class="product_id">
                                                <input type="hidden" name="name" class="product_name" value="${product.name}">
                                                <input type="hidden" name="img" class="product_img" value="${product.images[0].url}"> 
                                                `

                                            if (details) {
                                                items+= `<input type="hidden" name="color" class="product_color" value="${details.color.hex}">
                                                <input type="hidden" name="price" class="product_price" value="${details.price}">
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            } else {
                                                items+= `
                                            <button class="button ajax_add_to_cart_button add-to-cart btn-default disabled" data-button-action="add-to-cart" type="submit">
                                                Thêm vào giỏ hàng
                                            </button>`
                                            }

                                            
                                       items+=` </form>
                                        </div>
                                </li>
                                <li>
                                    <a href="javascript: void(0);" class="quick-view quick-view-product" title="Quick view">Quick view</a>
                                </li>
                                <li>
                                    <a href="/${product.alias}-${product._id}" class="links-details" title="Details">Details</a>
                                </li>
                            </ul>
                        </div>
                    </article>
                </div>
                `
            });

            $("#new_product").append(items);

            initNewProductsSlider();

        } else {
            initNewProductsSlider();
        }
    })
}

function getPreviewProduct(id, cb) {
    $.get('/api/v1/product/get-preview', {
        id: id
    }, (data) => {
        return cb(data);
    });
}

function getPhones(cb) {
    $.get('/api/v1/product/get-products-by-type?id=5a9e3f620d9bb43e1c54ed15', (data) => {
        return cb(data.products || []);
    });
}

function getTablets(cb) {
    $.get('/api/v1/product/get-products-by-type?id=5aa13e840d9bb43e1c55cc2d', (data) => {
        return cb(data.products || []);
    });
}

function getLaptops(cb) {
    $.get('/api/v1/product/get-products-by-type?id=5a9e3f8a0d9bb43e1c54ed29', (data) => {
        return cb(data.products || []);
    });
}

function getAccessories(cb) {
    var products = [];
    $.get('/api/v1/product/get-products-by-category', {
        idCategory: "5aa21d5a45013078dfe92cb5",
        idRootCategory: "5aa21d5a45013078dfe92cb5",
        limit: 5
    }, (d1) => {
        if (d1.products && d1.products.length > 0) {
            d1.products.forEach(p => {
                products.push(p);
            });
        }
        $.get('/api/v1/product/get-products-by-category', {
            idCategory: "5aa21ce145013078dfe92cad",
            idRootCategory: "5aa21ce145013078dfe92cad",
            limit: 5
            }, (d2) => {
                if (d2.products && d2.products.length > 0) {
                    d2.products.forEach(p => {
                        products.push(p);
                    });
                }
                $.get('/api/v1/product/get-products-by-category', {
                    idCategory: "5aa21dc445013078dfe92cbc",
                    idRootCategory: "5aa21dc445013078dfe92cbc",
                    limit: 5
                    }, (d3) => {
                        if (d3.products && d3.products.length > 0) {
                            d3.products.forEach(p => {
                                products.push(p);
                            });
                        }
                        return cb(products);
                });
        });
    });
}

function initSpecialProductSlider() {
    var $featuredSlideConf = $('.pos-featured-products');
    var items = parseInt($featuredSlideConf.attr('data-items'));
    var speed = parseInt($featuredSlideConf.attr('data-speed'));
    var autoPlay = parseInt($featuredSlideConf.attr('data-autoplay'));
    var time = parseInt($featuredSlideConf.attr('data-time'));
    var arrow = parseInt($featuredSlideConf.attr('data-arrow'));
    var pagination = parseInt($featuredSlideConf.attr('data-pagination'));
    var move = parseInt($featuredSlideConf.attr('data-move'));
    var pausehover = parseInt($featuredSlideConf.attr('data-pausehover'));
    var md = parseInt($featuredSlideConf.attr('data-md'));
    var sm = parseInt($featuredSlideConf.attr('data-sm'));
    var xs = parseInt($featuredSlideConf.attr('data-xs'));
    var xxs = parseInt($featuredSlideConf.attr('data-xxs'));
    if (autoPlay == 1) { if (time) { autoPlay = time } else { autoPlay = '3000' } } else { autoPlay = !1 }
    if (pausehover) { pausehover = !0 } else { pausehover = !1 }
    if (move) { move = !1 } else { move = !0 }
    if (arrow) { arrow = !0 } else { arrow = !1 }
    if (pagination == 1) { pagination = !0 } else { pagination = !1 }
    var featuredSlide = $(".pos-featured-products .feature-item");
    featuredSlide.owlCarousel({autoPlay: autoPlay, smartSpeed: speed, autoplayHoverPause: pausehover, scrollPerPage: move, nav: arrow, dots: pagination, responsive: { 0: { items: xxs, }, 480: { items: xs, }, 768: { items: sm, nav: !1, }, 992: { items: md, }, 1200: { items: items, } } });
    checkClasses();
    featuredSlide.on('translated.owl.carousel', function(event) { checkClasses() });

    function checkClasses() {
        var total = $('.pos-featured-products .feature-item .owl-stage .owl-item.active').length;
        $('.pos-featured-products ').each(function() {
            $(this).find('.owl-item').removeClass('firstActiveItem');
            $(this).find('.owl-item').removeClass('lastActiveItem');
            $(this).find('.owl-item.active').each(function(index) {
                if (index === 0) { $(this).addClass('firstActiveItem') }
                if (index === total - 1 && total > 1) { $(this).addClass('lastActiveItem') }
            })
        })
    }
}

function initNewProductsSlider() {
    var $newSlideConf = $('.pos_new_product');
    var items = parseInt($newSlideConf.attr('data-items'));
    var speed = parseInt($newSlideConf.attr('data-speed'));
    var autoPlay = parseInt($newSlideConf.attr('data-autoplay'));
    var time = parseInt($newSlideConf.attr('data-time'));
    var arrow = parseInt($newSlideConf.attr('data-arrow'));
    var pagination = parseInt($newSlideConf.attr('data-pagination'));
    var move = parseInt($newSlideConf.attr('data-move'));
    var pausehover = parseInt($newSlideConf.attr('data-pausehover'));
    var md = parseInt($newSlideConf.attr('data-md'));
    var sm = parseInt($newSlideConf.attr('data-sm'));
    var xs = parseInt($newSlideConf.attr('data-xs'));
    var xxs = parseInt($newSlideConf.attr('data-xxs'));
    if (autoPlay == 1) { if (time) { autoPlay = time } else { autoPlay = '3000' } } else { autoPlay = !1 }
    if (pausehover) { pausehover = !0 } else { pausehover = !1 }
    if (move) { move = !1 } else { move = !0 }
    if (arrow) { arrow = !0 } else { arrow = !1 }
    if (pagination == 1) { pagination = !0 } else { pagination = !1 }
    var newSlide = $(".pos_new_product .newSlide");
    newSlide.owlCarousel({lazyLoad:true, autoPlay: autoPlay, smartSpeed: speed, autoplayHoverPause: pausehover, scrollPerPage: move, nav: arrow, dots: pagination, responsive: { 0: { items: xxs, }, 480: { items: xs, }, 768: { items: sm, nav: !1, }, 992: { items: md, }, 1200: { items: items, } } });
    checkClasses();
    newSlide.on('translated.owl.carousel', function(event) { checkClasses() });

    function checkClasses() {
        var total = $('.pos_new_product .newSlide .owl-stage .owl-item.active').length;
        $('.pos_new_product ').each(function() {
            $(this).find('.owl-item').removeClass('firstActiveItem');
            $(this).find('.owl-item').removeClass('lastActiveItem');
            $(this).find('.owl-item.active').each(function(index) {
                if (index === 0) { $(this).addClass('firstActiveItem') }
                if (index === total - 1 && total > 1) { $(this).addClass('lastActiveItem') }
            })
        })
    }
}

function initPreviewProductsSlider() {
    var owl = $("#quickview-modal > div > div > div.modal-body > div > div.col-md-5.col-sm-5 > div.images-container > div.js-qv-mask.mask.pos_content > div");
    owl.owlCarousel({
        lazyLoad: true,
        autoPlay: false,
        smartSpeed: 1000,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 2,
            },
            480: {
                items: 3,
            },
            768: {
                items: 2,
                nav: false,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 3,
            }
        }
    });
}

function initProductCate(category) {
    var $listcateSlideConf = $(`.${category}`);
    var items = parseInt($listcateSlideConf.attr('data-items'));
    var speed = parseInt($listcateSlideConf.attr('data-speed'));
    var autoPlay = parseInt($listcateSlideConf.attr('data-autoplay'));
    var time = parseInt($listcateSlideConf.attr('data-time'));
    var arrow = parseInt($listcateSlideConf.attr('data-arrow'));
    var pagination = parseInt($listcateSlideConf.attr('data-pagination'));
    var move = parseInt($listcateSlideConf.attr('data-move'));
    var pausehover = parseInt($listcateSlideConf.attr('data-pausehover'));
    var md = parseInt($listcateSlideConf.attr('data-md'));
    var sm = parseInt($listcateSlideConf.attr('data-sm'));
    var xs = parseInt($listcateSlideConf.attr('data-xs'));
    var xxs = parseInt($listcateSlideConf.attr('data-xxs'));
    if (autoPlay == 1) { if (time) { autoPlay = time } else { autoPlay = '3000' } } else { autoPlay = !1 }
    if (pausehover) { pausehover = !0 } else { pausehover = !1 }
    if (move) { move = !1 } else { move = !0 }
    if (arrow) { arrow = !0 } else { arrow = !1 }
    if (pagination == 1) { pagination = !0 } else { pagination = !1 }
    var listcateSlide = $(`.${category} .listcateSlide`);
    listcateSlide.owlCarousel({lazyLoad:true, autoPlay: autoPlay, smartSpeed: speed, autoplayHoverPause: pausehover, nav: arrow, dots: pagination, responsive: { 0: { items: xxs, }, 480: { items: xs, }, 768: { items: sm, nav: !1, }, 992: { items: md, }, 1200: { items: items, } } });
    checkClasses();
    listcateSlide.on('translated.owl.carousel', function(event) { checkClasses() });

    function checkClasses() {
        $(`.${category} .listcateSlide`).each(function() {
            var total = $(this).find('.owl-item.active').length;
            $(this).find('.owl-item').removeClass('firstActiveItem');
            $(this).find('.owl-item').removeClass('lastActiveItem');
            $(this).find('.owl-item.active').each(function(index) {
                if (index === 0) { $(this).addClass('firstActiveItem') }
                if (index === total - 1 && total > 1) { $(this).addClass('lastActiveItem') }
            })
        })
    }
}