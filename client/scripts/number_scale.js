function createNumbers() {
    var scale = $('#number_scale')

    for (let i = 1; i < 2; i++) {
        var number = document.createElement('div');
        $(number).attr('id', i); $(number).text(i)

        scale.append(number);
    }
}



export { createNumbers }