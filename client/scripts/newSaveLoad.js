import { genericEditor } from "./display.js";

function getText(editor) {
    var str = "";
    editor.children().each(function() {
        str = `${str}${$(this).text()}\n`;
    });
    return str;
}

function ajaxReqFunc(fileList) {
    $.ajax({ // use to pull data for the names of the file.
        type: 'GET',
        url: '/data',  // learn how to pass in parameters to pull different code!!
        data: { request: 'content',
                params:  fileList},
        contentType: 'application/json',						
        success: function(returned_data) {
            for (const key in returned_data) {
                genericEditor(key, returned_data[key][0], returned_data[key][1]);
            }
        },
        error: function(err) {
            return err;
        }
    });
}

function getFilesContent(fileList) {
    var content = ajaxReqFunc(fileList);
}

function fade() {
    var explorer = $('.FileExplorer'),
        backdrop = $('#full-screen-popup-background'),
        popup = $('#popup-background');

    backdrop.css({
        "opacity": "0",
    })
    popup.css({
        "opacity": "0",
    })
    setTimeout(() => {
        explorer.css({
            "display": "none",
        }) 
    }, 500);
}

function closePopUp() {
    $('#popup-navbar-x').on('click', (event) => {
        fade();
    });
    $('#full-screen-popup-background').on('click', (event) => {
        fade();
    });
}

function openFile(id) {
    var explorer = $('.FileExplorer'),
        backdrop = $('#full-screen-popup-background'),
        popup = $('#popup-background'),
        returned_value_from_click;

    //call ajax request for all the files within the database,
    //remove and populate the names of the files within the database. From here we need to add a function to them in display.js

    $.ajax({ // use to pull data for the names of the file.
        type: 'GET',
        data: { request: 'names' },
        url: '/data',  // learn how to pass in parameters to pull different code!!
        contentType: 'application/json',						
        success: function(returned_data) {
            var data = JSON.stringify(returned_data);
            data = data.substring(1, data.length - 1);

            //lets make this beach a list
            data = data.split(',');

            // Got it, now let's remove a possible list of file names then populate the current
            $.when($('#popup-content-files').children().each((index) => {
                $('#popup-content-files').children().eq(index-1).remove();
                $('#popup-content-props').children().eq(index-1).remove();
            })).then(() => {
                // let's populate all the stuff
                for (let file_name of data) {
                    var file_name_div = $(document.createElement('div')),
                        file_ext_div = $(document.createElement('div')),
                        file_info = file_name.substring(1, file_name.length - 1) //.split('.'); // split() func. to split the ext
                    file_name_div.attr('id', 'popup-content-file');
                    file_name_div.text(file_info);
                    file_ext_div.attr('id', 'popup-content-prop');
                    file_ext_div.text(`File Data: N/A`);

                    file_name_div.on('click', function() {
                        // to select or deselect file
                        if ($(this).css('background-color') == 'rgb(128, 128, 128)') {
                            $(this).css({
                                'background-color': '',
                            });
                            $(this).attr('data-selected', false);
                        } else {
                            $(this).css({
                                'background-color': 'grey',
                            });
                            $(this).attr('data-selected', 'true');
                        }
                    });

                    $('#popup-content-files').append(file_name_div);
                    $('#popup-content-props').append(file_ext_div);
                }
            })

        },
        error: function(err) {
            console.log('CANNOT DISPLAY DATA: ', err)
        }
    });

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

    return returned_value_from_click
}

function saveFile(id, editor) {
    var data = {};
    data.name = editor.attr('data-name')  //"blank.txt";
    data.content = getText(editor);
    data.accessed = 0;
    data.file_no = editor.attr('data-file-number');
    data.type = 'save'; //id.split('-file')[0];

    if (editor.attr('saved') == 'true') { return; } else { editor.attr('saved', true); $('#selected-tab').children().eq(0).attr('id', 'exit-saved');  }

    $.ajax({ // use to save data created.
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/data',						
        success: function(data) {
            console.log('saved');
        },
        error: function(err) {
            console.log('not saved', err);
        }
    });
}

function bindClickEvent(id, editor) {

    if (id.includes('file')) {
        if (id.includes('new')) {
            // better yet, let's push a new editor out, and if we save it, we'll check if file exists in back-end and add new row
            // create new row within table, so we'd "post" to data to push our new file
            var today = new Date(),
                date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    
            // access the json file and hopefully find a way to write to it!!!
            genericEditor('untitled.*', `# ${date}\n# © 2021 Edward Thomas; All rights reserved`, 100)
        }

        if (id.includes('open')) {
            function openAll() {
                let fileDomElementList = [];
                $('#popup-content-files').children().each(function() {
                    if ($(this).attr('data-selected') == 'true') {
                        fileDomElementList.push($(this).text())
                    }
                });
        
                // call ajax deeper into to a handful of functions and the success will open the editors for us.
                // issues include: no file_no, duplicates

                getFilesContent(fileDomElementList);
                
                fade();
            }
            $('#open-all-files').on('click', function() { $.when( openAll() ).then($(this).off('click')) } );
            // pass in the function to call ajax request when the right file name is clicked; IT NEEDS TO BE IN THIS SCRIPT!!
            openFile(id);
        }
        
        if (id.includes('save')) { 
            saveFile(id, editor);
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

function getDropDown() {
    // pass in function to create a new editor with name and content, that way we can use that thing to populate the file
    // can't actually
    main()
}

export { getDropDown, openFile, closePopUp, fade, saveFile }