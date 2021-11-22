import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SearchBox from '../components/SearchBox';
import Nav from '../components/Nav';
import Item from '../components/Item';
import { Package, History, Status } from '../types/package';

const Home: NextPage = () => {
  const hist :History = {
    status : 'delievered',
    location: 'Los Angeles',
    timestamp: 1145141919810,
  };

  const p : Package = {
    tracking : '114514',
    name : 'First Package',
    carrier: '顺丰快递',
    history: hist,
    status : Status.Delivered,
  };

  return (
    <>
    <Nav isLoggedIn={true}/>
    <div className={styles.container}>
      <Head>
        <title>Index</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Hello World!
        </h1>
        <SearchBox />
      </main>
      <Item item={p}/>
    </div>
    </>
  );
};

export default Home;
