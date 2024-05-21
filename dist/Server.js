"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const PageController_1 = require("./controlers/PageController");
const ProductController_1 = require("./controlers/ProductController");
const UserController_1 = require("./controlers/UserController");
const AdminController_1 = require("./controlers/AdminController");
const SanPhamController_1 = require("./controlers/SanPhamController");
const node_localstorage_1 = require("node-localstorage");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 5000;
    }
    start() {
        global.localStorage = new node_localstorage_1.LocalStorage('./storage');
        this.app.set('view engine', 'ejs');
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use('/public', express_1.default.static('public'));
        this.app.use(function (req, res, next) {
            res.locals.baseURL = 'http://localhost:5000/';
            res.locals.user = JSON.parse(localStorage.getItem('user') || '{"id": -1}');
            next();
        });
        this.app.get('/', new PageController_1.PageController().index);
        this.app.get('/login', new UserController_1.UserController().login);
        this.app.post('/login', new UserController_1.UserController().login);
        this.app.get('/logout', new UserController_1.UserController().logout);
        this.app.get('/register', new UserController_1.UserController().register);
        this.app.post('/register', new UserController_1.UserController().register);
        this.app.get('/detail/:id', new ProductController_1.ProductController().detail);
        this.app.post('/detail/:id', new ProductController_1.ProductController().addToCart);
        this.app.get('/cart', new ProductController_1.ProductController().cart);
        this.app.get('/cart/:index/:action', new ProductController_1.ProductController().updateCart);
        this.app.get('/cart/delete', new ProductController_1.ProductController().deleteCart);
        this.app.get('/cart/checkout', new ProductController_1.ProductController().checkout);
        this.app.get('/product', new SanPhamController_1.SanPhamController().product);
        this.app.get('/product/tea', new SanPhamController_1.SanPhamController().Tea);
        this.app.get('/product/MilkTea', new SanPhamController_1.SanPhamController().MilkTea);
        this.app.get('/product/Chocolate', new SanPhamController_1.SanPhamController().Chocolate);
        this.app.get('/product/topping', new SanPhamController_1.SanPhamController().Topping);
        this.app.get('/product/Hi-Tea', new SanPhamController_1.SanPhamController().Hi_Tea);
        this.app.get('/admin', new AdminController_1.AdminController().admin_index);
        this.app.get('/admin/order', new AdminController_1.AdminController().order);
        this.app.get('/admin/order/:id', new AdminController_1.AdminController().orderDetail);
        this.app.post('/admin/order/:id', new AdminController_1.AdminController().orderUpdate);
        this.app.get('/admin/product', new AdminController_1.AdminController().product);
        this.app.get('/admin/product/:id/update', new AdminController_1.AdminController().productUpdate);
        this.app.post('/admin/product/:id/update', new AdminController_1.AdminController().productUpdate);
        this.app.listen(this.port, () => {
            console.log(`App đang chạy: http://localhost:${this.port}`);
        });
    }
}
exports.Server = Server;
