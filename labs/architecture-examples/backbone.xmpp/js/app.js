var app = app || {},
    boshUrl = 'http://todomvc.crypho.com/http-bind';

app.start = function () {
    // Create our global collection of **Todos**.
    app.Todos.initialize([], {id: 'todos', connection: app.connection});
    Backbone.history.start();

    // Kick things off by creating the **App**.
    new app.AppView();
};

var ENTER_KEY = 13;

$(function() {


    // Connect to XMPP
    var XMPPConnection = new Strophe.Connection(boshUrl),
        chars = 'abcdefghijklmnopqrstuvwxyz',
        resource = '';

    // A random resource so that the same client can connect more than once
    for(var i=0; i < 5; i++) {
        resource += chars.charAt(Math.floor(Math.random() * chars.length));
    }


    XMPPConnection.connect('foo@localhost/' + resource, 'foo', function (status) {
        // Set the connection on the storage
        if (status === Strophe.Status.CONNECTED) {
            this.xmlInput = function (data) { console.log ('IN:', data);};
            this.xmlOutput = function (data) { console.log ('OUT:', data);};

            // Send online presence
            this.send($pres());

            // Save the connection
            app.connection = this;
            app.start();
        }
    });

});