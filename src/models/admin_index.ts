import { Database } from "../Database";



let DB = new Database();

export class admin {
    protected name?: string;
    protected price?: number;
    public id?: string;
    protected type?:"drink"|"topping";
    protected image?: string;
    public topping: admin[] = [];
    public quantity:number = 0;

    public constructor(name?: string, price?: number, type?:"drink"|"topping", image?: string) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.image = image;
    }

    public static async getById(id:string){
        return await DB.getData(`/products/${id}`);
    }
}