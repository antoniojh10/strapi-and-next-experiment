import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home({ stores, error }) {
  if (error) {
    return <div>An error ocurred: {error.message}</div>;
  }
  return (
    <main className={styles.main}>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            <Link href={`/${encodeURIComponent(store.storeId)}`}>
              <a>
                {store.name} - @{store.storeId}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

Home.getInitialProps = async (ctx) => {
  try {
    const parseJSON = (resp) => (resp.json ? resp.json() : resp);
    const checkStatus = (resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }

      return parseJSON(resp).then((resp) => {
        throw resp;
      });
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const stores = await fetch("http://localhost:1337/stores", {
      method: "GET",
      headers,
    })
      .then(checkStatus)
      .then(parseJSON);

    return { stores };
  } catch (error) {
    return { error };
  }
};
