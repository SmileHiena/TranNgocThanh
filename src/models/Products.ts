import { Database } from "../Database";

let DB = new Database();

export class product{
    public name?: string;
    public price?: number;
    public id?: string;
    public type?:"tea"|"Chocolate"|"Milk Tea"|"Hi-Tea"|"topping";
    protected image?: string;
    public topping: product[] = [];
    public quantity:number = 0;

    public constructor(name?: string, price?: number, type?:"tea"|"Chocolate"|"Milk Tea"|"Hi-Tea"|"topping", image?: string) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.image = image;
    }

    public copy(Product:product){
        this.id = Product.id;
        this.name = Product.name;
        this.price = Product.price;
        this.type = Product.type;
        this.image = Product.image;
        this.topping = Product.topping || [];
    }

    public addTopping (topping:product | product[]){
        if(Array.isArray(topping)){
         this.topping.push(...topping);  
        }
        else{
            this.topping.push(topping);
        }
    }

    public static async getAllByType(type:"tea"|"topping"|"Chocolate"|"Milk Tea"|"Hi-Tea"){
        return await DB.getData(`/products?type=${type}`);
    }
    public static async getAll(){
        return await DB.getData(`/products`);
    }
    public static async getById(id:string){
        return await DB.getData(`/products/${id}`);
    }
    
    public async getDetail(){
        let data = await DB.getData(`/products/${this.id}`);
        this.name = data.name;
        this.price = data.price;
        this.type = data.type;
        this.image = data.image;
        this.topping = data.topping || [];
    }

    public async update(){
        return await DB.updateData(`/products/${this.id}`,this);
    }
    
}