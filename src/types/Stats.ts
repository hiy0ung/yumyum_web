export interface MenuStatsFetchData {
    orderDate: string;
    menuName:string;
    quantity : number;
    sumTotalPrice : number;
}
export interface MenuStatsFetchDataTotal {
    totalQuantitySold: number;
    totalPriceSold: number;
}
export interface MenuStatsFetchDataColor {
    name: string;
    quantity : number;
    price : number;
    fill : string;
}
export interface MenuStatsFetchDataGroupByName {
    groupName: string;
    sumQuantity : number;
    sumPrice : number;
    fill : string;
}
