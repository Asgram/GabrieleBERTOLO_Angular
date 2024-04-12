export class Articolo {
  id?: string | number;
  titolo: string;
  testo: string;
  categoria: string;
  autore: string;
  dataCreazione: Date | string;
  dataModifica?: Date | string;

  constructor(news: Partial<Articolo>) {
    if (news.id) this.id = news.id;
    this.titolo = news.titolo ?? '';
    this.testo = news.testo ?? '';
    this.categoria = news.categoria ?? '';
    this.autore = news.autore ?? '';
    this.dataCreazione = news.dataCreazione ?? '';
  }
}
