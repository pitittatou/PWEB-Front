export class User {
  constructor(
    public userId: string = '',
    public firstName: string = '',
    public age: number = 0,
    public description: string,
    public photos: [String]
  ) {}
}
