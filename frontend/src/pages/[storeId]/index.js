import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import ProductItem from "../../components/ProductItem";
import Cart from "../../components/Cart";
import styles from "../../styles/Home.module.css";

export default function StoreProfile({ storeInfo, error }) {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  if (error) {
    return <div>An error ocurred: {error.message}</div>;
  }
  if (!storeInfo) {
    return (
      <div className={styles.container}>
        <h1>Store not found</h1>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{storeInfo.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{storeInfo.name}</h1>
        <p>{storeInfo.description}</p>
        {storeInfo.products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            addToCart={() => handleAddToCart(product)}
          />
        ))}
        <Cart
          productList={cart}
          telephone={storeInfo.telephone}
          storeName={storeInfo.name}
        />
        <Link href="/" replace>
          <a>Volver</a>
        </Link>
      </main>
    </>
  );
}

StoreProfile.getInitialProps = async (ctx) => {
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

    const { storeId } = ctx.query;

    const headers = {
      "Content-Type": "application/json",
    };
    const [storeInfo] = await fetch(
      `http://localhost:1337/stores?storeId=${storeId}`,
      {
        method: "GET",
        headers,
      }
    )
      .then(checkStatus)
      .then(parseJSON);

    return { storeInfo };
  } catch (error) {
    return { error };
  }
};
