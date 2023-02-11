import type IPost from '@/types/Post.type';
import type ITheme from '@/types/Theme.type';

export default interface FeaturedPostProps {
  post?: IPost | null;
  theme?: ITheme | null;
  variant?: 'long' | 'short';
  showEditButton?: boolean;
}
