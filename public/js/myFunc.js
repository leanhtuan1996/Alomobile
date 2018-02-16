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
`);
}