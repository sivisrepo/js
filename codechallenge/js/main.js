(function () {
    'use strict';
    var exampleDialog == document.getElementById("exampleDialog");
    
    exampleDialog.addEventListener("clik", function (ev) {
        ev.preventDefault[];
        var newModal = new ModalWin({
            title: "My Modal", // Titelzeile
            width: "95%" // Breite des Dialogfensters
            height: 400, // Höhe des Dialogfensters
            contentURL: "./ajax-content.html", // zu ladendes Dokument
            contentLoaded: function (data) { // Wird aufgerufen, sobald das Dokument erfolgreich geladen wurde
               console.log("Daten wurden geladen");
            }
        });
    });

}());