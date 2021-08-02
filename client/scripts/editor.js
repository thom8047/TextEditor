String.prototype.paddingLeft = function (paddingValue) {
    return String(paddingValue + this).slice(-paddingValue.length);
 };

 // my code below -------------------------------------------------------------------

function setCaret(newNode, before) { //setting the caret, visa versa we want to set the position when the caret changes!
    let sel = document.getSelection();
    let range = sel.getRangeAt(0);
    range.selectNodeContents(newNode);
    range.collapse(before);  // sets it before if you give it true
    sel.removeAllRanges();
    sel.addRange(range);
}

function focusOn(who) {
    return $(who).focus();
}

function updateFooter(editor) {
    var getNewRowInt = String(parseInt($(editor).attr('data-current-row'))),
        getNewColInt = String(parseInt($(editor).children().eq(getNewRowInt-1).attr('data-current-col'))),
        footer = $('#footer-data');
    
    footer.text(`LN: ${getNewRowInt.paddingLeft('___')} | Col: ${getNewColInt.paddingLeft('___')}`)
}

function correctID(index) {
    $(this).attr("id", index);
    //console.log(index, $(this).attr("id"));
}

function correctDivID(index) {
    //console.log(index)
    $(this).attr("id", index+1);
    $('#editor').attr('data-row', index+1);
    //console.log(index, $(this).attr("id"));
}

function createNewLine(current_row) {
    var new_line = $(document.createElement('div'));
    new_line.addClass('line'); new_line.attr('id', current_row); new_line.attr('contenteditable', 'true'); new_line.attr('spellcheck', 'false'); new_line.attr('data-col', 0); new_line.attr('data-current-col', 0); 

    return new_line
}

function moveCursorVert(editor, dir, int_row, int_last_row, int_col) {
    if (int_row == 1 || int_row == int_last_row) {
        //console.log('at end')
        if (int_row+dir < 1) {
            //console.log('cant go up')
            return; 
        } else if (int_row+dir > int_last_row) {
            //console.log('cant go down')
            return;
        } // if we're at the ends, stop from going to farr but continue to allow shit to happen
    }
    var row = $(editor).children().eq((int_row+dir)-1),
        col = (parseInt(row.attr('data-col')) >= int_col) ? int_col : parseInt(row.attr('data-col'))

    row.attr('data-current-col', col)
    $(editor).attr("data-current-row", int_row+dir)
    focusOn(row);
    setCaret(row.children().eq(col-1)[0], false);
}

function moveCursorLeft(editor, row, prev_col, int_col, col) {
    $(row).attr("data-current-col", int_col-1);
    setCaret($(prev_col)[0], true);
    return;
}

function moveCursorRight(editor, row, next_col, int_col, col, atEnd) {
    $(row).attr("data-current-col", int_col+1);
    setCaret($(next_col)[0], true);
    return;
}

