import { Request, Response } from "express";
import { Order } from "../models/Order";
import { product } from "../models/Products";

export class AdminController {
    public async admin_index(req: Request, res: Response) {
        let dsDH:Order[] = await Order.getNewOrder(5);
        // let dsSP:product[] = await product.getAll();
        let statusText = {
            "order": "Đã tiếp nhận",
            "shipping": "Đang giao hàng",
            "success": "Giao thành công",
            "cancel": "Đơn bị hủy",
        }
        res.render('admin_index', {
            title: 'Trang quản trị ',
            dsDH:dsDH,
            statusText : statusText,
            

        });
    }
    public async orderDetail(req: Request, res: Response) {
        let id:string = req.params.id;
        let order:Order = new Order();
        order.id = id;
        await order.getDetail();

        res.render('admin_order_detail',{
            title: 'chi tiết đơn hàng #'+id,
            order:order,
        });
    }

    public async orderUpdate(req: Request, res: Response) {
        let status:"cart"|"order"|"shipping"|"success"|"cancel" = req.body.status;
        let id:string = req.params.id;
        let order:Order = new Order();
        order.id = id;
        await order.getDetail();
        order.status = status;
        await order.updateCart();
        res.redirect(`/admin/order/${id}`);
    }
    public async order(req: Request, res: Response) {
        let dsDH:Order[] = await Order.getNewOrder();
        let statusText = {
            "order": "Đã tiếp nhận",
            "shipping": "Đang giao hàng",
            "success": "Giao thành công",
            "cancel": "Đơn bị hủy",
        }
        res.render('admin_order', {
            title: 'Quản lý đơn hàng',
            dsDH:dsDH,
            statusText : statusText,
            

        });
    }


    public async product(req: Request, res: Response) {
        let dsSP:product[] = await product.getAll();
        res.render('admin_product',{
            title: 'Quản lý sản phẩm',
            dsSP:dsSP,
        });

    }
    public async productUpdate(req: Request, res: Response) {
        let id:string = req.params.id;
        let Product:product = new product();
        Product.id = id;
        await Product.getDetail();
        if(req.body.name && req.body.price && req.body.type){
            Product.name = req.body.name;
            Product.price = req.body.price as number;
            Product.type = req.body.type;
            await Product.update();
            res.redirect(`/admin/product/${id}/update`);
            console.log(Product.type);
            
        }
        res.render('admin_product_update',{
            title: 'Cập nhật sản phẩm #'+id,
            Product:Product,
        })
    }
}