import { sendGet, sendPost } from "./api"

export interface IProduct {
    id: number,
    image: string,
    namefolder: string,
    category: string,
    price: number,
    description: string
}

export interface IProductList {
    status: string,
    total_products: number,
    total_pages: number,
    index_page:number,
    data: [IProduct]
    
}


const path = {
   getCategory: "https://taphoahinh.com/API/Categories",
   getAllProduct: "https://taphoahinh.com/API/Products?page=",
   getUserInfo: "https://taphoahinh.com/API/GetInfoUser",
   buy: "https://taphoahinh.com/API/BuyProduct"
}

export const getCategory = ()=>   sendGet(path.getCategory)


export function getAllProduct (params:string) : Promise<IProductList> {
    return sendGet(path.getAllProduct + params)
}

export function getUserInfo () {
    return sendGet(path.getUserInfo)
}

export function buy(params: {idproduct: string}) {
    return sendPost(path.buy, params)
}