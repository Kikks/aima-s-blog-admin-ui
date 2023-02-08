export default interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  shortText?: boolean;
  count: number;
}
