import Head from "next/head";
import styles from "../../styles/Layout.module.css";

export default function Public({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Menu App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
