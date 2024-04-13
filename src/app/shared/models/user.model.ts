export class User {
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phoneNumber?: string;
    dni?: string;
    gender?: 'male' | 'female';
    
    constructor() {
        this.name = '';
        this.lastName = '';
        this.username = '';
        this.password = '';
        this.email = '';
    }
}
