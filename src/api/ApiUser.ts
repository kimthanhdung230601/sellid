import { sendGet, sendPost } from "./api"

export interface IProduct {
    id: number,
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
   getCategory: "API/Categories",
   getAllProduct: "API/Products?page=",
   getUserInfo: "API/GetInfoUser",
   buy: "API/BuyProduct"
}

export const getCategory = ()=>   sendGet(path.getCategory)


export const getAllProduct =  (currentPage: string, category: string) : Promise<IProductList> => {
    if(category === "all"){
        return sendGet(path.getAllProduct + currentPage)
    } 
    else {
       return sendGet(path.getAllProduct + currentPage + "&category=" + category) 
    } 
}

export const  getUserInfo = () => sendGet(path.getUserInfo)


export const buy = (params: {idproduct: string}) => sendPost(path.buy, params)
