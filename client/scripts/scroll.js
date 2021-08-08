function scrollBothDivs(editor) {
    $(editor).on('scroll', function(event) {
        $('#number_scale').scrollTop($(this).scrollTop());
    });
}

export { scrollBothDivs }

// This makes both divs scroll together! now we can focus only in the editor