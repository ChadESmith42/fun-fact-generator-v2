export interface Factoid {
    message: string,
    votes?: number,
    createdDate?: Date | string,
    vote?: 1 | -1
}