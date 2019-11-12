export class User {
    _id: number;
    username: string;
    email: string;
    email_verified_at?: Date;
    password: string;
    remember_token?: string;
    created_at?: Date;
    updated_at?: Date;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    description?: string;
}
export class googleUser {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
    cathPhrase?: string;
}
