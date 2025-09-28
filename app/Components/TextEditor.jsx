
// // app/Components/TextEditor.jsx
 "use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import { FaBold, FaItalic, FaHeading, FaLink, FaQuoteLeft, FaListUl, FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";

export default function TextEditor({ value, onChange }) {
  const [error, setError] = useState(null);

  const editor = useEditor({
   extensions: [
  StarterKit.configure({
    bulletList: false,
    listItem: false,
    blockquote: false,
  }),
  BulletList,
  ListItem,
  Blockquote,
  Link.configure({ openOnClick: true }),
  Image,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
],

    content: value || "",
    onUpdate: ({ editor }) => {
      try {
        onChange(editor.getHTML());
      } catch (err) {
        setError("Error updating content");
        console.error(err);
      }
    },
    immediatelyRender: false,
  });

  if (!editor) return <p>Loading editor...</p>;



  return (
    <div className=" p-3 my-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 pr-3 border-r ${editor.isActive("bold") ? "" : ""}`}
          title="Bold"
        >
          <FaBold />
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 pr-3 border-r ${editor.isActive("italic") ? "" : ""}`}
          title="Italic"
        >
          <FaItalic />
        </button>

        {/* Heading 2 */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 pr-3 border-r ${editor.isActive("heading", { level: 2 }) ? "" : ""}`}
          title="Heading 2"
        >
          <FaHeading />
        </button>

        {/* Link */}
        <button
          onClick={() => {
            const url = window.prompt("Enter link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="px-2 py-1 pr-3 border-r"
          title="Link"
        >
          <FaLink />
        </button>

        {/* Blockquote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1 pr-3 border-r ${editor.isActive("blockquote") ? "" : ""}`}
          title="Quote"
        >
          <FaQuoteLeft />
        </button>

        {/* Bullet List */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 pr-3 border-r ${editor.isActive("bulletList") ? "" : ""}`}
          title="Bullet List"
        >
          <FaListUl />
        </button>

        {/* Text Align */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-2 py-1 pr-3 border-r ${editor.isActive({ textAlign: "left" }) ? "" : ""}`}
          title="Align Left"
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-2 py-1 pr-3 border-r ${editor.isActive({ textAlign: "center" }) ? "" : ""}`}
          title="Align Center"
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`px-2 py-1 pr-3 border-r ${editor.isActive({ textAlign: "right" }) ? "" : ""}`}
          title="Align Right"
        >
          <FaAlignRight />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        rows={40}
        placeholder="Write your blog content here..."
        className="min-h-[300px] prose max-w-none focus:outline-none focus:ring-0"
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

