export class Profile {
    success: {
        id: number;
        username: string;
        email: string;
        updated_at: Date;
        firsName: string;
        lastName: string;
        phone: string;
        address: string;
        description?: string;
    };
}

export class AuthData {
    token_type: string;
    token: string;
    expires_at: Date;
}