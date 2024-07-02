// pages/_app.js
import '../styles/globals.css';
import NavBar from '../app/layout/navbar/navbar';
import Footer from '../app/layout/footer/footer';

function MyApp({ Component, pageProps }) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
                <Component {...pageProps} />
            </main>
            <Footer />
        </div>
    );
}

export default MyApp;
