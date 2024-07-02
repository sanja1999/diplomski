import Image from 'next/image';
import Link from 'next/link';

export default function Catalog({ items }) {
    return (
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Our Featured Items</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Explore our wide range of high-quality electronics. From the latest laptops to top-of-the-line smartphones, find the perfect device for your needs.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col relative">
                        <div className="h-50">
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="image-container flex items-center justify-center">
                                    <Image
                                        src={item.coverImage}
                                        alt={item.title}
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        className="w-auto h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col">
                            <div className="uppercase tracking-wide text-custom-blue-300 font-semibold">{item.type}</div>

                            <Link legacyBehavior href={`/items/${item.slug}`} passHref>
                                <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline cursor-pointer">
                                    {item.title}
                                </a>
                            </Link>

                            <p className="mt-2 mb-4 text-gray-500">{item.description}</p>

                            {/* Dodani stilovi za gumb Purchase */}
                            <div className="absolute bottom-2 right-2 mt-2 mr-2">
                                <button className="bg-custom-blue-400 text-white px-4 py-2 rounded-md hover:bg-custom-blue-300">
                                    Purchase
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}