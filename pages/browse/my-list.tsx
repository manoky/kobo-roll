import Navbar from "components/navbar";
import SectionList from "components/section-list";
import { fetchUserList } from "lib/hasuraService";
import { verifyToken } from "lib/jwtService";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "styles/my-list.module.css";
import { MoviesProps } from "types/videoTypes";

interface MyListProps {
  videos: MoviesProps[];
}

const MyList: NextPage<MyListProps> = ({ videos }) => {
  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.sectionWrapper}>
          <SectionList videos={videos} title="My List" size="small" inList />
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies;
  const auth = verifyToken(token);

  if (!auth) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { stats } = await fetchUserList(auth.userId, token);

  return {
    props: { videos: stats },
  };
};

export default MyList;
