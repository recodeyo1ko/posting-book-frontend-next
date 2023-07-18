import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>
        ようこそ<strong>Bookers</strong>へ！
      </h1>

      <p>
        <strong>Bookers</strong>では、さまざまな書籍に関するあなたの意見や
      </p>
      <p>印象を共有し交換することができます</p>

      <p>
        <Link href="/books">Start</Link>
      </p>
    </div>
  );
}
