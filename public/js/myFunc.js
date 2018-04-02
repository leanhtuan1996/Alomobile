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
        localStorage.cart = JSON.stringify({ products: products })
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

function removeFromCart(id) {
    if (!localStorage.cart || localStorage.cart.length == 0) { return }

    if (Array.isArray(localStorage.cart)) {
        var idx = localStorage.cart.findIndex(element => {
            return element.id == id
        });
        if (idx && idx > - 1) { 
            localStorage.cart.slice(idx, 1);
        } 
    } else {
        return
    }
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
