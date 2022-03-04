import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { magic } from "lib/magicService";
import styles from "styles/Login.module.css";
import { loginUser } from "lib/hasuraService";

const Login: NextPage = () => {
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onLogin = async () => {
    if (!email) {
      setEmailError("Enter a valid email address");
    }

    if (magic) {
      try {
        const didToken = await magic.auth.loginWithMagicLink({ email });
        const { email: userEmail, publicAddress } =
          await magic.user.getMetadata();

        localStorage.setItem("email", userEmail ?? "");

        // console.log({ userToken });
        const resp = await loginUser(didToken ?? "");

        if (resp.ok) {
          router.push("/");
        } else {
          throw new Error("Error logging in");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError("");
    setEmail(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Kobo-roll SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link href="/">
            <a className={styles.logoLink}>
              <div className={styles.logoWrapper}>Kobo-roll</div>
            </a>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleChange}
          />
          <p className={styles.userMessage}>{emailError}</p>
          <button onClick={onLogin} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
