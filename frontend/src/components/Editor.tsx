import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

interface EditorProps {
  onChange: (data: OutputData) => void;
  data?: OutputData;
}

const Editor: React.FC<EditorProps> = ({ onChange, data }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = new EditorJS({
        holder: editorRef.current,
        tools: {
          header: Header,
          list: List,
        },
        data: data || {
          time: Date.now(),
          blocks: [],
        },
        onChange: async () => {
          const content = await editor.save();
          onChange(content);
        },
      });

      return () => {
        editorInstance.current?.destroy();
        editorInstance.current = null;
      };
    }
  }, [onChange, data]);

  return <div ref={editorRef}></div>;
};

export default Editor;