function checkString(editor) {
    $(editor).on('keydown', function(key_obj){
        var int_row = parseInt($(editor).attr('data-current-row')),
            int_col = parseInt($(editor).children().eq(int_row-1).attr('data-current-col')),
            int_last_row = parseInt($(editor).attr('data-row')),
            int_last_col = parseInt($(editor).children().eq(int_row-1).attr('data-col')),
            row = $(editor).children().eq(int_row-1),
            col = row.children().eq(int_col),
            next_col, prev_col, //have to get the next and prev col
            keyCode = key_obj.keyCode,
            key = key_obj.key,

        end_of_var;

        try {next_col = row.children().eq(int_col+1)} catch {next_col = null}
        try {prev_col = row.children().eq(int_col-1)} catch {prev_col = null}

        //console.log(`${key} and the code: ${keyCode}`);
    
        if ([37,38,39,40].includes(keyCode)) {
            key_obj.preventDefault();

            if (keyCode%2) {
                if (-(38-keyCode) > 0){
                    if (int_col >= int_last_col) { 
                        console.log('move right')
                        return; 
                    } // at end
                    if (int_col == int_last_col-1) { $(row).attr("data-current-col", int_last_col); setCaret($(col)[0], false); updateFooter(editor); return; } // move just once more
                    moveCursorRight(editor, row, next_col, int_col, col);
                } else {
                    if (int_col == 0) { // lets check if we can up a row
                        /*if (int_row == 1) { return; } // cannot move up a row
                        console.log('try')
                        var lastColInPrevRow = parseInt($(editor).children().eq(int_row-2).attr('data-col'))
                        moveCursorVert(editor, 40 {/* knowing keyCode=38 is up , int_row, int_last_row, lastColInPrevRow-1 /* having to use prev rows last col, we already know it exists ) */
                        return; 
                    } //at end

                    //if (int_col == int_last_col-1) { setCaret($(col)[0], true); return; }
                    moveCursorLeft(editor, row, prev_col, int_col, col);
                }
                
            } else {
                moveCursorVert(editor, -(39-keyCode), int_row, int_last_row, int_col)
            }
        }

        if ([8, 9, 13].includes(keyCode)) {
            if (keyCode == 8) {
                if (!row.text()) { 
                    if (row.attr('id') == 1) { return; } // make sure we're not the last line
                    $(row).remove(); // remove the row
                    // fix editor row data info and correct divs
                    $(editor).attr("data-row", int_last_row-1);
                    $(editor).attr("data-current-row", int_row-1);
                    $(editor).find('div').each( correctDivID );

                    var newRow = $(editor).children().eq(int_row-2);
                    focusOn(newRow);
                    return;
                } // make sure we don't keep removing files
                $(row).attr("data-col", int_last_col-1);
                $(row).attr("data-current-col", int_col-1);
                $(row).find('span').each( correctID );
            }
        }

        if (`\`~1234567890!@#$%^&*( )-_=+[{]}\|;:'",<.>/?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.includes(key)) {
            key_obj.preventDefault();
            var span = document.createElement('span');
    
            span.textContent = key;
            span.setAttribute('class', 'tab');
            span.setAttribute('id', int_col);
    
            if (keyCode == 9) { // Handle tab
                span.innerHTML = '&#x09;'
            }
    
            if (int_col == 0) { row.prepend(span); }
            else { 
                $(span).insertAfter($(row).find('span').eq(int_col-1)); 
            }
            $(row).find('span').each( correctID );
    
            $(row).attr("data-col", int_last_col+1);
            $(row).attr("data-current-col", int_col+1);
    
            var selector = $(row).find('span').eq(int_col);
            setCaret(selector[0], false);
        }

        updateFooter(editor); //update footer
    });
}

export default function addEditScript(editor) {
    //put focus on the end of the file
    
    //pass in editor to main script
    checkString(editor);
}
//----------------------------------------------------
// Notes: 8/2/2021
//Work out bugs that are popping up with trying to move vert when moving left and right, I feel like focusing and setting the 
//caret could be a better way of going about the problem, but we also have the code that moves it up or down, so do whatever
//works

//-----------------------------------------------------

//Change this to allow the regular use of the content editable div to be preformed. cannot keep dealing with issues that
//arise because i want to use the divs in my own way. Keep all this work and we might be able to get it working, 

//extras below 
    //first check if we're at the beginning or end

    //i don't know what will make this work!!!
  /*   var canMove = false;
    if (int_col >= 0) {
        canMove = true;
    } else { console.log('cannot move'); return; }
    if (int_col <= int_last_col) {
        canMove = true;
    } else { console.log('cannot move'); return; }
    console.log(canMove)
    if (canMove) {
        //move cursor
        setCaret($(col)[0])
        $(row).attr("data-current-col", int_col+dir);

    } else {
        console.log('cannot move')
    } */

    //$(row).attr("data-current-col", int_col+dir);

    //we're in the middle and can move within the current_row