export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    color: string;
    imagesUrl: {id : number, imgUrl: string}[];
    stock?: number;
}