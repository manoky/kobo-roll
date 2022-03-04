import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { magic } from "lib/magicService";
import { useRouter } from "next/router";
import { Loader } from "components/loader";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const checkUser = async () => {
      if (magic) {
        const isLoggedin = await magic.user.isLoggedIn();

        if (!isLoggedin) {
          router.push("/login");
          // router.push("/");
        }
        setIsLoading(false);
      }
    };

    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => setIsLoading(false));
    router.events.on("routeChangeError", () => setIsLoading(false));

    return () => {
      router.events.on("routeChangeComplete", () => setIsLoading(false));
      router.events.on("routeChangeError", () => setIsLoading(false));
    };
  }, [router.events]);

  return isLoading ? <Loader /> : <Component {...pageProps} />;
}

export default MyApp;
