
let config = require('./webpack.config.js');
// require('webpack')(config);


let connect = require("connect"),
    serveStatic = require("serve-static");

let app = connect();
app.use(serveStatic(config.output.path + "/.."));
app.listen(3000);
console.log("Listening at http://localhost:3000");