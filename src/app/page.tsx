'use client';
import Menu from '@/sections/menu';
import SceneEditTools from '@/sections/menu/shared/SceneEditTools';
import CanvasContainer from '@/sections/scene';
import { Loader } from '@react-three/drei';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Loader />

        <div className={styles.canvasContainer}>
          <SceneEditTools />
          <CanvasContainer />
        </div>
        <Menu />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
