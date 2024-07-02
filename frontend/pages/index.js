import NavBar from "../app/layout/navbar/navbar";
import Footer from "../app/layout/footer/footer";
import Hero from "@/app/layout/hero/hero";

export default function Home({ items }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <main className="flex-grow">
      </main>
    </div>
  );
}
