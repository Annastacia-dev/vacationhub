import Link from 'next/link'
import Image from 'next/image'



const Header = () => {
  return (
    <header>
    <nav>
      <Link href="/"> <i className="fa-solid fa-globe"></i></Link>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/destinations">Destinations</Link>
    </nav>
  </header>
  )
}

export default Header