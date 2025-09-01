
export class UserModel {
	public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;
    
    constructor(data?: Partial<UserModel>) {
        this.id = data?.id ?? '';
        this.firstName = data?.firstName ?? '';
        this.lastName = data?.lastName ?? '';
        this.email = data?.email ?? '';
        this.password = data?.password ?? '';
        this.roleId = data?.roleId ?? 0;
    }
}
