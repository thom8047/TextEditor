function clear(scale) {
    if (scale.children().length < 1) {
        return;
    }
    scale.children().each(function (index) {
        $(this).remove();
    });
}

function createNumbers(n, remove) {
    var scale = $("#number_scale");

    if (remove) {
        clear(scale);
    }

    for (let i = 1; i < n + 1; i++) {
        var number = document.createElement("div");
        $(number).attr("id", i);
        var str = `${i}|`;
        $(number).text(str);

        scale.append(number);
    }
}

export { createNumbers };
