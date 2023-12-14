export interface ICoin {
  symbol: string;
  image: string;
  id: string;
  convertedLast?: {
    [key: string]: number;
  };
  name?: string;
  current_price?: number;
  price_change_percentage_24h?: number;
}
