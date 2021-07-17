function setCaret(newNode) { //setting the caret, visa versa we want to set the position when the caret changes!
    let sel = document.getSelection();
    let range = sel.getRangeAt(0);
    range.selectNodeContents(newNode);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

function focusOn(who) {
    return $(who).focus();
}

function correctID(index) {
    $(this).attr("id", index);
    //console.log(index, $(this).attr("id"));
}

function correctDivID(index) {
    console.log(index)
    $(this).attr("id", index+1);
    $('#editor').attr('data-row', index+1);
    //console.log(index, $(this).attr("id"));
}

function createNewLine(current_row) {
    var new_line = $(document.createElement('div'));
    new_line.addClass('line'); new_line.attr('id', current_row); new_line.attr('contenteditable', 'true'); new_line.attr('spellcheck', 'false'); new_line.attr('data-col', 0); new_line.attr('data-current-col', 0); 

    return new_line
}

function moveCursorVert(editor, dir) {

}

function moveCursorHori(editor, row, col, int_row, int_col, int_last_row, int_last_col, dir) {
    //first check if we're at the beginning or end

    //i don't know what will make this work!!!

    if (int_col == 0) {
        if (int_row !== 1) {
            var prev = int_row - 1;
            $(editor).children('#'+prev).focus();
            $(editor).attr('data-current-row', prev);
            return;
        }
        return;
    }

    if (int_col == int_last_row) {
        if (int_row !== int_last_row) {
            var next = int_row + 1;
            $(editor).children('#'+next).focus();
            $(editor).attr('data-current-row', next);
            return;
        }
        return;
    }

    $(row).attr("data-current-col", int_col+dir);

    //we're in the middle and can move within the current_row
}

function checkString(editor) {
    $(editor).on('keydown', function(key_obj){
        var int_row = parseInt($(editor).attr('data-current-row')),
            int_col = parseInt($(editor).children().eq(int_row-1).attr('data-current-col')),
            int_last_row = parseInt($(editor).attr('data-row')),
            int_last_col = parseInt($(editor).children().eq(int_row-1).attr('data-col')),
            row = $(editor).children().eq(int_row-1),
            col = row.children().eq(int_col),
            keyCode = key_obj.keyCode,
            key = key_obj.key,

        end_of_var;
        //console.log(`${key} and the code: ${keyCode}`);
    
        if ([37,38,39,40].includes(keyCode)) {
            key_obj.preventDefault();

            if (keyCode%2) {
                let dir = -(38-keyCode);
                moveCursorHori(editor, row, col, int_row, int_col, int_last_row, int_last_col, dir);
            } else {
                let dir = 39-keyCode;
            }
        }
    });
}

export default function addEditScript(editor) {
    //put focus on the end of the file
    var last_node = $(editor).children().last()
    last_node.attr('data-current-col', 0)
    $(last_node.first()).focus();
    
    //pass in editor to main script
    checkString(editor);
}