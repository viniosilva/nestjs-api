export class Cat {
  id: number;
  birthday: Date;
  name: string;

  constructor(data: Cat) {
    this.id = data.id;
    this.birthday = data.birthday;
    this.name = data.name;
  }
}
