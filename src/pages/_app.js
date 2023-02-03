import '@/styles/globals.sass'
import MainLayout from '@/components/layouts/MainLayout'
import '@/styles/general.sass'

export default function App({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
}
