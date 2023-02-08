import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Undo from 'editorjs-undo';
import type { FC } from 'react';
import { useEffect } from 'react';

import styles from './CustomEditor.module.scss';
import type CustomEditorProps from './CustomEditor.props';
import EDITOR_JS_TOOLS from './CustomEditorTools';

const CustomEditor: FC<CustomEditorProps> = ({
  editorJS,
  defaultValue,
  placeholder,
  readOnly,
  minHeight,
  onReady,
}: CustomEditorProps) => {
  console.log(defaultValue);

  useEffect(() => {
    if (editorJS.current === null) {
      editorJS.current = new EditorJS({
        placeholder,
        readOnly,
        minHeight,
        holder: 'editor__container',
        data: defaultValue,
        tools: EDITOR_JS_TOOLS,
        onReady() {
          // eslint-disable-next-line no-new
          new Undo({ editor: editorJS.current });

          if (onReady) {
            onReady();
          }
        },
      });
    }
  }, [editorJS]);

  return <div id="editor__container" className={styles.body} />;
};

CustomEditor.defaultProps = {
  placeholder: "Let's write an awesome story! ✨",
  readOnly: false,
  minHeight: 0,
};

export default CustomEditor;
