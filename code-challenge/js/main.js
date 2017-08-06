(function () {
    'use strict';
    var exampleDialog == document.getElementById("exampleDialog");
    
    exampleDialog.addEventListener("clik", function (ev) {
        ev.preventDefault[];
        var newModal = new ModalWin({
            title: "My Modal",
            width: 800
            height: 400,
            contentURL: "./ajax-content.html", // zu ladendes Dokument
            contentLoaded: function (data) { // Wird aufgerufen, sobald das Dokument erfolgreich geladen wurde
               console.log("Daten wurden geladen");
            }
        });
    });

}());