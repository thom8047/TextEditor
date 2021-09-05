//import for using editor
import { addEditScript } from "./editor.js";
import { getDropDown, openFile } from "./newSaveLoad.js";
import updateTitle from "./version.js";
import { createNumbers } from "./number_scale.js";
import { scrollBothDivs } from "./scroll.js"

/* heres where we'll check for the click event from the open button, this is key, because we need
to pull in our file names and call the ajax request to pull content here!
*/
function onOpenFileClick() {
    $('#open-file').on('click', (event) => {
        //console.log();
        // pass in the function to call ajax request when the right file name is clicked; IT NEEDS TO BE IN THIS SCRIPT!!
        openFile($(this).attr('id'));  // () => { //function to call ajax request to open file });
    });
}

function updateNumbers(name) {
    // Look through all the editor for the one we want and get the number of rows. 
    $('#code').children().each(function() {
        if ($(this).attr('data-name') === name) {
            var n = parseInt($(this).attr('data-row'));
            createNumbers(n, true);

            $('#number_scale').scrollTop($(this).scrollTop()); // keeping the divs scrolled together
        }
    })
}

// functionality for closing the popup window
function closePopUp() {
    $('#popup-navbar-x').on('click', (event) => {
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
    });
}

// For db implement, we won't need this.
function getFileResolve(reader, files, currentNum) {
    try {
        var file = files[currentNum];
        return reader.readAsText(file)
    } catch(err) {
        //console.log("END")
    }
};

function switchEditors(name) { // awesome function
    var childs = $("#code").children();
    childs.each(function(index){
        var child = $(this);
        if (child.attr('id') == "number_scale") {
            // do nothing
        } else {
            //console.log(child.attr('class'))
            var className = child.attr('class').split('-editor')[0]; 
            child.attr('id', 'editor-null');
            child.css('display', 'none');
            //console.log(className, name)
            if (className == name) {
                child.attr('id', 'editor');
                child.css('display', 'block');
            }
        }
    });

    // Now we've switched editors
}

// With the three following functions, we have overlap and a poor job of using it to our advantage. CleanUP!!!
function displayClick(name) {
    var display_div = $("#tabs"),
        clicked;

    switchEditors(name);

    display_div.children().each(function() {
        if ($(this).children().eq(1).text() == name) {
            clicked = $(this);
        } 
    });

    display_div.children().each(function() {
        $(this).attr('id', 'tab-objects')
    });
    $(clicked).attr('id', 'selected-tab')
}

function xSpan(span) {
    // take care of span css
    span.text(" + ");
    span.attr("id", "exit")
}

function appendSideDisplay(name) {
    var new_file_div = document.createElement("div"),
        display_div = $("#display-toolbar");

    $(new_file_div).css(
        {"color": "white",
        "paddingTop": "5px",
        "paddingBottom": "5px",
        "transition": "0.3s",
        "background-color": "#222",
        "text-align": "left",
        "whitespace": "nowrap",
        "overflow": "hidden",
        "text-overflow": "ellipsis",});
    $(new_file_div).text(name);
    $(new_file_div).mouseenter(function() {
        //console.log('hover')
        $(new_file_div).css("background-color", "grey")
    })
    $(new_file_div).mouseleave(function() {
        //console.log('hover')
        $(new_file_div).css("background-color", "#222")
    })

    $(new_file_div).on('click', function(){
        displayClick(name);
        
        // update title and numbering system
        updateTitle();
        updateNumbers(name);
    });

    display_div.append(new_file_div);
}

function appendTabDisplay(name) {
    var new_file_span = $(document.createElement("div")),
        x_span = $(document.createElement("span")),
        text_span = $(document.createElement("span")),
        display_div = $("#tabs");

    xSpan(x_span);
    text_span.text(name);
    new_file_span.append([x_span, text_span]); 

    display_div.children().each(function() {
        $(this).attr('id', 'tab-objects')
    });
    new_file_span.attr('id', 'selected-tab');
    new_file_span.on('click', function(event) {
        if ($(event.target).attr("id") === "exit") {console.log('x')}

        display_div.children().each(function() {
            $(this).attr('id', 'tab-objects')
        });
        switchEditors(name);
        $(this).attr('id', 'selected-tab')

        //update title and numbering system
        updateTitle();
        updateNumbers(name);
    })

    display_div.append(new_file_span);
}

