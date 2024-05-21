"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Order_1 = require("../models/Order");
const Products_1 = require("../models/Products");
class ProductController {
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let sp = yield Products_1.product.getById(id);
            let dsTP = yield Products_1.product.getAllByType('topping');
            res.render('product_detail', {
                title: 'Chi tiết sản phẩm #' + id,
                sp: sp,
                dsTP: dsTP,
            });
        });
    }
    cart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let idUser = JSON.parse(localStorage.getItem('user') || '{"id": -1}').id;
            let cartData = yield Order_1.Order.hasCart(idUser);
            let cart = new Order_1.Order([]); // taoj 1 ddonw hangf mowis chuaaw cso sanr phaamr
            if (cartData) {
                cart.copy(cartData);
            }
            res.render('product_cart', {
                title: 'Giỏ hàng',
                cart: cart,
            });
        });
    }
    addToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let toppingIdList = req.body.toppingList;
            let toppingList = [];
            let ProductData = yield Products_1.product.getById(id);
            let Product = new Products_1.product();
            Product.copy(ProductData);
            Product.quantity = Number(req.body.quantity);
            if (toppingIdList) {
                if (!Array.isArray(toppingIdList)) {
                    toppingIdList = [toppingIdList];
                }
                console.log(toppingIdList);
                for (const idTP of toppingIdList) {
                    let topping = yield Products_1.product.getById(idTP);
                    toppingList.push(topping);
                }
                // console.log(toppingList);
                Product.addTopping(toppingList);
            }
            // let idUser: string = '1'; 
            let idUser = JSON.parse(localStorage.getItem('user') || '{"id": -1}').id;
            // let idUser: string = JSON.parse(localStorage.getItem('User')||'').id; 
            //thêm sản phẩm vào giỏ hàng 
            let cart = yield Order_1.Order.hasCart(idUser);
            if (!cart) {
                // nếu chưa có giỏ hàng -> tạo giỏ hàng
                cart = new Order_1.Order([Product], idUser);
                cart.createCart();
            }
            else {
                //Đã có giỏ hàng -> thêm sản phẩm
                let cartData = cart;
                cart = new Order_1.Order();
                cart.copy(cartData);
                cart.addProduct(Product);
            }
            res.redirect(`/detail/${id}`);
            // console.log(cart);
            // res.send('Đã thêm vào giỏ hàng');
            // res.render('product_detail',{
            //     title: 'Chi tiết sản phẩm #'+id,
            //     sp: sp,
            //     dsTP: dsTP,
            // });
        });
    }
    updateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let userId = JSON.parse(localStorage.getItem('user') || '{"id": -1}').id;
            ;
            let cartData = yield Order_1.Order.hasCart(userId);
            let cart = new Order_1.Order([]);
            if (cartData) {
                cart.copy(cartData);
            }
            let indexSP = Number(req.params.index);
            // let i:number = 0;
            if (cart.products) {
                if (req.params.action == 'up') {
                    cart.products[indexSP].quantity++;
                }
                else if (req.params.action == 'down') {
                    if (cart.products[indexSP].quantity > 1) {
                        cart.products[indexSP].quantity--;
                    }
                }
                else if (req.params.action == 'delete') {
                    (_a = cart.products) === null || _a === void 0 ? void 0 : _a.splice(indexSP, 1);
                }
            }
            yield cart.updateCart();
            res.redirect('/cart');
        });
    }
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = JSON.parse(localStorage.getItem('user') || '{"id": -1}').id;
            ;
            let cartData = yield Order_1.Order.hasCart(userId);
            if (cartData) {
                if (cartData.id) {
                    yield Order_1.Order.deleteCart(cartData.id);
                    res.redirect('/cart');
                }
            }
        });
    }
    checkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let userId = JSON.parse(localStorage.getItem('user') || '{"id": -1}').id;
            ;
            let cartData = yield Order_1.Order.hasCart(userId);
            let order = new Order_1.Order();
            if (cartData) {
                order.copy(cartData);
                let tongTien = 0;
                (_a = order.products) === null || _a === void 0 ? void 0 : _a.forEach(sp => {
                    let gia = 0;
                    if (sp.price)
                        gia += sp.price;
                    sp.topping.forEach(tp => {
                        if (tp.price)
                            gia += tp.price;
                    });
                    tongTien += gia * sp.quantity;
                });
                order.total = tongTien;
                order.date = new Date().toLocaleString('sv-SE');
                order.status = "order";
                yield order.updateCart();
                // res.redirect('/cart');
                res.send('Đặt hàng thành công!');
            }
        });
    }
}
exports.ProductController = ProductController;
