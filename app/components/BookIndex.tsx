"use client";
import { useEffect, useState } from "react";

const BookIndex = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
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

    fetchBooks();
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
              <a href="#">Show</a>
              <a href="#">Edit</a>
              <a href="#">Delete</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookIndex;
