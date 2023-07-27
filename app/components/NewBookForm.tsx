"use client";
import { useState } from "react";

const NewBookForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 入力されたフォームデータをオブジェクトにまとめる
    const formData = {
      title,
      body,
    };

    try {
      const response = await fetch("http://localhost:3001/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create book.");
      }

      // 成功時の処理
      console.log("Book created successfully!");
    } catch (error) {
      // エラー時の処理
      console.error("Error creating book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <br />
        <input
          type="text"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div>
        <input type="submit" value="Create" />
      </div>
    </form>
  );
};

export default NewBookForm;
