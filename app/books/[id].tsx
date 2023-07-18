import { useRouter } from "next/router";

const Book = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Book title</h1>
      <p>Book id: {id}</p>
      <p>Book body</p>
    </div>
  );
};

export default Book;
