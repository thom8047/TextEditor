function setCaret(newNode) {
    let sel = document.getSelection();
    let range = sel.getRangeAt(0);
    range.selectNodeContents(newNode);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

function correctID(index) {
    $(this).attr("id", index);
    //console.log(index, $(this).attr("id"));
}

function correctDivID(index) {
    $(this).attr("id", index+1);
    $('#editor').attr('data-row', index+1);
    //console.log(index, $(this).attr("id"));
}

function checkString(event) {
    var current_node = $(document.activeElement),
        text = document.activeElement.textContent;
        row = parseInt(current_node.attr("id"));
        col = parseInt($(current_node).attr("data-col"));
        current_col = parseInt($(current_node).attr("data-current-col"));
        key = event.keyCode,
        key_value = event.key,
        addKey = true,
        altKeys = [16, 17, 18, 20, 91, 93]

    if (altKeys.includes(key)) {
        addKey = false;
    }

    if (key == 8) {
        addKey = false;
        event.preventDefault();

        if (text == "") {
            if (row == 1) {return;}
            current_node.remove();
            var max_row = parseInt($('#editor').attr('data-row')),
                current_row = parseInt($('#editor').attr('data-current-row'));

            setCaret($('#editor').children('#'+row-1).last()[0]);

            $('#editor').attr('data-current-row', current_row-1);
            $('#editor').attr('data-row', max_row-1);
            
            var footerdata = "Line: " + $('#editor').attr('data-current-row') + ", Col: " + $('#editor').children('#'+row-1).attr('data-col');
            $("#footer-data").text(footerdata);
            return;
        }else {
            if (current_col == 0) {return;}
            current_node.find('span').eq(current_col-1).remove('#'+current_col-1);

            $(current_node).attr("data-col", col-1);
            $(current_node).attr("data-current-col", current_col-1);
            $(current_node).find('span').each( correctID );
        }
    }

    if (key == 13) {
        addKey = false;
        event.preventDefault();

        var next = row+1,
            obj = "<div class='line' id=" + next + " contenteditable='true' data-col=0 data-current-col=0></div>";
        
        //$("#editor").append(obj);
        current_node.after($(obj));

        $(".line").each( correctDivID ); 
        $('#editor').children('#'+next).keydown( checkString );
        $('#editor').children('#'+next).focus();
        $('#editor').attr('data-current-row', next);

        var footerdata = "Line: " + $('#editor').attr('data-current-row') + ", Col: " + $('#editor').children('#'+next).attr('data-col');
        $("#footer-data").text(footerdata);
        return;
    }

    if (key == 37) {
        addKey = false;
        if (current_col == 0) {
            if (row !== 1) {
                var prev = row - 1;
                $('#editor').children('#'+prev).focus();
                $('#editor').attr('data-current-row', prev);
                return;
            }
            return;
        }

        $(current_node).attr("data-current-col", current_col-1);
        //left

    }

    if (key == 38) {
        addKey = false;
        event.preventDefault();
        // up
        if (row == 1) {return;}

        var upElement = $('#editor').find('div').eq(row-2),
            upElementCol = parseInt(upElement.attr('data-current-col')),
            upElementDOM;
        if (upElementCol == 0) { upElementDOM = false; } else { upElementDOM = $(upElement).find('span').eq(upElementCol-1)[0]; }

        upElement.focus();
        if (upElementDOM) {
            setCaret( upElementDOM );
        }

        var footerdata = "Line: " + upElement.attr('id') + ", Col: " + upElementCol;
        $("#footer-data").text(footerdata);
        return;
    }

    if (key == 39) {
        addKey = false;
        if (current_col == col) {
            if (row !== parseInt($('#editor').attr('data-row'))) {
                var next = row + 1;
                $('#editor').children('#'+next).focus();
                $('#editor').attr('data-current-row', next);
                return;
            }
            return;
        }

        $(current_node).attr("data-current-col", current_col+1);
        //right
    }

    if (key == 40) {
        addKey = false;
        event.preventDefault();
        // down
        if (row == parseInt($('#editor').attr('data-row'))) {return;}

        var downElement = $('#editor').find('div').eq(row),
            downElementCol = parseInt(downElement.attr('data-current-col')),
            downElementDOM;
        if (downElementCol == 0) { downElementDOM = false; } else { downElementDOM = $(downElement).find('span').eq(downElementCol-1)[0]; }

        downElement.focus();
        if (downElementDOM) {
            setCaret( downElementDOM );
        }

        var footerdata = "Line: " + downElement.attr('id') + ", Col: " + downElementCol;
        $("#footer-data").text(footerdata);
        return;
    }

    if (addKey == true) {
        event.preventDefault();
        var span = document.createElement('span');

        span.textContent = key_value;
        span.setAttribute('class', 'other');
        span.setAttribute('id', col);

        if (key == 9) { // Handle tab
            span.innerHTML = '&#x09;'
        }

        if (current_col == 0) { current_node.prepend(span); }
        else { 
            $(span).insertAfter($(current_node).find('span').eq(current_col-1)); 
        }
        $(current_node).find('span').each( correctID );

        $(current_node).attr("data-col", col+1);
        $(current_node).attr("data-current-col", current_col+1);

        var selector = $(current_node).find('span').eq(current_col);
        setCaret(selector[0]);
    }

    //Change the text in the footer
    var footerdata = "Line: " + current_node.attr('id') + ", Col: " + current_node.attr('data-current-col');
    $("#footer-data").text(footerdata);
}


function main() {
    $("#editor").click(function(event) {
        if (event.target.id == "editor") {
            var last_node = $("#editor div:last-child")
            $(last_node.last()).focus();
            // To get the end of the focused node;
        }
        //console.log(event.target.id);
    });

    $("#1").keydown( checkString )
}

$( document ).ready(main);
