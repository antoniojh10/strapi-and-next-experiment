import "../styles/globals.css";
import PublicLayout from "../containers/Layouts/Public";

function MyApp({ Component, pageProps }) {
  return (
    <PublicLayout>
      <Component {...pageProps} />
    </PublicLayout>
  );
}

export default MyApp;
