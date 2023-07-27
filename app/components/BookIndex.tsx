"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  body: string;
}

const BookIndex = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch books.");
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete book.");
      }

      // 削除成功後に本のリストを再取得して更新する
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();

    // 5秒ごとにデータを更新
    const interval = setInterval(() => {
      fetchBooks();
    }, 2000);

    // コンポーネントがアンマウントされた時にクリーンアップ
    return () => clearInterval(interval);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.body}</td>
            <td>
              <Link href={`books/${book.id}`}>Show</Link>
              <Link href={`/books/${book.id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookIndex;
