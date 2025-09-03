export class CredentialsModel {

    public email: string;
    public password: string;

    public constructor(credentials: any) {
        this.email = credentials.email || '';
        this.password = credentials.password || '';
    }

    // Validation...

}

