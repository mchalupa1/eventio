import Link from "next/link";
import style from "./page.module.css";

const Page = () => {
  return (
    <>
      <Link href="/">
        <h1>Ahoj</h1>
        <p>Jak se mas</p>
        <Link href="/vypispozdrav">
        <button>Posli pozdrav</button>
        </Link>
      </Link>
    </>
  );
};

export default Page;
