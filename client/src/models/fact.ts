export interface Fact {
  factoid: string,
  createdDate?: Date | string,
  votes?: number,
  vote?: 1 | -1,
}
