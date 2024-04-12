export class User {
  id?: string;
  username: string;
  password: string;
  nomePenna: string;
  ruolo: 'Lettore' | 'Scrittore' | 'Admin';

  constructor(user: Partial<User>) {
    if (user.id) this.id = user.id;
    this.username = user.username ?? '';
    this.password = user.password ?? '';
    this.nomePenna = user.nomePenna ?? '';
    this.ruolo = user.ruolo ?? 'Lettore';
  }
}
