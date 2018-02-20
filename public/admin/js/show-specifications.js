var showSpecification = (elementId, category) => {
    if ($('.specifications-block').length) {
        $('.specifications-block').remove();
    }

    switch (category) {
        case "may-tinh-xach-tay":          
            break;
        case "may-tinh-bang" || "dien-thoai":
            break;
        case "phu-kien-may-tinh":
            break;
        case "phu-kien-dien-thoai":
            break;
        case "thiet-bi-am-thanh":
            break;
        default:
            break;
    }
}

var spec_phone_tablet = ``;
var spec_laptop = ``;