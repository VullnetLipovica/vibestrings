import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import '../styles/globals.css';
import Link from 'next/link';
import Footer from "@/components/Footer";
import client from "../lib/apolloClient";
import Navbar from "@/components/Navbar";


function Layout({children}:{children:React.ReactNode}){
return (
<div>
<div className="container">
<Link href="/" className="row" aria-label="home">
<img src="/logo.svg" alt="VibeStrings" width={24} height={24} />
<strong>VibeStrings</strong>
</Link>
</div>
<main className="container">{children}</main>
<footer className="container footer">
<span className="badge">© {new Date().getFullYear()} VibeStrings</span>
<div className="row" aria-label="language-switcher">
</div>
</footer>
</div>
);
}


export default function App({ Component, pageProps }: AppProps) {
    return (
      <ApolloProvider client={client}>
      <Navbar />
          <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
    );
  }