
function dropBindClick(id) {
    //get data
    var data = {};
    data.name = "blank.txt";
    data.file_no = 0;
    
    $.ajax({ // use to get and save data created.
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:8000/data',						
        success: function(data) {
            console.log(JSON.stringify(data));
        }
    });
}

function main() {
    $(".dropdown button").each(function(index) {
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
        // for each button in the dropdown, add click events...
        drop_buttons.each(function(index){
            // add the click event, it won't need to be altered so we can add when the doc is ready
            $(this).on('click', function(event) {
                /* send in the id of the clicked element, this is where we'll make a function for each button =/ that'll 
                take forever */
                dropBindClick($(this).children().first().attr('id'));
            });
        });

        $(this).click(function(event) {
            // variables for main toolbar buttons
            var which = $(this).attr('id'),
                dropdown = '#'+which+'-dropdown',
                drop_div = $('.dropdown').find(dropdown),
                drop_buttons = drop_div.children();

            // we need to first actually view the div so heres that
            drop_div.css('display', 'block')
            
        });
    });
}

export default function getDropDown() {
    main()
}