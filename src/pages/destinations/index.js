import styles from '@/styles/Home.module.css'


const DestinationsPage = ({ title, description }) => {



    return (
        <main className={styles.main}>
            <h1>{title}</h1>
            <p>{description}</p>
        <div className={styles.grid}>
          <a href="/destinations/destination1" className={styles.card}>
            <h3>Destination One &rarr;</h3>
            <p>Find in-depth information about Destination One.</p>
          </a>
          <a href="/destinations/destination2" className={styles.card}>
            <h3>Destination Two &rarr;</h3>
            <p>Find in-depth information about Destination Two.</p>
          </a>
          <a href="/destinations/destination3" className={styles.card}>
            <h3>Destination Three &rarr;</h3>
            <p>Find in-depth information about Destination Three.</p>
          </a>
          </div>   
      </main>
    )
}

export default DestinationsPage

