import { Request, Response } from "express";
import { Order } from "../models/Order";
import { product } from "../models/Products";
export class ProductController {
    public async detail(req: Request, res: Response) {
        let id: string = req.params.id;
        let sp: product = await product.getById(id);
        let dsTP: product[] = await product.getAllByType('topping');
        res.render('product_detail', {
            title: 'Chi tiết sản phẩm #' + id,
            sp: sp,
            dsTP: dsTP,
        });


    }
    public async cart(req: Request, res: Response) {
        let idUser: string = JSON.parse(localStorage.getItem('user')||'{"id": -1}').id;
        let cartData = await Order.hasCart(idUser);
        let cart = new Order([]);// taoj 1 ddonw hangf mowis chuaaw cso sanr phaamr
        if (cartData) {
            cart.copy(cartData);
        }
        res.render('product_cart', {
            title: 'Giỏ hàng',
            cart: cart,
        });

    }

    public async addToCart(req: Request, res: Response) {
        let id: string = req.params.id;
        let toppingIdList: string[] = req.body.toppingList;
        let toppingList: product[] = [];

        let ProductData: product = await product.getById(id) as product;
        let Product = new product();
        Product.copy(ProductData);
        Product.quantity = Number(req.body.quantity);
        if (toppingIdList) {
            if (!Array.isArray(toppingIdList)) {
                toppingIdList = [toppingIdList];
            }
            console.log(toppingIdList);

            for (const idTP of toppingIdList) {
                let topping = await product.getById(idTP);
                toppingList.push(topping);
            }
            // console.log(toppingList);
            Product.addTopping(toppingList);
        }


        // let idUser: string = '1'; 
        let idUser: string = JSON.parse(localStorage.getItem('user')||'{"id": -1}').id;
        // let idUser: string = JSON.parse(localStorage.getItem('User')||'').id; 
        //thêm sản phẩm vào giỏ hàng 

        let cart: Order = await Order.hasCart(idUser) as unknown as Order;
        if (!cart) {
            // nếu chưa có giỏ hàng -> tạo giỏ hàng
            cart = new Order([Product], idUser);
            cart.createCart();
        }
        else {
            //Đã có giỏ hàng -> thêm sản phẩm
            let cartData: Order = cart;
            cart = new Order();
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


    }

    public async updateCart(req: Request, res: Response) {
        let userId: string = JSON.parse(localStorage.getItem('user')||'{"id": -1}').id;;
        let cartData = await Order.hasCart(userId);
        let cart = new Order([]);
        if (cartData) {
            cart.copy(cartData);
        }
        let indexSP: number = Number(req.params.index);
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
                cart.products?.splice(indexSP, 1);
            }
        }
        await cart.updateCart();
        res.redirect('/cart');
    }
    public async deleteCart(req: Request, res: Response) {
        let userId: string = JSON.parse(localStorage.getItem('user')||'{"id": -1}').id;;
        let cartData = await Order.hasCart(userId);
        if (cartData) {
            if (cartData.id) {
                await Order.deleteCart(cartData.id);
                res.redirect('/cart');
            }
        }

    }

    public async checkout(req: Request, res: Response) {
        let userId: string = JSON.parse(localStorage.getItem('user')||'{"id": -1}').id;;
        let cartData = await Order.hasCart(userId);
        let order = new Order();
        if (cartData) {
            order.copy(cartData);
            let tongTien:number = 0;
            order.products?.forEach(sp => {
                let gia:number = 0;
                if(sp.price) gia += sp.price;

                sp.topping.forEach(tp => {
                    if(tp.price) gia += tp.price;
                })
                tongTien += gia*sp.quantity;
            });
            order.total = tongTien;
            order.date = new Date().toLocaleString('sv-SE');
            order.status = "order";
            await order.updateCart();
            // res.redirect('/cart');
            res.send('Đặt hàng thành công!');
        } 
    }
}


