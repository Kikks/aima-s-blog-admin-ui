export default interface TextAreaProps
  extends React.HTMLProps<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
  label?: string;
  containerClassName?: string;
}
