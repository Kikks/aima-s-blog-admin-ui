import { useMutation } from '@apollo/client';
import type { FC } from 'react';
import { toast } from 'react-hot-toast';

import Card from '@/components/lib/Card';
import FullPageLoader from '@/components/lib/FullPageLoader';
import Text from '@/components/lib/Text';
import Toggle from '@/components/lib/Toggle';
import {
  FEATURE_CATEGORY,
  UNFEATURE_CATEGORY,
} from '@/graphql/mutations/categories.mutations';
import { GET_CATEGORY } from '@/graphql/queries/category.queries';

import type FeatureCategoryProps from './FeatureCategory.props';

const FeatureCategory: FC<FeatureCategoryProps> = ({
  categoryId,
  isFeatured = false,
}) => {
  const [mutate, { loading }] = useMutation(
    isFeatured ? UNFEATURE_CATEGORY : FEATURE_CATEGORY,
    {
      refetchQueries: [{ query: GET_CATEGORY }, 'getCategory'],
      onError(error) {
        toast.error(error?.message);
      },
    }
  );

  const handleFeatureCategory = () => {
    mutate({
      variables: { categoryId },
    });
  };

  return (
    <>
      <Card title="Feature Category">
        <Text>
          Featured categories together with posts under them appear on the
          homepage of your blog.
        </Text>

        <hr className="my-5" />

        <Text>Would you like to feature this category?</Text>

        <div className="flex items-center gap-3">
          <Text>No</Text>
          <Toggle checked={isFeatured} onChange={handleFeatureCategory} />
          <Text>Yes</Text>
        </div>
      </Card>

      {loading && <FullPageLoader />}
    </>
  );
};

export default FeatureCategory;
