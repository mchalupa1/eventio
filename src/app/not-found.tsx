import Link from "next/link";
import styles from "./not-found.module.css"; 

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <h1>There was a problem</h1>
      <p>We could not find the page you were looking for.</p>
      <p>
        Go back to the <Link href="/">Dashboard</Link>
      </p>
    </main>
  );
}
