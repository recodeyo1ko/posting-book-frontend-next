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
  const pathname = usePathname();
  const { id } = useParams();
  console.log("pathname", pathname);
  console.log("id", id);

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/books/${id}`);
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
      <p>
        <strong>Title: </strong>
        {book.title}
      </p>
      <p>
        <strong>Body: </strong>
        {book.body}
      </p>
      <div>EDIT</div>
      <Link href={`/books`}>Back</Link>
    </div>
  );
};

export default BookEdit;
