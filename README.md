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
- when text is added, the colors primarily work right. Still complicated though.
- the file, run, and edit tabs only .log() the names of the classes that belong to the button. I need to start the code after I finish the colorCode.

6/29/2021
- update the tab when encountering the tabular key at the end, needs to figure how many tabs were in the beginning of the line, then tab that many plus 1.
- update coloring of integers for correctness.

7/21/2021
- didn't like how original code was written, ended up redoing all code by breaking the system into a generic delivery. Whether new or opened file, we could build an editor div thats' css was taken care of by the code. This allowed a simple way of being able to "toggle" through the opened files, and allow for blank files to be opened and correctly set up to be updated via an editor script that's pulled into the main display script. 

8/4/2021
- The editor can now be used as of version 2.4.0
- CAN use mouse to move caret
- The caret can still randomly move or sit in a spot that isn't where it's supposed to be. As of now I have made every precaution I can think of to keep caret placed in the correct spot. This includes clicking inside the editor, clicking in a specific line, and clicking at a specific character to type before or after it. The keys to move up, down, left and right also should correctly place caret without fail, so unless one was trying to break the editor, there likely is no need for more effort to be put into this issue.
- Select, copy and paste is still an issue, I have yet to add hotkeys: | 'Shift-C' etc | and due to the way I have set up the ditor, I will have to write in the code that selects multi-lined text. This will be implemented last due to other issues taking precedence.
- Text coloring does work, but I'll likely tweak the code to fit my own needs at a later time
- The dropdowns are currently being editted. As of now, the open file works and can open a file in ones directory.

I have added a Node.JS back-end to serve the front end. This can now become a website that I may host on portfolio.

(Possible) Future features:
- Database access to open/save files instead of local file access. This is for security, but I would need to properly secure the database acess from the server side, making it an interesting project. The database schema is also really cool, I'd like a directory-like shema and a non-relational db could probably be the route.
- Instead of pushing it as a webpage, I'd like to make it a desktop application. I need to research more for how to accomplish this, and whether I can transition the HTML, CSS< and JavaScript directly over, but this would be a cooler project is I did.


8/7/21
- Got database imlplementation started
- Fixed caret bugs, such as moving up and down
- Line breaks that would "soft-wrap" the `class='line'` div have been removed and now we don't need to worry about updating the numbering row accordingly. Though because of the nature of the div, we can implement a soft-wrap feature easily.
- Moved the tab div out of the parent div with editor divs
- Added number row, with correct scrolling to compliment

NEXT STEPS:

    1.) Try to see how well this whole app would shift to an Desktop application.
    2.) Build out postgres db to fit the needs of a ajax request
    3.) Depending on 1), continue with a web-browser feature

I think it's funny, the postgres Open feature can be used along with the FileReader obj. We can check name, and content to see similarities and from their proceed to create a new row in table or to use existing one. This way we can always view all our rows in a subpage of the app, hopefully in a hierarchy fashion. eg:

    /c/
     |
     +----- Desktop
     |         |
     |         +----- Some File
     |         |
     |         |_____ Some File
     |
     |
     |
     |_____ Documents
               |
               +----- Some Folder
               |           |
               |           |
               |           |_________________ etc...
               |           
               |           
               |_____ Some File

As of 08/20/2021

The db has an interface with user, opening up the pop up menu, pulling all file names and populating them to the user. From here we'll query the content when opened, and "read" the content line by line to put it into a new editor.

Updates soon

As of 9/11/2021  # shoutout Saylor birthday, and rip 9/11
I have done a handful of things:
- I have created my own file explorer
- I have used this file explorer to extract data from database and display it
- I can open single/multiple files at a time

This comes with a caveat, I need to pull all the random code out of the display module and organize it correctly so I am using this plug and play method correctly.

# THE DISPLAY MODULE MAY NOT WORK WHEN PULLED, BUT I BELIEVE IT SHOULD

Other complex, yet achievable things:
- I need to not allow files to be populated more than once, nming convention does not allow.
- I need to pull the content from the database to be populated.
- Add in a check system to see when files are saved or not
- Removing files with the x in the top tab
- I need to rearrange all the code into a new "MAIN" module script that allows for some clarity to what belongs where.
- I still need to write in the NEW FILE code, so I can populate a blank sheet with an unsavable name? 
    - This get's way more complicated because this wouldn't be saved, it would be a save as in an actual editor, so fuck
    - SIKE, I can just have it prompt the user for a name and extension type, which will allow for no repeat names and to control the extension type in need be.


Until all of this is done, I cannot work on the color coding script. 


ADD ON - HOT KEYS

CTRL-S : save
CTRL-U : upper
CTRL-L : lower
CTRL-A : select all
