export class User {
  #email: string;
  #id: string;

  constructor(email: string, id: string) {
    this.#email = email;
    this.#id = id;
  }

  get id(): string {
    return this.#id;
  }

  get email(): string {
    return this.#email;
  }
}
