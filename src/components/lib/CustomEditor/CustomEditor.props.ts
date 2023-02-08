import type { API, OutputData } from '@editorjs/editorjs';
import type EditorJS from '@editorjs/editorjs';
import type { MutableRefObject } from 'react';

export default interface CustomEditorProps {
  editorJS: MutableRefObject<EditorJS | null>;
  defaultValue: OutputData;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: number;
  onReady?: () => void;
  onSave?: (data: OutputData) => void;
  onChange?: (api: API, event: CustomEvent) => void;
}
