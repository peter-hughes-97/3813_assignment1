export class UserModel {
    username: String;
    email: String;
    password: String;
    role: String;

    constructor(_username:string,_email:string,_password:string,_role:string)
    {
        this.username = _username;
        this.email = _email;
        this.password = _password;
        this.role = _role;
    }
}