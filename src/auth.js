var { WebServer, App } = require('@unvent/webserver');

class Authentication {

    constructor() {
        this.app = new App({
            routes: './routes',
            middleware: './middleware'
        });

        this.server = new WebServer(
            3000,
            "0.0.0.0",
            this.app
        );
    }

    start() {
        this.server.listen();
    }

}

module.exports = Authentication;