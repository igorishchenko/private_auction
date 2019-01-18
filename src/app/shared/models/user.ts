export class User {
    _id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    address?: string;
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
