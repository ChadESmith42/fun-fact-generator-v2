const handleUser = (request: any): User => {
    const user: User = request.body;
    return user;
}

export interface User {
    name: string;
    dob: Date | string,
    email: string,
    active: boolean,
}

export default handleUser;