import React from "react";
import { Editor } from '@tinymce/tinymce-react';
import { EventHandler } from "@tinymce/tinymce-react/lib/cjs/main/ts/Events";

interface RichTextEditorProps {
  onEdit?: EventHandler<any>
  value?: string
}

export const RichTextEditor: React.FC<RichTextEditorProps> = props => {
  return(
    <div>
      <Editor
        apiKey="r0f6l0jbx1u07tj6rmzvx7fodygihr6sh2mkw8h5myeis87n"
        init={{
          height: 500,
          // menubar: false,
          plugins: [
            'advlist autolink autosave lists checklist link image imagetools charmap print preview anchor',
            'searchreplace visualblocks code fullscreen formatpainter importcss',
            'insertdatetime media mediaembed table advtable paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify table | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={props.onEdit}
        value={props.value}
      />
    </div>
  );
}