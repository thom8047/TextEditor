import { genericEditor } from "./display.js";
import { NoEditorError } from "./utils/Errors";

function getText(editor) {
    var str = "";
    editor.children().each(function () {
        str = `${str}${$(this).text()}\n`;
    });
    return str;
}

function openAll() {
    let fileDomElementList = [];
    $("#popup-content-files")
        .children()
        .each(function () {
            if ($(this).attr("data-selected") == "true") {
                fileDomElementList.push($(this).text());
            }
        });

    // Code needs to be pulling from file.json

    fade();
}

function fade() {
    var explorer = $(".FileExplorer"),
        backdrop = $("#full-screen-popup-background"),
        popup = $("#popup-background");

    backdrop.css({
        opacity: "0",
    });
    popup.css({
        opacity: "0",
    });
    setTimeout(() => {
        explorer.css({
            display: "none",
        });
    }, 500);
}

function closePopUp() {
    $("#popup-navbar-x").on("click", (event) => {
        $("#popup-content-files")
            .children()
            .each(function () {
                $(this).remove();
            });
        fade();
    });
    $("#full-screen-popup-background").on("click", (event) => {
        fade();
        $("#popup-content-files").empty();
    });
}

function openFile(id) {
    var explorer = $(".FileExplorer"),
        backdrop = $("#full-screen-popup-background"),
        popup = $("#popup-background");

    explorer.css({
        display: "flex",
    });
    setTimeout(() => {
        backdrop.css({
            opacity: "0.5",
        });
        popup.css({
            opacity: "1",
        });
    }, 1);
}

function saveFile(id, editor) {
    // This likely can stay the same. When we save/save as this code will do it
    /* For save-as we will need to generate a new file name, and add a new, random file_no */
    try {
        if (Object.keys(editor).length <= 0) {
            throw NoEditorError;
        }

        var data = {};
        data.name = editor.attr("data-name"); //"blank.txt";
        data.content = getText(editor);
        data.accessed = 0;
        data.file_no = editor.attr("data-file-number");
        data.type = "save"; //id.split('-file')[0];

        if (editor.attr("saved") == "true") {
            console.log("Already saved");
            return;
        } else {
            editor.attr("saved", true);
            $("#selected-tab").children().eq(0).attr("id", "exit-saved");
        }

        $.ajax({
            // use to save data created.
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            url: "/data",
            success: function (data) {
                console.log("saved");
            },
            error: function (err) {
                console.log("not saved", err);
            },
        });
    } catch (err) {
        console.error(err);
    }
}

function bindClickEvent(id, editor) {
    if (id.includes("file")) {
        if (id.includes("new")) {
            // better yet, let's push a new editor out, and if we save it, we'll check if file exists in back-end and add new row
            // create new row within table, so we'd "post" to data to push our new file
            var today = new Date(),
                date =
                    today.getFullYear() +
                    "/" +
                    (today.getMonth() + 1) +
                    "/" +
                    today.getDate();

            // access the json file and hopefully find a way to write to it!!!
            genericEditor(
                "untitled.*",
                `# ${date}\n# ?? 2021 Edward Thomas; All rights reserved`,
                100
            );
        }

        if (id.includes("open")) {
            // pass in the function to call ajax request when the right file name is clicked; IT NEEDS TO BE IN THIS SCRIPT!!
            openFile(id);
        }

        if (id.includes("save")) {
            saveFile(id, editor);
        }
    }
}

// keeping the original main script, here I will clean up as needed
function main() {
    $(".dropdown button").each(function (index) {
        let which = $(this).attr("id"),
            dropdown = "#" + which + "-dropdown",
            drop_div = $(".dropdown").find(dropdown);

        // once we get buttons now we have to clear the dropdowns every time we click out of the div
        $(".dropdown button").blur(function () {
            setTimeout(() => {
                $(drop_div).css("display", "none");
            }, 100);
        });

        $(this).click(function (event) {
            // we need to first actually view the div so heres that
            drop_div.css("display", "block");
        });
    });

    // for each button in the dropdown, add click events...
    $(".dropdown-content div")
        .children()
        .each(function (index) {
            // add the click event, it won't need to be altered so we can add when the doc is ready
            $(this).on("click", function (event) {
                bindClickEvent($(this).attr("id"), $("#editor"));
            });
        });
}

function getDropDown() {
    // pass in function to create a new editor with name and content, that way we can use that thing to populate the file
    // can't actually
    main();
}

export { getDropDown, openFile, closePopUp, fade, saveFile };
