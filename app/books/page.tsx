import Book from "../components/Book";
import NewBookForm from "../components/NewBookForm";

const BookIndexPage = () => {
  return (
    <div>
      <h1>Books</h1>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <Book></Book>
        </tbody>
      </table>

      <h2>New book</h2>
      <NewBookForm></NewBookForm>
    </div>
  );
};

export default BookIndexPage;
