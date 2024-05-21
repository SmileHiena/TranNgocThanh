import { Request, Response } from "express";
import { product } from "../models/Products";
export class SanPhamController {
    public async product(req:Request, res:Response) {
        let dsSP:product[] = await product.getAll();
        res.render('Product',{
            title: 'Trang Sản Phẩm',
            dsSP: dsSP

        });
        // console.log(dsSP);
    }
    public async Tea(req:Request, res:Response){
        let dsSP:product[] = await product.getAllByType('tea');
        res.render('Product',{
            title: 'Trang Sản Phẩm',
            dsSP :dsSP
        })
    }
    public async MilkTea(req:Request, res:Response){
        let dsSP:product[] = await product.getAllByType('Milk Tea');
        res.render('Product',{
            title: 'Trang Sản Phẩm',

            dsSP :dsSP
        })
    }
    public async Chocolate(req:Request, res:Response){
        let dsSP:product[] = await product.getAllByType('Chocolate');
        res.render('Product',{
            title: 'Trang Sản Phẩm',

            dsSP :dsSP
        })
    }
    public async Hi_Tea(req:Request, res:Response){
        let dsSP:product[] = await product.getAllByType('Hi-Tea');
        res.render('Product',{
            title: 'Trang Sản Phẩm',

            dsSP :dsSP
        })
    }
    public async Topping(req:Request, res:Response){
        let dsSP:product[] = await product.getAllByType('topping');
        res.render('Product',{
            title: 'Trang Sản Phẩm',

            dsSP :dsSP
        })
    }
}