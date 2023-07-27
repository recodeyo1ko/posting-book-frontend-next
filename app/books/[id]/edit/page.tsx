"use client";
import Link from "next/link";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  body: string;
}

const BookEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      title,
      body,
    };
    try {
      const response = await fetch(`http://localhost:3001/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update book.");
      }

      // 成功時の処理
      console.log("Book updated successfully!");
    } catch (error) {
      // エラー時の処理
      console.error("Error updating book:", error);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`http://localhost:3001/api/books/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book.");
        }

        const data: Book = await response.json();
        setBook(data);
        setTitle(data.title);
        setBody(data.body);

        setLoading(false);
      } catch (error) {
        setError("Error fetching book.");
        setLoading(false);
        console.error("Error fetching book:", error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>{error || "Book not found."}</div>;
  }

  return (
    <div>
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
          <input type="submit" value="Update" />
        </div>
      </form>
      <Link href={`/books`}>Back</Link>
      {error && <div>{error}</div>}
    </div>
  );
};

export default BookEdit;
