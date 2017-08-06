/**
 * Create a modal Dialog, load content with ajax or pass content String
 * Dependent on mw-ajax.js/jquery AJAX
 */
(function () {
    // Define our constructor
    window.ModalWin = function () {
        var me = this;
        // Create global element references
        me.closeButton = null;
        me.titleBar = null;
        me.modal = null;
        me.overlay = null;
        me.contentURL = null;
        me.contentLoaded = Empty;
        me.beforeClose = Empty;
        me.options = {};

        // Default Function, do nothing
        function Empty() {};

        // Determine proper prefix
        this.transitionEnd = TransitionSelect();

        // Define option defaults
        var defaults = {
            title: 'Modal Dialog',
            autoOpen: true,
            className: 'fade-and-drop',
            closeButton: true,
            content: '',
            contentURL: '',
            contentLoaded: Empty(),
            beforeClose: Empty(),
            maxWidth: '90%',
            minWidth: 280,
            minHeight: 40,
            maxHeight: '90%',
            height: 0,
            width: 0,
            overlay: true
        };

        /************* Public ***************/
        /* Public */

        this.Close = function () {
            // beforeClose muss true oder false zurück geben. Bei false wird der Dialog nicht geschlossen
            if (typeof (me.options.beforeClose) === 'function') {
                if (me.options.beforeClose() === false) {
                    return;
                }
            }
            
            me.modal.classList.remove("mw-open");
            me.overlay.classList.remove("mw-open");

            // remove from parent after transition ended
            me.modal.addEventListener(me.transitionEnd, function () {
                me.modal.parentNode.removeChild(me.modal);
            });

            me.overlay.addEventListener(me.transitionEnd, function () {
                if (me.overlay.parentNode) {
                    me.overlay.parentNode.removeChild(me.overlay);
                }
            });
            
        };

        /* Private */

        /**
         *   Erzeugt die HTML Elemente und initialisiert den Dialog
         */
        function Open() {
            Create();
            InitializeEvents.call(me);
            /*
             * After adding elements to the DOM, use getComputedStyle
             * to force the browser to recalc and recognize the elements
             * that we just added. Now the CSS animation has a start point
             */
            var dummy = window.getComputedStyle(me.modal).height;

            me.modal.className = me.modal.className +
                (me.modal.offsetHeight > window.innerHeight ?
                    " mw-open mw-anchored" : " mw-open");

            me.overlay.className = me.overlay.className + " mw-open";
        };


        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = ExtendDefaults(defaults, arguments[0]);
        }

        if (this.options.autoOpen === true) {
            Open();
        }

        function Create() {
            var contentHolder;
            var docFrag;
            var opts = me.options;

            // Create a DocumentFragment to build with
            docFrag = document.createDocumentFragment();

            // Create modal element
            me.modal = document.createElement("div");
            me.modal.className = "mw-modal " + me.options.className;

            // set minwidth/minheight, width/height. Can be set to percent if passed as string, else "px" will be appended
            if (typeof opts.minWidth === "string") {
                me.modal.style.minWidth = opts.minWidth;
            } else {
                me.modal.style.minWidth = opts.minWidth + "px";
            }

            if (typeof opts.maxWidth === "string") {
                me.modal.style.maxWidth = opts.maxWidth;
            } else {
                me.modal.style.maxWidth = opts.maxWidth + "px";
            }

            if (opts.height !== 0) {
                if (typeof opts.height === "string") {
                    me.modal.style.height = opts.height;
                } else {
                    me.modal.style.height = opts.height + "px";
                }
            }

            if (opts.width !== 0) {
                if (typeof opts.width === "string") {
                    me.modal.style.width = opts.width;
                } else {
                    me.modal.style.width = opts.width + "px";
                }
            }

            // Create Titlebar
            if (opts.title !== '') {
                me.titleBar = document.createElement("div");
                me.titleBar.className = "mw-modal-title";
                me.titleBar.innerHTML = opts.title;
                me.modal.appendChild(me.titleBar);
            }

            // If closeButton option is true, add a close button
            if (opts.closeButton === true) {
                me.closeButton = document.createElement("button");
                me.closeButton.className = "mw-close-button";
                me.closeButton.innerHTML = "&times;";
                if (me.titleBar !== null) {
                    me.titleBar.appendChild(me.closeButton);
                } else {
                    me.modal.appendChild(this.closeButton);
                }
            }

            // If overlay is true, add one
            if (opts.overlay === true) {
                me.overlay = document.createElement("div");
                me.overlay.className = "mw-overlay " + opts.className;
                docFrag.appendChild(me.overlay);
            }

            // Create content area and append to modal
            contentHolder = document.createElement("div");
            contentHolder.className = "mw-modal-content";

            // Load Content via AJAX if contentURL is provided
            if (opts.contentURL !== null) {
                // prevent caching
                var now = new Date();
                var aj = new MyAJAX({
                    url: opts.contentURL + '?_now=' + now,
                    contentLoaded: function (data) {
                        contentHolder.innerHTML = data;
                        opts.contentLoaded.call(me, data);
                        
                    }
                });
            } else if (typeof opts.content === "string") {
                //If content is an HTML string, append the HTML string.
                contentHolder.innerHTML = opts.content;
            } else {
                //	 If content is a domNode, append its content.
                contentHolder.innerHTML = opts.content.innerHTML;
            }

            me.modal.appendChild(contentHolder);

            // Append modal KeyCode.To DocumentFragment
            docFrag.appendChild(me.modal);
            // Append DocumentFragment to body
            document.body.appendChild(docFrag);

        }

        /**
         *   Extending the defaults with config
         */
        function ExtendDefaults(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }

        /**
         *   Set up the important events
         */
        function InitializeEvents() {
            if (me.closeButton) {
                me.closeButton.addEventListener('click', this.Close);
            }

            if (me.overlay !== null) {
                me.overlay.addEventListener('click', this.Close);
            }

        }

        function TransitionSelect() {
            var el = document.createElement("div");
            if (el.style.WebkitTransition) {
                return "webkitTransitionEnd";
            }
            if (el.style.OTransition) {
                return "oTransitionEnd";
            }
            return 'transitionend';
        }
    };
}());