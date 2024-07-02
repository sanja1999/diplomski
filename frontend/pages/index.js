import Hero from "../app/layout/hero/hero";
import { getAllItems } from "../app/components/content/fetch";
import Catalog from "@/app/components/catalog/catalog";

export default function Home({ items }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <main className="flex-grow">
        <Catalog items={items} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = getAllItems();
  return {
    props: {
      items: data,
    },
  };
}
