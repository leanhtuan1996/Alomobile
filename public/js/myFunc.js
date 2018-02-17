function showNotify(i, content) {

    if ($('.help-block').length) {
        $('.help-block').remove();
    }

    $(`${i}`).before(`
    <div class="help-block" >    
        <ul>
            <li class="alert alert-danger">${content}.</li>
        </ul>      
    </div> 
`).show('slow');
}   

function isValidDate(dateString) {
    var regEx = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    if (!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    // if (!d.getTime() && d.getTime() !== 0) return false; // Invalid date
    // return d.toISOString().slice(0, 10) === dateString;

    return (!isNaN(d))
}