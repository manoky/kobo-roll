import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "styles/Login.module.css";

const Login: NextPage = () => {
  const onLogin = () => {
    console.log("login");
  };

  return (
    <div>
      <Head>
        <title>Kobo-roll SignIn</title>
      </Head>
      <header>
        <div className={styles.headerWrapper}>
          <Link href="/">
            <a className={styles.logoLink}>
              <div className={styles.logoWrapper}>Kobo-roll</div>
            </a>
          </Link>
        </div>

        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <h1 className={styles.signinHeader}>Sign In</h1>
            <input
              type="text"
              placeholder="Email address"
              className={styles.emailInput}
            />
            <p className={styles.userMessage}></p>
            <button onClick={onLogin} className={styles.loginBtn}>
              Sign In
            </button>
          </div>
        </main>
      </header>
    </div>
  );
};

export default Login;
