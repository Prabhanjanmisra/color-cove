import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Loader from "@components/Loader"

export const metadata = {
  title: "Color Cove",
  description: "Discover and share color palettes for your frontend."
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
    <head>
      <link rel='icon' href='../public/assets/icons/favicon.ico'/>
    </head>
      <body>
        <Provider>
          <div className='main'></div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout