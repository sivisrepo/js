(function () {
    'use strict';
    var exampleDialog = document.getElementById("exampleDialog");
    
    exampleDialog.addEventListener("click", function (ev) {
        ev.preventDefault();
        var newModal = new ModalWin({
            title: "My Modal",
            width: "95%",
            height: 400,
            contentURL: "./ajax-content.html",
            contentLoaded: function (data) {
               console.log("Daten wurden geladen");
            }
        });
    });
    
    /******** Lösung *********/
    var btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', function(ev){
       // ev.preventDefault();
        var newModal = new ModalWin({
            width: 600,
            title: 'Login',
            contentURL: "./login.html",
            contentLoaded: function (data) {
                var loginForm = document.getElementById('loginForm');
                var frag = document.createDocumentFragment();
                var reset = document.createElement('input');
                reset.type = 'reset';
                reset.className = 'pure-button pure-button-primary';
                reset.value = 'Reset';
                reset.style.marginLeft = '20px';
                loginForm.appendChild(reset);
            },
            beforeClose: function() {
                return confirm('Login wirklich schließen?');
            }
        });
    });

}());