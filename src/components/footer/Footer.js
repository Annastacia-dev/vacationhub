import styles from '@/styles/Home.module.sass'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>Created by 
      <a href="https://github.com/Annastacia-dev" target="_blank" rel="noreferrer">Annastacia</a>
      <span>&copy;{new Date().getFullYear()}</span>
      </p>
    </footer>
  )
}

export default Footer
