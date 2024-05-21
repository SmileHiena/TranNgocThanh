import { Database } from "../Database";
import { product } from "./Products";

let DB = new Database();

export class Order{
    public id?: string;
    public products?: product[];
    protected idUser?:string;
    public total:number;
    public date: string;
    public status:"cart" | "order" | "shipping" | "success" | "cancel";

    public constructor(products?: product[], idUser?: string) {
        this.products = products;
        this.idUser = idUser;
        this.total = 0;// tự tính dựa trên products
        this.date = new Date().toLocaleString('sv-SE');
        this.status = "cart";
    }

 

    public static async hasCart(idUser: string) {
        let data = await DB.getData(`/orders?idUser=${idUser}&status=cart`) as Order[];
        if(data.length == 0){// không có cart
            return false;
        }else{// có cart -> trả về data
            return data[0];
        }
        
    }
    public static async clearCart (idUser: string) {
        return await DB.deleteData(`/orders?idUser=${idUser}&status=cart`);

    }
    

    public async createCart() {
        return await DB.insertData<Order>(`/orders`, this);
    }
    public async updateCart() {
        return await DB.updateData<Order>(`/orders/${this.id}`, this);
    }
    
    public async addProduct(product: product) {
        if( this.products){
            let inCart:Boolean = false;//Giỉa sử chưa có trong cart
            for (const sp of this.products) {
                if(sp.id == product.id && sp.topping.length == product.topping.length){
                    // check 2 mảng topping có trùng nhau không
                    //sp.topping  và product.topping
                    let count:number = 0;
                    for (const tp1 of sp.topping) {
                        for (const tp2 of product.topping) {
                            if(tp1.id == tp2.id){
                                count++;
                            }
                        }
                    }
                    if(count == sp.topping.length){
                    inCart = true;
                    sp.quantity += product.quantity;
                    break;
                    }
                }
            }
            if( !inCart ){
            this.products.push(product);
        }
    }
        
        return await DB.updateData<Order>(`/orders/${this.id}`, this);
    }

    public static async deleteCart(id: string) {
        return await DB.deleteData(`/orders/${id}`);
    }

    public copy (order:Order){
        this.id = order.id;
        this.products = order.products;
        this.idUser = order.idUser;
        this.total = order.total;
        this.date = order.date;
        this.status = order.status;
    }
    public static async getNewOrder(limit = -1) {
        return await DB.getData(`/orders?_sort=-date&status_ne=cart&_limit=${limit}`);
    }

    public async getDetail(){
        let data = await DB.getData(`/orders/${this.id}`);
        this.products = data.products;
        this.idUser = data.idUser;
        this.total = data.total;
        this.date = data.date;
        this.status = data.status;
        
    }
}