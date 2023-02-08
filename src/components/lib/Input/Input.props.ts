import type { ReactNode } from 'react';

export default interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  label?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
