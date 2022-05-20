export class RegisterForm {
  constructor(
    public firstName: string = '',
    public birthDate: string = '',
    public gender: string = '',
    public menChecked: boolean = false,
    public womenChecked: boolean = false,
    public otherChecked: boolean = false,
    public minAge: number = 18,
    public maxAge: number = 30,
    public description: string = ''
  ) {}
}
