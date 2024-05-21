import e, { Request, Response } from "express";
import { User } from "../models/User";

// let DB = new Database();
export class UserController {
    public async login(req: Request, res: Response) {
        let email: string = req.body.email;
        let password: string = req.body.password;
        if (email && password) {
            // res.send(`Email: ${email} - Password: ${password}`);
            let user = new User(email, password);
            // đăng nhập thành công
            if (await user.login()) {
                localStorage.setItem('user', JSON.stringify(user));
                res.redirect('/');
            }
            // dăng nhập thất bại
            else {
                res.render('user_login', {
                    title: 'Đăng nhập',
                    message: 'Email hoặc mật khẩu không đúng',
                });
            }
        }
        else {
            res.render('user_login', {
                title: 'Đăng nhập',
                message: ''

            });
        }
    }

    public logout(req: Request, res: Response) {
        localStorage.removeItem('user');
        res.redirect('/login');
    }

    public async register(req: Request, res: Response) {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let password2 = req.body.password2;

        // có truyền dữ liệu
        if (name && email && password && password2) {
            let message: string = '';
            if (password == password2) {
                let user = new User(email, password, name, 'User');
                if (await user.register()) {
                    res.redirect('/login');
                }
                else {
                    message = 'Đăng ký không thành công! vui lòng thử lại sao';
                }
            }
            else {
                message = 'Mật khau không khớp';
            }
            res.render('user_register', {
                title: 'Đăng ký',
                message: message
            })
        }
        // không truyền dữ liệu
        else {
            res.render('user_register', {
                title: 'Đăng ký',
                message: '',
            });
        }
    }

}