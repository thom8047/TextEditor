function getText(editor) {
    var str = "";
    editor.children().each(function() {
        str = `${str}${$(this).text()}\n`;
    });
    return str;
}

function bindClickEvent(id, editor) {

    if (id.includes('file')) {
        if (id.includes('new')) {
            // better yet, let's push a new editor out, and if we save it, we'll check if file exists in back-end and add new row
            // create new row within table, so we'd "post" to data to push our new file
        }
        if (id.includes('open')) {
            var explorer = $('.FileExplorer'),
                backdrop = $('#full-screen-popup-background'),
                popup = $('#popup-background');

            explorer.css({
                "display": "flex",
            })
            setTimeout( () => {
                backdrop.css({
                    "opacity": "0.5",
                })
                popup.css({
                    "opacity": "1",
                })
            }, 1);

            // Now let's populate the actual explorer with all the files in db

        }
        // Already what I need
        if (id.includes('save')) { 
            var data = {};
            data.name = editor.attr('data-name')  //"blank.txt";
            data.content = getText(editor);
            data.accessed = 0;
            data.file_no = 0;
            data.type = id.split('-file')[0];
        
            $.ajax({ // use to save data created.
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/data',						
                success: function(data) {
                    console.log(JSON.stringify(data));
                }
            });
        }
    }
}

// keeping the original main script, here I will clean up as needed
function main() {
    $(".dropdown button").each(function(index) {
        var which = $(this).attr('id'),
            dropdown = '#'+which+'-dropdown',
            drop_div = $('.dropdown').find(dropdown);

        // once we get buttons now we have to clear the dropdowns every time we click out of the div
        $(".dropdown button").blur(function() {
            setTimeout(() => {
                $(drop_div).css('display', 'none');
            }, 100);
        });

        $(this).click(function(event) {
            // variables for main toolbar buttons
            var which = $(this).attr('id'),
                dropdown = '#'+which+'-dropdown',
                drop_div = $('.dropdown').find(dropdown);

            // we need to first actually view the div so heres that
            drop_div.css('display', 'block')
            
        });
    });

    // for each button in the dropdown, add click events...
    $(".dropdown-content div").children().each(function(index){
        // add the click event, it won't need to be altered so we can add when the doc is ready
        $(this).on('click', function(event) {
           bindClickEvent($(this).attr('id'), $('#editor'));
        });
    });
}

export default function getDropDown() {
    main()
}