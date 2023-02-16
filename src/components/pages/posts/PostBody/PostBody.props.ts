export default interface PostBodyProps {
  body?: string | null;
}

export interface LinkToolProps {
  link?: string;
  meta?: {
    description?: string;
    image?: { url: string };
    title?: string;
  };
}
