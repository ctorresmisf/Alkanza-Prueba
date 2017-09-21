function getId(id){
    return document.getElementById(id);
}

function preppend(elem) {
    var result = getId('results');
    result.insertBefore(elem, result.childNodes[2]);
    getId("without-results").style.display = 'none';
}

function getRadioValue(name) {
    var radios = document.getElementsByName(name);

    for (var index = 0, length = radios.length; index < length; index++) {
        if (radios[index].checked) {
            return radios[index].value;
        }        
    }

    return false;
}

function showMessage(msg, type) {
    reset();
    alertify.set({ delay: 3000 });
    if (type == 'success') {
        alertify.success(msg);
    }else if (type == 'error') {
        alertify.error(msg);
    }else{
        alertify.log(msg);
    }
    return false;
}

getId('up').addEventListener('click', function() {
    getId('up').style.display = 'none';
    getId('down').style.display = 'block';
    getId('poll-body').style.display = 'none';
});

getId('down').addEventListener('click', function() {
    getId('up').style.display = 'block';
    getId('down').style.display = 'none';
    getId('poll-body').style.display = 'block';
});

getId('r-up').addEventListener('click', function() {
    getId('r-up').style.display = 'none';
    getId('r-down').style.display = 'block';
    getId('results').style.display = 'none';
});

getId('r-down').addEventListener('click', function() {
    getId('r-up').style.display = 'block';
    getId('r-down').style.display = 'none';
    getId('results').style.display = 'block';
});

function reset () {
    $("#toggleCSS").attr("href", "alertify/themes/alertify.default.css");
    alertify.set({
        labels : {
            ok     : "OK",
            cancel : "Cancel"
        },
        delay : 5000,
        buttonReverse : false,
        buttonFocus   : "ok"
    });
}


