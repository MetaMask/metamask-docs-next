import type { NextPage } from 'next';
import styles from '../styles/modules/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <h1>Home Page</h1>
    </div>
  )
}

export default Home;
