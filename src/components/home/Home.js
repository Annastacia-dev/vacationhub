import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Home.module.sass'


const HomePage = ({title, description, data}) => {
    return (
        <div>
        <main className={styles.main}>
        <h1 className={styles.title}> Welcome to {title} </h1>
        <p className={styles.description}>
         {description}
        </p>
        <div className={styles.grid}>
          {
            data.map((destination) => (
              <Link className={styles.card} href={`/destinations/${destination.name}`} key={destination.id}>
                  <Image src={destination.image} alt={destination.name} width={200} height={200} />
                  <h3>{destination.name} &rarr;</h3>
                  <p>Find in-depth information about {destination.name}.</p> 
              </Link>
            ))
          }
      
        </div>   
      </main>
        </div>
    );
    }

export default HomePage;