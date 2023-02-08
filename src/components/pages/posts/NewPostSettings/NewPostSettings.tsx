import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/lib/Button';
import Heading from '@/components/lib/Heading';
import Select from '@/components/lib/Select';
import { GET_CATEGORIES } from '@/graphql/queries/category.queries';
import type ICategory from '@/types/Category.type';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

import type NewPostSettingsProps from './NewPostSettings.props';

const NewPostSettings: FC<NewPostSettingsProps> = ({
  category,
  onClose,
  open,
  setCategory,
  onSave,
}) => {
  const [categories, setCategories] = useState<(ICategory | null)[]>([]);

  useQuery(GET_CATEGORIES, {
    variables: { limit: 50, page: 1 },
    onCompleted(response) {
      setCategories(response?.getCategories?.data || []);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return open ? (
    <div
      className={`fixed left-0 top-0 z-[1000] grid h-full w-full place-items-end shadow-md`}
    >
      <div
        className="absolute top-0 left-0 z-0 h-full w-full bg-black/40"
        onClick={onClose}
      />

      <motion.div
        className="z-10 flex h-full w-[300px] flex-col items-center gap-10 overflow-hidden overflow-y-auto bg-white p-5 md:w-[400px]"
        initial={{ opacity: 0, translateX: 300 }}
        animate={{ opacity: 1, translateX: 0, transition: { delay: 0.1 } }}
      >
        <div className="flex w-full items-center justify-between">
          <Heading variant="h3" className="font-bold">
            Post settings
          </Heading>
          <button
            onClick={onClose}
            className="ml-auto grid h-10 w-10 place-items-center rounded-full hover:bg-black/10"
          >
            <Icon className="text-2xl" icon="carbon:close" />
          </button>
        </div>

        <div className="w-full flex-1">
          <Select
            label="Post Category"
            value={category}
            onChange={(event) => setCategory(event.currentTarget.value)}
            options={[
              { label: 'Select Category', value: '' },
              ...categories.map((item) => ({
                label: capitalizeFirstLetter(item?.name || ''),
                value: item?.id || '',
              })),
            ]}
          />
        </div>

        <div className="flex w-full justify-end">
          <Button onClick={onSave}>Save</Button>
        </div>
      </motion.div>
    </div>
  ) : (
    <></>
  );
};

export default NewPostSettings;
