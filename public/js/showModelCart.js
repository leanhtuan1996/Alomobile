/*
QUICK ADD TO CART TO SHOW MODEL
**/
$(document).ready(function() {
    prestashop.blockcart = prestashop.blockcart || {};
    var showModal = prestashop.blockcart.showModal || function(modal) { 
        var $body = $('body');
        $body.append(modal);
        $body.one('click', '#blockcart-modal', function(event) { 
            if (event.target.id === 'blockcart-modal') { 
                $(event.target).remove() 
            } 
        }) 
    };

    $(document).ready(function() {
        prestashop.on('updateCart', function(event) {
            var refreshURL = $('.blockcart').data('refresh-url');
            var requestData = {};
            if (event && event.reason) { 
                requestData = { 
                    id_product_attribute: event.reason.idProductAttribute, 
                    id_product: event.reason.idProduct, 
                    action: event.reason.linkAction 
                } 
            }
            $.post(refreshURL, requestData).then(function(resp) {
                $('.blockcart').replaceWith(resp.preview); 
                if (resp.modal) { 
                    showModal(resp.modal) 
                } 
            }).fail(function(resp) { 
                prestashop.emit('handleError', { 
                    eventType: 'updateShoppingCart', 
                    resp: resp 
                }) 
            })
        })
    })
});