"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const Database_1 = require("../Database");
let DB = new Database_1.Database();
class admin {
    constructor(name, price, type, image) {
        this.topping = [];
        this.quantity = 0;
        this.name = name;
        this.price = price;
        this.type = type;
        this.image = image;
    }
}
exports.admin = admin;
