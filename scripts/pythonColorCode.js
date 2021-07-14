// gloabls
currentRow = 1;
pyKeyWords = ["while","async","except","lambda","with","await","finally","nonlocal",
            "yield","break","for","import","return","as","elif","in","try","assert","else",
            "class","from","continue","global","pass","def","if","raise","del",
            
            "is","or","and","not",
        
            "False","None","True",
        
            "print"," input"," str"," int"," bool",
        
            '"', ".", "'", "	"];
unacceptableKeys = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

function checkForOccuranceOf(keyWord, text, start, current_node) {
    if (text.indexOf(keyWord, start) == -1) {return;}

    var occuranceIndex = text.indexOf(keyWord, start),
        end = occuranceIndex+keyWord.length
        specificNodes = $(current_node).children().slice(occuranceIndex, end),
        prevKey = text.slice(occuranceIndex-1, occuranceIndex),
        afterKey = text.slice(end, end+1);

    if (["is","or","and","not"].includes(keyWord)) {
        if (unacceptableKeys.includes(prevKey.toLowerCase()) || unacceptableKeys.includes(afterKey.toLowerCase())) {checkForOccuranceOf(keyWord, text, occuranceIndex+1, current_node); return;}

        specificNodes.each(function() {
            $(this).removeClass().addClass('operator-keys');
        });
    }

    else if (["False","None","True"].includes(keyWord)) {
        if (unacceptableKeys.includes(prevKey.toLowerCase()) || unacceptableKeys.includes(afterKey.toLowerCase())) {checkForOccuranceOf(keyWord, text, occuranceIndex+1, current_node); return;}

        specificNodes.each(function() {
            $(this).removeClass().addClass('value-keys');
        });
    } 

    else if (["print"," input"," str"," int"," bool"].includes(keyWord)) {
        if (unacceptableKeys.includes(prevKey.toLowerCase()) || unacceptableKeys.includes(afterKey.toLowerCase())) {checkForOccuranceOf(keyWord, text, occuranceIndex+1, current_node); return;}

        specificNodes.each(function() {
            $(this).removeClass().addClass('functional-keys');
        });
    } 

    else if (['"', ".", "'"].includes(keyWord)) {
        if (keyWord == "'" || keyWord == '"') {
            var findNextOccurance = text.indexOf(keyWord, occuranceIndex+1);
            if (findNextOccurance == -1) {
                specificNodes = $(current_node).children().slice(occuranceIndex);
            } else {
                specificNodes = $(current_node).children().slice(occuranceIndex, findNextOccurance+1);
                occuranceIndex = findNextOccurance;
            }
            specificNodes.each(function() {
                $(this).removeClass().addClass('string-keys');
            });
        } else {
            var findEnd = text.indexOf('(', occuranceIndex+1);
            if (findEnd == -1) {
                //pass
                //specificNodes = $(current_node).children().slice(occuranceIndex);
            } else {
                specificNodes = $(current_node).children().slice(occuranceIndex, findEnd);
                specificNodes.each(function() {
                    $(this).removeClass().addClass('functional-keys');
                });
            }
        }
    } 

    else if (['	'].includes(keyWord)) {
        specificNodes = $(current_node).children().slice(occuranceIndex, occuranceIndex+1);
        specificNodes.each(function() {
            $(this).removeClass().addClass('tab');
        });
    }

    else {

        // had to account for when the keyword was inside of a word, this is stupid, but needed. DON'T USE FOR STRINGS!
        if (unacceptableKeys.includes(prevKey.toLowerCase()) || unacceptableKeys.includes(afterKey.toLowerCase())) {checkForOccuranceOf(keyWord, text, occuranceIndex+1, current_node); return;}

        specificNodes.each(function() {
            $(this).removeClass().addClass('statement');
        });

        if (keyWord == 'def') {
            var endOfFunctionText = text.indexOf('(', end+1);
            if (! (endOfFunctionText == -1)) {
                var afterSpecifiedWords = $(current_node).children().slice(end+1, endOfFunctionText);
                afterSpecifiedWords.removeClass().addClass('functional-keys');
            }
        } else if (keyWord == 'class'){
            var endOfFunctionText = text.indexOf(':', end+1);
            if (! (endOfFunctionText == -1)) {
                var afterSpecifiedWords = $(current_node).children().slice(end+1, endOfFunctionText);
                afterSpecifiedWords.removeClass().addClass('class-keys');
            }
        }
    }

    checkForOccuranceOf(keyWord, text, occuranceIndex+1, current_node);
}

function colorCode(event) {
    // Check to see if we're focused on an editable div.
    if (! ($(document.activeElement).attr('class') == 'line') ) {return;}
    // Get the current tab's extension and now we can reference this to our known keywords 
    var currentFileType = $('#selected-tab').text().split('.')[1],
        current_node = $(document.activeElement),
        text = current_node.text();
    // remove the classes so we can set them. we need to leave the tabs alone, so we can have a cool tab css
    $(current_node).children().each(function() { 
        console.log($(this).attr('id'))
        if ($(this).attr('id') == 'tab') {
            console.log('tab');
        } else {
            console.log('other');
            $(this).removeClass().addClass('other'); }
        });

    for (const keyWord of pyKeyWords) {
        if (text.indexOf(keyWord) == -1) {continue;}
        checkForOccuranceOf(keyWord, text, 0, current_node);
    }
    /* 

    Notes of dumb ass thoughts:


    When text is updated, use this func with our keywords to check if string contains each keyword and if so
    then we can get a selection of the children using jQuery and .eq() and get the specific nodes from the length of the 
    keyword and from their change the class elements to a statement, this leaves all other span's uneffected. It is best
    time case, but we will need to account for the keywords possibly being changed by random changes.

    This could be solved by making all children elements class = other then specifically changing the keywords each keydown events

    Think of better solution!!!!

    As of July 14th, I'll use this script as a module and if it is a .py file then ill use this to run it and i can 
    make other color code scripts to use with different extensions
    */
}

function main() {
    $(document).on('keydown', colorCode);
}

$(document).ready(main)
