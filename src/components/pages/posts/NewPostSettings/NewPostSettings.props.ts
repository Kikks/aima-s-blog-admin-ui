export default interface NewPostSettingsProps {
  open: boolean;
  onClose: () => void;
  category: string;
  setCategory: (category: string) => void;
  onSave: () => void;
}
