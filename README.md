# TextEditor

A text editor in JavaScript, HTML, and CSS

Using jQuery for some of the more challenging DOM manipulation.

UPDATE!!!

Fixed up most bugs/cleaned code so now it'll follow that caret positioning rather then setting end of node contents!

Issues: 
- cannot use the mouse to move caret due to the programmatic nature of the caret position.
- depending on the situation, which hasn't arrised yet but may, the caret can be placed somewhere besides the correct spot
    - EVERY .keydown() WILL RESULT IN A FIX OF THE CARET PLACEMENT
- each line is it's own specific div and therefore you cannot select, copy, or paste
    - SOLUTION IS IN CREATING MY OWN VERSION OF SELECTION THROUGH THE Shift+Arrow KEYS
- when text is added, I haven't finished the colorCode.js script, so it is still wrong
- the file, run, and edit tabs only .log() the names of the classes that belong to the button. I need to start the code after I finish the colorCode.

Side Notes:
- most languages (Python, Java, JavaScript) have different keywords, but they also have different structures, though slight. This will be a challenging issue to overcome due to the fact that I will need to account for all generic occurances, such as the color of the text after the keyword "def" or "function" or "public", but then I'll also have to account for the specific occurances in the languages.

- I primarily made the lines of the editor broken up div's but only because of how I started. When I started from scratch to fix the letter placement (catch key inputs and halt and insert a span with the keyCode instead), I damn near fixed the issue I ran into when I started. I could probably have one contenteditable div that inserts all keys as spans and then I wouldn't have to worry so much about the caret placement, the selection making, or whatever other problems are being caused. Haven't actually tried to debug, but it'll rip apart my code and that sounds fucking hard.