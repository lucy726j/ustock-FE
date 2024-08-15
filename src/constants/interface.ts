export interface NewsProps {
  title: string;
  content: string;
  image: string;
  writer: string;
  date: Date;
  company: string;
}

export interface NavBoxProps {
  id: string;
  onClick: (id: string) => void;
  children: React.ReactNode;
}
