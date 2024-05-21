import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { PageController } from './controlers/PageController';
import { ProductController } from './controlers/ProductController';
import { UserController } from './controlers/UserController';
import { AdminController } from './controlers/AdminController';
import { SanPhamController } from './controlers/SanPhamController'
import {LocalStorage} from 'node-localstorage';


export class Server{
    private app = express();
    private port:number = 5000;

    public start(){
        global.localStorage = new LocalStorage('./storage');
        this.app.set('view engine', 'ejs');
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/public', express.static('public'));


        this.app.use(function (req:Request, res:Response, next:NextFunction) {
            res.locals.baseURL = 'http://localhost:5000/';
            res.locals.user = JSON.parse(localStorage.getItem('user')||'{"id": -1}');
            next();
        })


        this.app.get('/', new PageController().index);
        this.app.get('/login', new UserController().login);
        this.app.post('/login', new UserController().login);
        this.app.get('/logout', new UserController().logout);

        this.app.get('/register', new UserController().register);
        this.app.post('/register', new UserController().register);
        
        this.app.get('/detail/:id', new ProductController().detail);
        this.app.post('/detail/:id', new ProductController().addToCart);

        this.app.get('/cart', new ProductController().cart);
        this.app.get('/cart/:index/:action', new ProductController().updateCart);
        this.app.get('/cart/delete', new ProductController().deleteCart);
        this.app.get('/cart/checkout', new ProductController().checkout);

        this.app.get('/product', new SanPhamController().product)
        this.app.get('/product/tea', new SanPhamController().Tea)
        this.app.get('/product/MilkTea', new SanPhamController().MilkTea)
        this.app.get('/product/Chocolate', new SanPhamController().Chocolate)
        this.app.get('/product/topping', new SanPhamController().Topping)
        this.app.get('/product/Hi-Tea', new SanPhamController().Hi_Tea)

        this.app.get('/admin', new AdminController().admin_index);
        this.app.get('/admin/order', new AdminController().order);
        this.app.get('/admin/order/:id', new AdminController().orderDetail);
        this.app.post('/admin/order/:id', new AdminController().orderUpdate);
        this.app.get('/admin/product', new AdminController().product);
        this.app.get('/admin/product/:id/update', new AdminController().productUpdate);
        this.app.post('/admin/product/:id/update', new AdminController().productUpdate);

        this.app.listen(this.port, () => {
            console.log(`App đang chạy: http://localhost:${this.port}`);
        });
    }
}