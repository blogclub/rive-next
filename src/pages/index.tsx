import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import HomeHero from "@/components/HomeHero";

export default function Home() {
  return (
    <div className={styles.Home}>
      <HomeHero />
    </div>
  );
}
