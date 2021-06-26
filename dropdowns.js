function dropBindClick(id) {
    console.log(id);
}

function main() {
    $(".dropdown button").each(function(index) {
        $(this).click(function(event) {
            // variables for main toolbar buttons
            var which = $(this).attr('id'),
                dropdown = '#'+which+'-dropdown',
                drop_div = $('.dropdown').find(dropdown),
                drop_buttons = drop_div.children();

            // once we get buttons now we have to clear the dropdowns every time we click out of the div
            $(".dropdown button").blur(function() {
                setTimeout(() => {
                    $(drop_div).css('display', 'none');
                }, 100);
            });

            // we need to first actually view the div so heres that
            drop_div.css('display', 'block')

            // for each button in the dropdown...
            drop_buttons.each(function(index){
                // add the click event (once)... [THIS  CAN BE SUBSTITUTED FOR THE on.('click')/one.('click') EVENTS]
                drop_buttons.eq(index).on('click', function(event) {
                    /* send in the id of the clicked element, this is where we'll make a function for each button =/ that'll 
                    take forever */
                    dropBindClick($(this).find('button').attr('id'));
                    
                    // because we set the click event, we have to unset it so we don't get a recursive click evemt issue.
                    drop_buttons.each(function(index){
                        drop_buttons.eq(index).off('click');
                    });
                });
            });
            
        });
    });
}

$( document ).ready(main);