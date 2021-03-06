// DEPRECATED

function getText(editor) {
    var str = "";
    editor.children().each(function () {
        str = `${str}${$(this).text()}\n`;
    });
    return str;
}

function dropBindClick(id, editor) {
    //get data
    if (id.includes("file")) {
        if (id.includes("save")) {
            var data = {};
            data.name = editor.attr("data-name"); //"blank.txt";
            data.content = getText(editor);
            data.accessed = 0;
            data.file_no = 0;
            data.type = id.split("-file")[0];

            $.ajax({
                // use to get and save data created.
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                url: "/data",
                success: function (data) {
                    console.log(JSON.stringify(data));
                },
            });
        }

        if (id.includes("open")) {
            $.ajax({
                // use to get and save data created.
                type: "GET",
                url: "/data",
                success: function (data) {
                    var file_names = JSON.stringify(data); // split this json string to cut out the brackets that make it look like a list, but really a string

                    file_names.split(",").forEach(function () {
                        // we need to create a popup window and fill it with this content, only to cross reference with whatever we currently have open
                    });
                    // have to correctly adjust from a JSON string to a list, so we could enumerate through.
                },
            });
        }

        if (id.includes("new")) {
            // this is where we need to push a new file, all front end
        }
    }
}

function main() {
    $(".dropdown button").each(function (index) {
        var which = $(this).attr("id"),
            dropdown = "#" + which + "-dropdown",
            drop_div = $(".dropdown").find(dropdown),
            drop_buttons = drop_div.children();

        // once we get buttons now we have to clear the dropdowns every time we click out of the div
        $(".dropdown button").blur(function () {
            setTimeout(() => {
                $(drop_div).css("display", "none");
            }, 100);
        });
        // for each button in the dropdown, add click events...
        drop_buttons.each(function (index) {
            // add the click event, it won't need to be altered so we can add when the doc is ready
            $(this).on("click", function (event) {
                /* send in the id of the clicked element, this is where we'll make a function for each button =/ that'll 
                take forever */
                dropBindClick(
                    $(this).children().first().attr("id"),
                    $("#editor")
                );
            });
        });

        $(this).click(function (event) {
            // variables for main toolbar buttons
            var which = $(this).attr("id"),
                dropdown = "#" + which + "-dropdown",
                drop_div = $(".dropdown").find(dropdown),
                drop_buttons = drop_div.children();

            // we need to first actually view the div so heres that
            drop_div.css("display", "block");
        });
    });
}

export default function getDropDown() {
    main();
}

/*  8/7/21
This script will be different for both sides of the project!, at least the "File > Open, Save, New" will
*/