function createFileForViewing(name) {
    appendSideDisplay(name);
    appendTabDisplay(name);
    updateTitle();
}

function createNewLine(current_row) {
    var new_line = $(document.createElement('div'));
    new_line.addClass('line'); new_line.attr('id', current_row); new_line.attr('contenteditable', 'true'); new_line.attr('spellcheck', 'false'); new_line.attr('data-col', 0); new_line.attr('data-current-col', 0); 

    return new_line
}

function createNewEditor(name) {
    var new_line = $(document.createElement('div'));
    new_line.attr('id', 'editor'); new_line.attr('data-row', 1); new_line.attr('data-current-row', 1); new_line.attr('data-name', name); new_line.attr('data-column-vertical-adj', 0); new_line.addClass(name+"-editor");
    new_line.css({
        "overflow": "auto",
        "color": "white",
        "font-family": "'source-code-pro', monospace",
        "border": "0px",
        "background-color": "#555",
        "height": "97%",
        "margin-left": "45px",
        "display": "block",
        "scroll-snap-type": "y mandatory",
    })
    return new_line;
}

function addEditor(new_editor) {
    var current = $('#editor'),
        parent = $('#code');
    current.attr('id', 'editor-null'); current.css('display', 'none');

    parent.append(new_editor);
    //setCaret(new_editor.children().last().last()[0]) //deprecated for now
}

function createEditor(content, name) { //dont know about this
    var editor = createNewEditor(name);

    content.split('\n').forEach(function(element, index) {
        index++;
        var new_line = createNewLine(index),
            current_col = 0;

        //console.log(element, element.replace(/\s/g, '').length) 
        
        if (!(element.replace(/\s/g, '').length)) {
            var span = $(document.createElement('span'));
            span.text(' ');
            span.attr('id', current_col);
            span.addClass('other');

            new_line.append(span);
            current_col++;
        } else {
            for (let letter of element) {
                var span = $(document.createElement('span'));
                span.text(letter);
                span.attr('id', current_col);
                span.addClass('other');

                new_line.append(span);
                current_col++;
            }
            //current_col--;
        }
        
        new_line.attr('data-col', current_col); new_line.attr('data-current-col', current_col);
        editor.append(new_line);
        editor.attr('data-row', index);
        editor.attr('data-current-row', index);
    })
    addEditor(editor);
    addEditScript(editor);

    // update numbering row and make numbering row scrollTop() follow #editor scrollTop()
    updateNumbers(name);
    scrollBothDivs(editor);
}

// DEPRECATED --------------------------------*******
function uploadFile() {
    $('#imported-files').on('change', function() {
        var files = this.files,
            reader = new FileReader(),
            currentFileNum = 0;

        reader.onload = function(e) {
            var content = e.target.result,
                name = files[currentFileNum].name;

            createFileForViewing(name)
            createEditor(content, name)
            //console.log(name, content, "<------------------>")
            currentFileNum++;

            getFileResolve(reader, files, currentFileNum);
        }
        
        getFileResolve(reader, files, currentFileNum);
    })
};

function genericEditor(name, content) {
    createFileForViewing(name)
    createEditor(content, name)
}

function main() {
    // so we can upload a file
    uploadFile(); 
    
    // create blank editor to start
    genericEditor('blank.txt', 'if __name__ == "__main__":\n    # Do something');

    // so drop downs can work correctly
    getDropDown();
    onOpenFileClick();

    // This is for closing the pop up, it gotsta go somewhere 
    closePopUp();
}

$(document).ready(main);


/* 8/7/21
As of now, this script looks great and just needs a bit of clean up. We are ready to move into two directions:

The database implementation, and the full on file opening and file saving implementation.
*/

/*  //I have no idea when I made this note
Here we can import in the python color changing script and we can check the extension of the files we add

We should be able to read the file and create the divs accordingly and change the main div, from there we don't 
have to worry about any excess work because our python script alread loops through every line to update the text

We will need to create a container for the text and use it accordingly to hold all the text of every specific file.
This might get big, but if we store it correctly then we should be able to just leave it somewhere.
*/