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
exports.SanPhamController = void 0;
const Products_1 = require("../models/Products");
class SanPhamController {
    product(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsSP = yield Products_1.product.getAll();
            res.render('Product', {
                title: 'Trang Sản Phẩm',
                dsSP: dsSP
            });
            // console.log(dsSP);
        });
    }
    Tea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsSP = yield Products_1.product.getAllByType('tea');
            res.render('Product', {
                title: 'Trang Sản Phẩm',
                dsSP: dsSP
            });
        });
    }
    MilkTea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsSP = yield Products_1.product.getAllByType('Milk Tea');
            res.render('Product', {
                title: 'Trang Sản Phẩm',
                dsSP: dsSP
            });
        });
    }
    Chocolate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsSP = yield Products_1.product.getAllByType('Chocolate');
            res.render('Product', {
                title: 'Trang Sản Phẩm',
                dsSP: dsSP
            });
        });
    }
    Hi_Tea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsSP = yield Products_1.product.getAllByType('Hi-Tea');
            res.render('Product', {
                title: 'Trang Sản Phẩm',
                dsSP: dsSP
            });
        });
    }
    Topping(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dsSP = yield Products_1.product.getAllByType('topping');
            res.render('Product', {
                title: 'Trang Sản Phẩm',
                dsSP: dsSP
            });
        });
    }
}
exports.SanPhamController = SanPhamController;
