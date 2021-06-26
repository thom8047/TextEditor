function colorCode(text) {
    /* 
    Link this script to the event of every div so we can continuously check when the text is updated;
    When text is updated, use loop of keywords to check if string contains each keyword and if so
    then we can get a selection of the children using jQuery and .eq() and get the specific nodes from the length of the 
    keyword and from their change the class elements to a statement, this leaves all other span's uneffected. It is best
    time case, but we will need to account for the keywords possibly being changed by random changes.

    This could be solved by making all children elements class = other then specifically changing the keywords each keydown events

    Think of better solution!!!!
    */
}
