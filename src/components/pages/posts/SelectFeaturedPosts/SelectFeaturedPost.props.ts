import type IPost from '@/types/Post.type';
import type ITheme from '@/types/Theme.type';

export default interface SelectFeaturedPostProps {
  featuredPost?: {
    post?: IPost | null;
    theme?: ITheme | null;
    index?: number | null;
  } | null;
  index: number;
  onDeleteClicked: (index: number) => void;
  onAddFeaturedPost: (index: number) => void;
}
