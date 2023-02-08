import { useLazyQuery, useMutation } from '@apollo/client';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/lib/Button';
import Card from '@/components/lib/Card';
import FullPageLoader from '@/components/lib/FullPageLoader';
import Input from '@/components/lib/Input';
import TextArea from '@/components/lib/TextArea';
import DeleteCategory from '@/components/pages/categories/DeleteCategory';
import FeatureCategory from '@/components/pages/categories/FeatureCategory';
import { UPDATE_CATEGORY } from '@/graphql/mutations/categories.mutations';
import {
  GET_CATEGORIES_STATS,
  GET_CATEGORY,
} from '@/graphql/queries/category.queries';
import PageLayout from '@/layouts/PageLayout';
import Meta from '@/templates/Meta';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { categoriesUploadPreset } from '@/utils/constants';
import uploadFile from '@/utils/uploadFile';
import { isEmpty } from '@/utils/validators/helpers';

const initialState: {
  name: string;
  description: string;
  image: string | null;
  isFeatured?: boolean | null;
} = {
  name: '',
  description: '',
  image: '',
  isFeatured: false,
};

const Category = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [payload, setPayload] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [categoryName, setCategoryName] = useState<string>('');
  const [imageIsUploading, setImageIsUploading] = useState(false);

  const [fetchCategory, { loading, refetch }] = useLazyQuery(GET_CATEGORY, {
    variables: { categoryId: router?.query?.id as string },
    onCompleted(response) {
      setCategoryName(capitalizeFirstLetter(response?.getCategory?.name || ''));
      setPayload({
        name: capitalizeFirstLetter(response?.getCategory?.name),
        description: response?.getCategory?.description || '',
        image: response?.getCategory?.image || null,
        isFeatured: response?.getCategory?.isFeatured || false,
      });
    },
    onError(error) {
      toast.error(error?.message);
      router.back();
    },
  });

  const [mutate, { loading: updateCategoryLoading }] = useMutation(
    UPDATE_CATEGORY,
    {
      onCompleted() {
        refetch();
        setFile(null);
        toast.success('Category updated successfully');
        router.push('/categories');
      },
      onError(error) {
        toast.error(error?.message);
      },
      refetchQueries: [
        {
          query: GET_CATEGORIES_STATS,
        },
        {
          query: GET_CATEGORY,
        },
        'getCategoryStats',
        'getCategory',
      ],
    }
  );

  useEffect(() => {
    if (router?.query?.id) {
      fetchCategory();
    }
  }, [router?.query?.id]);

  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    const image = event?.currentTarget?.files?.[0];

    if (image) {
      setFile(image);
    }
  };

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPayload({
      ...payload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setErrors(initialState);

      if (isEmpty(payload.name)) {
        setErrors({ ...initialState, name: 'Name cannot be empty' });
        return;
      }

      let imageUrl: string | null = null;

      if (file) {
        setImageIsUploading(true);

        imageUrl = await uploadFile(file, categoriesUploadPreset);

        setImageIsUploading(false);
      }

      mutate({
        variables: {
          input: {
            name: payload.name,
            description: payload.description,
            ...(imageUrl ? { image: imageUrl } : {}),
          },
          id: router?.query?.id as string,
        },
      });
    } catch (error) {
      toast.error('An error occured while updating category. Try again later.');
      setImageIsUploading(false);
    }
  };

  return (
    <PageLayout
      back
      title={!isEmpty(categoryName) ? categoryName : '...'}
      meta={
        <Meta
          title={`${categoryName} | Aima's Corner Admin Panel`}
          description={`The ${categoryName} category`}
        />
      }
      actionButton={
        <Button
          loading={updateCategoryLoading || imageIsUploading}
          onClick={handleSubmit}
        >
          Save
        </Button>
      }
    >
      <div className="grid w-full gap-5">
        <Card title="Category Details">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="col-span-1 w-full lg:col-span-2">
              <label
                htmlFor="image"
                className={`duration-200 hover:opacity-80 ${
                  updateCategoryLoading || imageIsUploading
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  accept=".jpeg,.png,.jpg"
                  onChange={handleFileChange}
                  disabled={updateCategoryLoading || imageIsUploading}
                />

                {file || payload?.image ? (
                  <figure className="relative aspect-square w-full overflow-hidden rounded-md">
                    <Image
                      layout="fill"
                      className="h-full w-full object-cover"
                      src={
                        file ? URL.createObjectURL(file) : payload?.image || ''
                      }
                      alt={categoryName || ''}
                    />
                  </figure>
                ) : (
                  <div className="grid aspect-square w-full place-items-center overflow-hidden rounded-md bg-gray-300">
                    <Icon
                      icon="material-symbols:image-outline-rounded"
                      className="text-[4rem] text-gray-700"
                    />
                  </div>
                )}
              </label>
            </div>

            <div className="col-span-1 flex h-full w-full flex-1 flex-col gap-7 lg:col-span-3">
              <Input
                label="Category Name"
                placeholder="Enter a category name"
                name="name"
                value={payload.name}
                onChange={handleChange}
                error={!isEmpty(errors.name)}
                helperText={errors.name}
                disabled={updateCategoryLoading || imageIsUploading}
              />

              <div className="flex-1">
                <TextArea
                  containerClassName="h-full flex flex-col text-area-container"
                  label="Category Description"
                  placeholder="Enter a description"
                  name="description"
                  value={payload.description}
                  onChange={handleChange}
                  error={!isEmpty(errors.description)}
                  helperText={errors.description}
                  disabled={updateCategoryLoading || imageIsUploading}
                />
              </div>
            </div>
          </div>
        </Card>

        <FeatureCategory
          categoryId={router?.query?.id as string}
          isFeatured={payload.isFeatured || false}
        />

        <DeleteCategory categoryId={router?.query?.id as string} />
      </div>
      {loading && <FullPageLoader />}
    </PageLayout>
  );
};

export default Category;
