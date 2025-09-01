export class CredentialsModel {
    public email: string;
    public password: string;

    constructor(data?: Partial<CredentialsModel>) {
        this.email = data?.email ?? '';
        this.password = data?.password ?? '';
    }
}
