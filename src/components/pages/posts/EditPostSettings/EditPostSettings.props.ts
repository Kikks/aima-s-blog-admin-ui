export default interface EditPostSettingsProps {
  postId: string;
  open: boolean;
  onClose: () => void;
  category: string;
  isPublished: boolean;
  setCategory: (category: string) => void;
  onSave: () => void;
}
