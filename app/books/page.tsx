import BookIndex from "../components/BookIndex";
import NewBookForm from "../components/NewBookForm";

const BookIndexPage = () => {
  return (
    <div>
      <h1>Books</h1>
      <BookIndex></BookIndex>

      <h2>New book</h2>
      <NewBookForm></NewBookForm>
    </div>
  );
};

export default BookIndexPage;
