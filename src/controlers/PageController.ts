import { Request, Response } from "express";
import { product } from "../models/Products";

export class PageController {
    public async index(req: Request, res: Response) {
        // Truy vấn tất cả sản phẩm có loại là "Chocolate"
        let dsSP_Tea: product[] = await product.getAllByType('tea');
        
        // Truy vấn tất cả sản phẩm có loại là "Tea"
        let dsSP_Chocolate: product[] = await product.getAllByType('Chocolate');

        // Ghép hai mảng sản phẩm thành một mảng duy nhất
        let dsSP: product[] = [...dsSP_Tea, ...dsSP_Chocolate];

        res.render('page_index', {
            title: 'Trang chủ',
            dsSP: dsSP
        });
    }
}