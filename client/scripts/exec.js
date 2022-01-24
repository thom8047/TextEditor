import { getDropDown, closePopUp } from "./drop_down.js";
import colorCode from "./pythonColorCode";

// main module as of 9/12/21

$(document).ready(function () {
    console.log("ready");

    getDropDown();
    closePopUp();
    colorCode();
});
