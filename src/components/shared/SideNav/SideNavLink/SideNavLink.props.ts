export default interface SideNavLinkProps {
  foreign?: boolean;
  url: string;
  icon: string;
  title: string;
  children?: {
    icon?: string;
    url: string;
    title: string;
  }[];
  actionButton?: {
    icon: string;
    url: string;
  };
  onClick?: () => void;
}
