import {
    getDropDown,
    closePopUp,
    // saveFile,
    // openFile,
    newFile,
} from "./drop_down.js";
import colorCode from "./utils/ColorCode";

// main module as of 9/12/21

$(document).ready(function () {
    console.log("ready");
    $("#new-file").on("click", newFile);
    $("#open-file").on("click", function (event) {
        console.log("opening file");
        // openFile();
    });
    $("#save-file").on("click", function (event) {
        console.log("saving file");
        // saveFile($("#editor"));
    });
    getDropDown();
    closePopUp();
    colorCode();
});
