import Link from "next/link";
import styles from "./page.module.css";

export default () => {
  return (
    <main className={styles.main}>
      <h1>ROTAS DO TCC - BEETECH</h1>
      <br />
      <h2>Página inicial: </h2> <Link href={"/"}>Nicolas</Link>
      <h2>Página de Editar perfil - Agricultor: </h2>{" "}
      <Link href={"/AgriEdit"}>Maria Julia Silva</Link>
      <h2>Página de Editar perfil - Apicultor: </h2>{" "}
      <Link href={"/ApiEdit"}>Laís Teixeira</Link>
      <h2>Página de adicionar apiário: </h2>
    </main>
  );
};
