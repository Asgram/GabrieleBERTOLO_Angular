import { User } from '../../users/models/user';

export class Articolo {
  id?: string | number;
  titolo: string;
  testo: string;
  categoria: string;
  autore: User | null;
  dataCreazione: Date | string;
  dataModifica?: Date | string;

  constructor(news: Partial<Articolo>) {
    if (news.id) this.id = news.id;
    this.titolo = news.titolo ?? '';
    this.testo = news.testo ?? '';
    this.categoria = news.categoria ?? '';
    this.autore = news.autore ?? null;
    this.dataCreazione = news.dataCreazione ?? '';
  }
}
