import '@/styles/globals.sass'
import MainLayout from '@/components/layouts/MainLayout'
import '@/styles/header.sass'
import '@/styles/home.sass'
import '@/styles/footer.sass'
import '@/styles/tour.sass'





export default function App({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
}
