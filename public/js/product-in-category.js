$('.price').each((index, price) => {
    if ($(price).html().match(/^[0-9]{1,}$/g)) {
        $(price).html(numberWithCommas($(price).html() + " VNĐ"));
    }
});

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

 function getPreviewProduct(id, cb) {
    $.get('/api/v1/product/get-preview', {
        id: id
    }, (data) => {
        return cb(data);
    });
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

$('#quickview-modal').delegate('.input-color', 'click', (e) => {
        $('#quickview-modal > div > div > div.modal-body > div > div.col-md-7.col-sm-7 > div.product-prices > div.product-price.h5 > div > span').text(numberWithCommas($(e.currentTarget).attr("data-price") + " VNĐ"));

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

$(document).ready(($) => {
    $('#js-product-list').delegate('.quick-view-product', 'click', (e) => {      

        var id = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-id-product');

        if (!id) {
            id = $(e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-id-product')
        }
        
        if (id) {
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
                                                        <i class="material-icons product-available"></i>
                                                        Còn hàng
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

    $('#products-list').delegate('.add-to-cart', 'click', (e) => {  

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

                    var content = `
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                    </button>
                                    <h4 class="modal-title h6 text-sm-center" id="myModalLabel"><i class="material-icons"></i>Thêm sản phẩm vào giỏ hàng thành công</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <img class="product-image" src="${image}" alt="" title="" itemprop="image">
                                        </div>
                                        <div class="col-md-8">
                                            <h6 class="h6 product-name">${name}</h6>
                                            <p>${numberWithCommas(price) + " VNĐ"}</p>
                                            <ul style="list-style-type: none;
                                                    margin: 0;
                                                    padding: 0;
                                                    overflow: hidden;">
                                                    <li style="float: left;"><strong class="product-color">Màu sắc</strong></li>
                                                    <li style="background-color: ${color}; border-radius: 50%; width: 20px; height: 20px; display: inline-block; border-width: 1px; border-style: solid; border-color: grey; float: left; margin-left: 5px" title="Cosmos">
                                                    </li>
                                                </ul>
                                                
                                            </span><br>
                                            <p style=""><strong class="product-quantity">Số lượng:</strong>&nbsp; 1</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="cart-content-btn">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Tiếp tục mua sắm</button>
                                                <a href="/gio-hang" class="btn btn-primary"><i class="material-icons"></i>Xem giỏ hàng</a>
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <style>
                                #blockcart-modal .modal-dialog {
                                    max-width: 600px;
                                    width: 40%;
                                }

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

                                #blockcart-modal strong, p {
                                    color: #333;
                                    font-size: 14px;
                                    font-weight: 600;
                                }
                            </style>
                        </div>
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

                    var content = `
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                    </button>
                                    <h4 class="modal-title h6 text-sm-center" id="myModalLabel"><i class="material-icons"></i>Thêm sản phẩm vào giỏ hàng thành công</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <img class="product-image" src="${image}" alt="" title="" itemprop="image">
                                        </div>
                                        <div class="col-md-8">
                                            <h6 class="h6 product-name">${name}</h6>
                                            <p>${numberWithCommas(price) + " VNĐ"}</p>
                                            <ul style="list-style-type: none;
                                                    margin: 0;
                                                    padding: 0;
                                                    overflow: hidden;">
                                                    <li style="float: left;"><strong class="product-color">Màu sắc</strong></li>
                                                    <li style="background-color: ${color}; border-radius: 50%; width: 20px; height: 20px; display: inline-block; border-width: 1px; border-style: solid; border-color: grey; float: left; margin-left: 5px" title="Cosmos">
                                                    </li>
                                                </ul>
                                                
                                            </span><br>
                                            <p style=""><strong class="product-quantity">Số lượng:</strong>&nbsp; ${quantity}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="cart-content-btn">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Tiếp tục mua sắm</button>
                                                <a href="/gio-hang" class="btn btn-primary"><i class="material-icons"></i>Xem giỏ hàng</a>
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <style>
                                #blockcart-modal .modal-dialog {
                                    max-width: 600px;
                                    width: 40%;
                                }

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

                                #blockcart-modal strong, p {
                                    color: #333;
                                    font-size: 14px;
                                    font-weight: 600;
                                }
                            </style>
                        </div>
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
});