function scrollBothDivs(editor) {
    $(editor).on('scroll', function(event) {
        $('#number_scale').scrollTop($(this).scrollTop());
        console.log(`This is the scroll event saying: ${$(this).scrollLeft()}`)
    });
}

export { scrollBothDivs }

// This makes both divs scroll together! now we can focus only in the editor