import Link from "next/link";
import style from "./page.module.css";

const Page = () => {
  return (
    <>
      <Link href="/">
        <h1>Navrat na hlavni stranku</h1>
        <p>Taky navrat</p>
        <Link href="/vypispozdrav">
        <button>Posli pozdrav</button>
        </Link>
        <p>Navrat na hlavni stranku</p>
      </Link>
    </>
  );
};

export default Page;
