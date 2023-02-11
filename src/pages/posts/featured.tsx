import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import Card from '@/components/lib/Card';
import FullPageLoader from '@/components/lib/FullPageLoader';
import DeleteFeaturedPostModal from '@/components/pages/posts/DeleteFeaturedPostModal';
import FeaturePostModal from '@/components/pages/posts/FeaturePostModal';
import SelectFeaturedPost from '@/components/pages/posts/SelectFeaturedPosts/SelectFeaturedPost';
import { GET_FEATURED_POSTS } from '@/graphql/queries/post.queries';
import { useToggle } from '@/hooks';
import PageLayout from '@/layouts/PageLayout';
import Meta from '@/templates/Meta';
import type IPost from '@/types/Post.type';
import type ITheme from '@/types/Theme.type';

const FeawturedPosts = () => {
  const [showDeleteModal, toggleShowDeleteModal] = useToggle(false);
  const [showFeatureModal, toggleShowFeatureModal] = useToggle(false);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [featuredPosts, setFeauredPosts] = useState<
    | ({
        post?: IPost | null;
        theme?: ITheme | null;
        index?: number | null;
      } | null)[]
    | null
  >([]);

  const { loading } = useQuery(GET_FEATURED_POSTS, {
    onCompleted(response) {
      const array = [...(response?.getFeaturedPosts || [])];

      setFeauredPosts(
        array.sort((a, b) => (a?.index || 0) - (b?.index || 0)) || []
      );
    },
    onError(error) {
      toast.error(error?.message);
    },
  });

  const post0 = useMemo(() => {
    return featuredPosts?.find((item) => item?.index === 0);
  }, [featuredPosts]);

  const post1 = useMemo(() => {
    return featuredPosts?.find((item) => item?.index === 1);
  }, [featuredPosts]);

  const post2 = useMemo(() => {
    return featuredPosts?.find((item) => item?.index === 2);
  }, [featuredPosts]);

  const handleDeleteClicked = (index: number) => {
    setActiveIndex(index);
    toggleShowDeleteModal();
  };

  const handleAddClicked = (index: number) => {
    setActiveIndex(index);
    toggleShowFeatureModal();
  };

  return (
    <PageLayout
      title="Featured Posts"
      meta={
        <Meta
          title="Featured Posts | Aima's Corner Admin Panel"
          description="The list of featured posts in Aima's corner"
        />
      }
    >
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          <SelectFeaturedPost
            index={0}
            featuredPost={post0}
            onDeleteClicked={handleDeleteClicked}
            onAddFeaturedPost={handleAddClicked}
          />
          <SelectFeaturedPost
            index={1}
            featuredPost={post1}
            onDeleteClicked={handleDeleteClicked}
            onAddFeaturedPost={handleAddClicked}
          />
          <SelectFeaturedPost
            index={2}
            featuredPost={post2}
            onDeleteClicked={handleDeleteClicked}
            onAddFeaturedPost={handleAddClicked}
          />
        </div>
      </Card>

      <DeleteFeaturedPostModal
        open={showDeleteModal}
        activeIndex={activeIndex}
        onClose={toggleShowDeleteModal}
        featuredPosts={featuredPosts}
      />
      <FeaturePostModal
        open={showFeatureModal}
        activeIndex={activeIndex}
        onClose={toggleShowFeatureModal}
      />
      {loading && <FullPageLoader />}
    </PageLayout>
  );
};

export default FeawturedPosts;
