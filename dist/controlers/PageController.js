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
exports.PageController = void 0;
const Products_1 = require("../models/Products");
class PageController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Truy vấn tất cả sản phẩm có loại là "Chocolate"
            let dsSP_Tea = yield Products_1.product.getAllByType('tea');
            // Truy vấn tất cả sản phẩm có loại là "Tea"
            let dsSP_Chocolate = yield Products_1.product.getAllByType('Chocolate');
            // Ghép hai mảng sản phẩm thành một mảng duy nhất
            let dsSP = [...dsSP_Tea, ...dsSP_Chocolate];
            res.render('page_index', {
                title: 'Trang chủ',
                dsSP: dsSP
            });
        });
    }
}
exports.PageController = PageController;
