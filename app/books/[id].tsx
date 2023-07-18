import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  body: string;
}

const Book = () => {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book.");
        }

        const data: Book = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Book id: {book.id}</p>
      <p>{book.body}</p>
    </div>
  );
};

export default Book;
