function setEndOfContenteditable(contentEditableElement)
{
    var range, selection;
    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if (document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}


/* function getCaretPosition(editableDiv) {
    var caretPos = 0,
        sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode == editableDiv) {
                caretPos = range.endOffset;
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
} */

function correctID(index) {
    $(this).attr("id", index+1);
    //console.log(index, $(this).attr("id"));
}

function checkString(event) {
    var keywords = ["False", "await", "else", "import", "pass", "None", "break", "except", "in", "raise", "True", "class", 
    "finally", "is", "return", "and", "continue", "for", "lambda", "try", "as", "def", "from", "nonlocal", "while", "assert", "del", "global", "not", "with", 
    "async", "elif", "if", "or", "yield"]

    var current_node = $(document.activeElement),
        text = this.textContent, 
        key = event.keyCode,
        newHTML = "";

    console.log(key);

    if (key == 9) {
        event.preventDefault();
        // Find out if you can re-run code that changes text and add in this tab key below where ever you are.
        //&#x09;
    }

    if (key == 13) {
        event.preventDefault();

        var current_id = parseInt(current_node.attr("id")),
            next = current_id + 1
            obj = "<div class='line' id=" + next + " contenteditable='true'></div>";
        
        //$("#editor").append(obj);
        current_node.after($(obj));

        $(".line").each( correctID );

        $('#'+next).keydown( checkString )
        setEndOfContenteditable(document.getElementById(next));
    }

    if (key == 38) {
        // UP
        var current_id = parseInt(current_node.attr("id"));
            prev = current_id - 1

        if (current_id != 1) {
            $('#'+prev).focus();
        }
    }

    if (key == 40) {
        // DOWN
        var current_id = parseInt(current_node.attr("id"));
            next = current_id + 1

        try{
            $('#'+next).focus();
        } catch(error) {
            console.log("Cannot go down anymore")
        }
    }

    if (key == 32) {
        text.split(' ').forEach(function(v, i) {
            if (keywords.includes(v)) {
                newHTML += "<span class='statement'>" + v + " </span>";
            } else {
                newHTML += "<span class='other'>" + v + " </span>";
            }
        });

        current_node.html(newHTML);
        setEndOfContenteditable(this);
    }
}

function main() {
    $("#editor").click(function(event) {
        if (event.target.id == "editor") {
            var last_node = $("#editor div:last-child")
            last_node.focus();
        }
        //console.log(event.target.id);
    });

    $("#1").keydown( checkString )
}

$( document ).ready(main);
