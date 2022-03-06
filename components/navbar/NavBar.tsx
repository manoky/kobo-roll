import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { magic } from "lib/magicService";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import { logoutUser } from "lib/generalService";

const NavBar = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const [email, setEmail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("email");

    if (userEmail) {
      setEmail(userEmail);
    }
  }, [email]);

  const toggleDropdown = () => {
    setShowDropdown((drop) => !drop);
  };

  const handleSignOut = async () => {
    try {
      if (!magic) return;

      localStorage.removeItem("email");
      await logoutUser();
      // router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>Logo</div>
          </a>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem2}>
            <Link href="/browse/my-list">
              <a>My List</a>
            </Link>
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={toggleDropdown}>
              <p className={styles.username}>{email}</p>
              <Image
                src="/static/expand_more.svg"
                width={24}
                height={24}
                alt="expand dropdown"
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login">
                    <a onClick={handleSignOut} className={styles.linkName}>
                      Sign out
                    </a>
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
