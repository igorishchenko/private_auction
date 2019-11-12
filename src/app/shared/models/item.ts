export class Item {
    id: number;
    productName: string;
    productPrice: number;
    imgUrl: string;
    avail: boolean;
    description: string;
    owner_user_id: number;
    category_id: number;
    user_name: string;
    created_at?: Date;
    updated_at?: Date;
}

export class SaveItem {
    productName: string;
    productPrice: number;
    imgUrl: string;
    avail: boolean;
    description: string;
    owner_user_id: number;
    category_id: number;
}
