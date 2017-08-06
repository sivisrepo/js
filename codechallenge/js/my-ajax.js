(function () {
    'use strict';
    window.MyAJAX = function () {
        function Empty() {}
        var me = this;
        me.options = {};
        me.req = undefined;

        // Define option defaults 
        var defaults = {
            type: "GET",
            error: Empty,
            contentLoaded: Empty
        };

        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = ExtendDefaults(defaults, arguments[0]);
        }

        // Don't do anything if no url is provided
        if (!this.options.url) {
            console.log("No URL provided");
            return false;
        }

        /************ Private ***************/

        /**
         * Extends default Values with passed options Object
         * @param  {object} source     [description]
         * @param  {object} properties [description]
         * @return {object}            [description]
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

        function CreateHTTPRequest() {
            var httpRequest = httpRequest = new XMLHttpRequest();
            if (httpRequest === undefined) {
                alert('Cannot create XMLHTTP instance');
                return false;
            }
            return httpRequest;
        }

        /**
         * Send GET Request
         */
        var GetRequest = function () {
            me.req = CreateHTTPRequest();

            me.req.onreadystatechange = StatesChanged.bind(me);
            me.req.open('GET', me.options.url);
            me.req.send();

        }

        /**
         * Call callback functions when the AJAX Request changes states
         */
        var StatesChanged = function () {
            var req = me.req;
            /*
            	possible states:
            	0: request not initialized (before open())
            	1: server connection established (before send())
            	2: request received (request was sent, headers may be available)
            	3: processing request (request is receiving data)
            	4: request finished and response is ready

             */
            switch (req.readyState) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                if (req.status === 200) {
                    me.options.contentLoaded(req.response);
                }
                break;

            }
        }

        function Init() {
            switch (me.options.type) {
            case "GET":
                GetRequest();
                break;
            case "POST":
                PostRequest();
            }
        }


        /******** Initialization ***********/
        Init();
    };
})();