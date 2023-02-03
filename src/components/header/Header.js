import Link from 'next/link'
import styles from '@/styles/Home.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/destinations">Destinations</Link>
    </nav>
  </header>
  )
}

export default Header