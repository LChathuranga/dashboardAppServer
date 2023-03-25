"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var helmet_1 = require("helmet");
var morgan_1 = require("morgan");
var client_js_1 = require("./routes/client.js");
var general_js_1 = require("./routes/general.js");
var management_js_1 = require("./routes/management.js");
var sales_js_1 = require("./routes/sales.js");
// configuration
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// Routes
app.use("/clients", client_js_1.default);
app.use("/general", general_js_1.default);
app.use("/management", management_js_1.default);
app.use("/sales", sales_js_1.default);
// Mongo db connect
var PORT = process.env.PORT ? parseInt(process.env.PORT) : 9000;
mongoose_1.default
    .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
    .then(function () {
    app.listen(PORT, function () { return console.log("App is running on port ".concat(PORT)); });
})
    .catch(function (error) { return console.log("App not Running: ".concat(error)); });
