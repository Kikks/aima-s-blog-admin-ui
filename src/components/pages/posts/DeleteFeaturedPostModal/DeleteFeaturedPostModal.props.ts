import type IPost from '@/types/Post.type';
import type ITheme from '@/types/Theme.type';

export default interface DeleteFeaturedPostModalProps {
  activeIndex?: number;
  open: boolean;
  onClose: () => void;
  featuredPosts:
    | ({
        post?: IPost | null;
        theme?: ITheme | null;
        index?: number | null;
      } | null)[]
    | null;
}
