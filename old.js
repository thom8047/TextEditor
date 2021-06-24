/* function setEndOfContenteditable(contentEditableElement) 
{
    var range, selection;
    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement)//, end);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        //console.log(range);
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
}

// Change code above ^ to set to a certain position! Making a jQuery object and setting the focus will NOT put the caret in 
// the end of the div; need to account for issue */
/*

function setCaretData(editableDiv) {
    let _range = document.getSelection().getRangeAt(0)
    let range = _range.cloneRange()
    range.selectNodeContents(editableDiv)
    range.setEnd(_range.endContainer, _range.endOffset)
    let len = editableDiv.textContent.split('').length; //range.toString().length
    
    $(editableDiv).data("col", len+1);
} 

function setCaret(editableDiv, pos) {
    if (pos == false) {
        try {
            let sel = document.getSelection();
            let all = sel.selectNodeContents;
            all.collapse(false);
        } catch(error) { // Error was being thrown because the caret would usually sit 1 ahead of where it actually was
            console.log(error);
        }
    } else {
        var isThereYet = true,
            lower = pos;
        while (isThereYet) {
            try {
                document.getSelection().collapse(editableDiv, lower);
                isThereYet = false;
            } catch(error) {
                console.log(error);
                isThereYet = true;
                lower -= 1;
            } 
            
        }
        
    }
}

function correctID(index) {
    $(this).attr("id", index+1);
    console.log(index);
    //console.log(index, $(this).attr("id"));
}

function fetchHTML(current_node, text, _this, row) {
    var keywords = ["False", "await", "else", "import", "pass", "None", "break", "except", "in", "raise", "True", "class", 
        "finally", "is", "return", "and", "continue", "for", "lambda", "try", "as", "def", "from", "nonlocal", "while", 
        "assert", "del", "global", "not", "with", 
        "async", "elif", "if", "or", "yield"],
        newHTML = "";


    text.split('').forEach(function(v, i) {
        // if (keywords.includes(v)) {
          //  newHTML += "<span class='statement'>" + v + "</span>";
        //} else {
          //  newHTML += "<span class='other'>" + v + "</span>";
        //} 
    });

    current_node.html(newHTML);
    setCaret(row, false)
    //setEndOfContenteditable(_this);
}

function checkString(event) {
    var current_node = $(document.activeElement),
        row = document.getElementById(parseInt(current_node.attr("id")))
        col = $(current_node).data("col");
        text = this.textContent, 
        key = event.keyCode,
        key_value = event.key,
        addKey = true;
    
    $("br").remove();
    $(this).children('div').remove();

    console.log(current_node)

    if (key == 8) {
        addKey = false;
        
        if (text == '') {
            event.preventDefault();
            var current_id = parseInt(current_node.attr("id")),
                prev = current_id - 1,
                pos = $(current_node).data("col");
            if (current_id == 1) {return;}

            current_node.remove();
            $(".line").each( correctID );

            setCaret(document.getElementById(prev), false)
        }
        var current_id = parseInt(current_node.attr("id")),
            prev = current_id - 1,
            pos = $(current_node).data("col");

        //setCaretData(row);
        $(current_node).data("col", pos - 1);
        $(row).remove("#"+pos);
            //setEndOfContenteditable(document.getElementById(prev));
    }

    if (key == 9) {
        addKey = false;
        event.preventDefault();
        // Find out if you can re-run code that changes text and add in this tab key below where ever you are.
        //&#x09;
    }

    if (key == 13) {
        addKey = false;
        event.preventDefault();

        var current_id = parseInt(current_node.attr("id")),
            next = current_id + 1,
            obj = "<div class='line' id=" + next + " contenteditable='true'></div>";
        
        //$("#editor").append(obj);
        current_node.after($(obj));

        $(".line").each( correctID ); $('#'+next).keydown( checkString );

        //setCaret(document.getElementById(next), false)
        $('#'+next).focus();
        //setEndOfContenteditable(document.getElementById(next));
        //return;
    }

    if (key == 37) {
        addKey = false;
        col -= 1;
        //left

    }

    if (key == 38) {
        addKey = false;
        // UP
        event.preventDefault();
        var current_id = parseInt(current_node.attr("id")),
            prev = current_id - 1,
            pos;

        try {
            pos = $(row).data("col")
            console.log(pos);
        } catch(error) {
            console.log("no caretPos logged")
        }

        if (current_id != 1) {
            //$('#'+prev).focus();
            setCaret(document.getElementById(prev), pos)
        }
    }

    if (key == 39) {
        addKey = false;
        col += 1;
        //right
    }

    if (key == 40) {
        addKey = false;
        // DOWN
        event.preventDefault();
        var current_id = parseInt(current_node.attr("id")),
            next = current_id + 1;

        try{
            $('#'+next).focus();
        } catch(error) {
            console.log("Cannot go down anymore")
        }
    }

    if (key == 32) {
        //space
    }

    if (addKey == true) {
        event.preventDefault();
        var span = document.createElement('span'),
            pos = $(row).data("col");

        if (key == 32) {
            //space
            key_value = ' ';
        }

        span.textContent = key_value;
        span.setAttribute('class', 'other');
        span.setAttribute('id', pos);
        //$(row, '#'+pos).after(span);
        row.appendChild(span);
        $(row, "span").each( correctID );

        //setCaretData(row);
        $(row).data("col", pos+1);
        setCaret(this, pos)
    }
} */