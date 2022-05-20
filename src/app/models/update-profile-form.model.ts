export class UpdateProfileForm {
  constructor(
    public firstName: string = '',
    public age: number = 0,
    public gender: string = '',
    public manChecked: boolean = false,
    public womanChecked: boolean = false,
    public otherChecked: boolean = false,
    public minAge: number = 18,
    public maxAge: number = 30,
    public description: string = ''
  ) {}
}
