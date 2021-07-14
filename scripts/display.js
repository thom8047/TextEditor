function setCaret(newNode) {
    let sel = document.getSelection();
    let range = sel.getRangeAt(0);
    range.selectNodeContents(newNode);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

function getFileResolve(reader, files, currentNum) {
    try {
        var file = files[currentNum];
        return reader.readAsText(file)
    } catch(err) {
        //console.log("END")
    }
};

function displayClick(name) {
    var display_div = $("#tabs"),
        clicked;

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
        console.log('hover')
        $(new_file_div).css("background-color", "grey")
    })
    $(new_file_div).mouseleave(function() {
        console.log('hover')
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
        $(this).attr('id', 'selected-tab')
    })

    display_div.append(new_file_span);
}

function createFileForViewing(name) {
    appendSideDisplay(name);
    appendTabDisplay(name);
}

function createEditor(content) { //dont know about this
    var editor = $('#editor'),
        current_row = 1,
        current_col = 0,
        new_line = "<div class='line' id=" + current_row + " contenteditable='true' spellcheck='false' data-col=0 data-current-col=0></div>";

    //editor.append($(new_line));

    for (const letter of content) {
        if (letter == '\n') {
            current_row++;

            new_line = "<div class='line' id=" + current_row + " contenteditable='true' spellcheck='false' data-col=0 data-current-col=0></div>";
            current_col = 0;
            editor.append($(new_line));

            var span = $(document.createElement('span'))
            span.text(' ');
            span.attr('id', current_col);
            span.addClass('other');
            editor.children().last().append(span);
            editor.children().last().attr('data-col', current_col);
            editor.children().last().attr('data-current-col', current_col);

            continue
        }
        console.log(letter)

        var span = $(document.createElement('span'))
        span.text(letter);
        span.attr('id', current_col);
        span.addClass('other');
        editor.children().last().append(span)

        //increment col
        current_col++;

    }
    setCaret(editor.children().first().first()[0])
    editor.children().last().attr('data-col', current_col);
    editor.children().last().attr('data-current-col', current_col);
    editor.attr('data-row', current_row);
    editor.attr('data-current-row', 1);
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
            createEditor(content)
            //console.log(name, content, "<------------------>")
            currentFileNum++;

            getFileResolve(reader, files, currentFileNum);
        }
        
        getFileResolve(reader, files, currentFileNum);
    })
};

function main() {
    uploadFile(); // so we can upload a file

}

$(document).ready(main);

/*
Here we can import in the python color changing script and we can check the extension of the files we add

We should be able to read the file and create the divs accordingly and change the main div, from there we don't 
have to worry about any excess work because our python script alread loops through every line to update the text

We will need to create a container for the text and use it accordingly to hold all the text of every specific file.
This might get big, but if we store it correctly then we should be able to just leave it somewhere.
*/