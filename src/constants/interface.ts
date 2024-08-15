export interface NewsProps {
    title: string;
    content: string;
    image: string;
    writer: string;
    date: Date;
    company: string;
}

export interface StockItemProps {
    id: number;
    name: string;
    logo: string;
    code: string;
    price: number;
    growth: number;
}