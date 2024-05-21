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
exports.AdminController = void 0;
const Order_1 = require("../models/Order");
const Products_1 = require("../models/Products");
class AdminController {
    admin_index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsDH = yield Order_1.Order.getNewOrder(5);
            // let dsSP:product[] = await product.getAll();
            let statusText = {
                "order": "Đã tiếp nhận",
                "shipping": "Đang giao hàng",
                "success": "Giao thành công",
                "cancel": "Đơn bị hủy",
            };
            res.render('admin_index', {
                title: 'Trang quản trị ',
                dsDH: dsDH,
                statusText: statusText,
            });
        });
    }
    orderDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let order = new Order_1.Order();
            order.id = id;
            yield order.getDetail();
            res.render('admin_order_detail', {
                title: 'chi tiết đơn hàng #' + id,
                order: order,
            });
        });
    }
    orderUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = req.body.status;
            let id = req.params.id;
            let order = new Order_1.Order();
            order.id = id;
            yield order.getDetail();
            order.status = status;
            yield order.updateCart();
            res.redirect(`/admin/order/${id}`);
        });
    }
    order(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsDH = yield Order_1.Order.getNewOrder();
            let statusText = {
                "order": "Đã tiếp nhận",
                "shipping": "Đang giao hàng",
                "success": "Giao thành công",
                "cancel": "Đơn bị hủy",
            };
            res.render('admin_order', {
                title: 'Quản lý đơn hàng',
                dsDH: dsDH,
                statusText: statusText,
            });
        });
    }
    product(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsSP = yield Products_1.product.getAll();
            res.render('admin_product', {
                title: 'Quản lý sản phẩm',
                dsSP: dsSP,
            });
        });
    }
    productUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let Product = new Products_1.product();
            Product.id = id;
            yield Product.getDetail();
            if (req.body.name && req.body.price && req.body.type) {
                Product.name = req.body.name;
                Product.price = req.body.price;
                Product.type = req.body.type;
                yield Product.update();
                res.redirect(`/admin/product/${id}/update`);
                console.log(Product.type);
            }
            res.render('admin_product_update', {
                title: 'Cập nhật sản phẩm #' + id,
                Product: Product,
            });
        });
    }
}
exports.AdminController = AdminController;
