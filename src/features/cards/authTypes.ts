


export interface CardModel {
  id: string;
  holder_name: string;
  short_card_no: string;
  status: string;
  expire: string;
  selected: boolean;
  card_type: string;

}


export interface IQueryCardsParams {
  page_size?: number | null;
  page_no?: number | null;
  sort_by?: string | null,
  sort_dir?: string | null,
  store_id?: string | null
}