import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { toast } from 'react-hot-toast';

import Text from '@/components/lib/Text';
import { useToggle } from '@/hooks';
import { clientUrl } from '@/utils/constants';

import type SharePostProps from './SharePost.props';

const SharePost: FC<SharePostProps> = ({ slug }) => {
  const [open, toggleOpen] = useToggle(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${clientUrl}/posts/${slug}`);
    toast.success('Copied to clipboard!');
  };

  const handleShareToWhatsapp = () => {
    window.open(
      `whatsapp://send?text=${encodeURI(
        `Check out this amazing article from Aima's Writing:\n${`${clientUrl}/posts/${slug}`}`
      )}`
    );
  };

  const handleShareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURI(
        `Check out this amazing article from Aima's Writing:\n${`${clientUrl}/posts/${slug}`}`
      )}`
    );
  };

  return (
    <>
      <section className="mx-auto mt-10 grid w-full max-w-[900px] place-items-center px-5">
        <button className="flex items-center gap-3" onClick={toggleOpen}>
          <Text>Share Article</Text>

          <Icon icon="material-symbols:share" className="text-2xl" />
        </button>
      </section>

      {open && (
        <div
          className={`fixed left-0 top-0 z-[1000] grid h-full w-full place-items-center shadow-md`}
        >
          <div
            className="absolute top-0 left-0 z-0 h-full w-full bg-black/40"
            onClick={toggleOpen}
          />

          <motion.div
            className="z-10 flex max-h-[600px] w-[90%] max-w-[500px] flex-col items-center gap-5 rounded-xl bg-white p-5 text-center md:p-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.25 } }}
          >
            <Text className="max-w-[40ch] font-medium">
              Share with friends!
            </Text>

            <div className="flex items-center justify-center gap-10">
              <button
                className="flex flex-col items-center gap-1"
                onClick={handleShareToWhatsapp}
              >
                <Icon icon="logos:whatsapp-icon" className="text-4xl" />
                <Text variant="caption">WhatsApp</Text>
              </button>
              <button
                className="flex flex-col items-center gap-1"
                onClick={handleShareToTwitter}
              >
                <Icon icon="logos:twitter" className="text-4xl" />
                <Text variant="caption">Twitter</Text>
              </button>
              <button
                className="flex flex-col items-center gap-1"
                onClick={handleCopyToClipboard}
              >
                <Icon icon="ri:file-copy-2-fill" className="text-4xl" />
                <Text variant="caption">Copy</Text>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SharePost;
