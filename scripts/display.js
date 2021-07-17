//import for using editor
import addEditScript from "./editor.js"


function getFileResolve(reader, files, currentNum) {
    try {
        var file = files[currentNum];
        return reader.readAsText(file)
    } catch(err) {
        //console.log("END")
    }
};

function switchEditors(name) {
    var childs = $("#code").children();
    childs.each(function(index){
        var child = $(this);
        if (child.attr('id') == "tabs") {
            // do nothing
        } else {
            var className = child.attr('class').split('-editor')[0]; 
            child.attr('id', 'editor-null');
            child.css('display', 'none');
            console.log(className, name)
            if (className == name) {
                child.attr('id', 'editor');
                child.css('display', 'block');
            }
        }
    })
}

function displayClick(name) {
    var display_div = $("#tabs"),
        clicked;

    switchEditors(name);

    display_div.children().each(function() {
        if ($(this).text() == name) {
            clicked = $(this);
        } 
    });

    display_div.children().each(function() {
        $(this).attr('id', 'tab-objects')
    });
    $(clicked).attr('id', 'selected-tab')
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
    });

    display_div.append(new_file_div);
}

function appendTabDisplay(name) {
    var new_file_span = $(document.createElement("div")),
        display_div = $("#tabs");

    new_file_span.text(name); 
    display_div.children().each(function() {
        $(this).attr('id', 'tab-objects')
    });
    new_file_span.attr('id', 'selected-tab');

    new_file_span.on('click', function() {
        display_div.children().each(function() {
            $(this).attr('id', 'tab-objects')
        });
        switchEditors(name);
        $(this).attr('id', 'selected-tab')
    })

    display_div.append(new_file_span);
}

function createFileForViewing(name) {
    appendSideDisplay(name);
    appendTabDisplay(name);
}

function createNewLine(current_row) {
    var new_line = $(document.createElement('div'));
    new_line.addClass('line'); new_line.attr('id', current_row); new_line.attr('contenteditable', 'true'); new_line.attr('spellcheck', 'false'); new_line.attr('data-col', 0); new_line.attr('data-current-col', 0); 

    return new_line
}

function createNewEditor(name) {
    var new_line = $(document.createElement('div'));
    new_line.attr('id', 'editor'); new_line.attr('data-row', 1); new_line.attr('data-current-row', 1); new_line.attr('data-name', name); new_line.addClass(name+"-editor");
    new_line.css({
        "color": "white",
        "font-family": "'source-code-pro', monospace",
        "border": "0px",
        "background-color": "#555",
        "overflow-x": "auto",
        "overflow-y": "auto",
        "height": "100%",
        "display": "block",
    })
    return new_line;
}

function addEditor(new_editor) {
    var current = $('#editor'),
        parent = $('#code');
    current.attr('id', 'editor-null'); current.css('display', 'none');

    parent.append(new_editor);
    //setCaret(new_editor.children().last().last()[0]) //deprecated
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
}

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

function main() {
    uploadFile(); // so we can upload a file
    //addEditScript($('#editor'))
}

$(document).ready(main);

/*
Here we can import in the python color changing script and we can check the extension of the files we add

We should be able to read the file and create the divs accordingly and change the main div, from there we don't 
have to worry about any excess work because our python script alread loops through every line to update the text

We will need to create a container for the text and use it accordingly to hold all the text of every specific file.
This might get big, but if we store it correctly then we should be able to just leave it somewhere.
*/