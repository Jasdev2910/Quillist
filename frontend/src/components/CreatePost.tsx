import React, { useState } from "react";
import Editor from "./Editor"; // Ensure the path is correct
import { OutputData } from "@editorjs/editorjs";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<OutputData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      content,
    });
    // Handle form submission here, like making an API call to save the post
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <Editor onChange={setContent} />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
