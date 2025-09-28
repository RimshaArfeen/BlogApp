import Link from 'next/link';
import Image from 'next/image';

// const getAuthors = async () => {
//      // Simulate a network delay
//      await new Promise(resolve => setTimeout(resolve, 500));

//      return [
//           {
//                id: 'author-1',
//                name: 'Jane Doe',
//                email: 'jane.doe@example.com',
//                image: 'https://placehold.co/128x128/333333/FFFFFF?text=JD',
//                summary: 'A seasoned tech writer with a passion for web development.',
//                slug: 'jane-doe',
//           },
//           {
//                id: 'author-2',
//                name: 'John Smith',
//                email: 'john.smith@example.com',
//                image: 'https://placehold.co/128x128/555555/FFFFFF?text=JS',
//                summary: 'Specializing in back-end technologies and data science.',
//                slug: 'john-smith',
//           },
//           {
//                id: 'author-3',
//                name: 'Emily Davis',
//                email: 'emily.davis@example.com',
//                image: 'https://placehold.co/128x128/777777/FFFFFF?text=ED',
//                summary: 'Loves to write about modern JavaScript frameworks and design.',
//                slug: 'emily-davis',
//           }
//      ];
// };

const getAuthors = async () => {
     const res = await fetch("http://localhost:3000/api/authors", { cache: 'no-store' });
     if (!res.ok) {
          throw new Error('Failed to fetch data');
     }
     try {
          const data = await res.json();
          console.log("Data fetched from API:", data);
          return data;
     } catch (error) {
          console.error("Error parsing JSON:", error);
          throw error;
     }

}


export default async function AuthorsPage() {
     const authors = await getAuthors();

     return (
        <section className="px-4 md:px-8 py-20 md:py-32 min-h-screen  transition-colors duration-500">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {/* Enhanced Header Section */}
                <header className="flex flex-col items-center justify-center text-center pb-8 border-b border-gray-200 dark:border-gray-700">
                    
                    {/* Title with Logo */}
                    <div className="flex items-center justify-center mb-4">
                        
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
                            Meet Our Authors
                        </h1>
                    </div>
                    
                    {/* Sub-description with improved spacing */}
                    <p className='max-w-2xl text-lg text-gray-600 dark:text-gray-400 mt-4'>
                        Passionate thinkers, diverse backgrounds, and unique perspectives — discover the voices behind **EchoJournal**.
                    </p>
                </header>

                {/* Author Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                    {authors.map((author) => (
                        <div
                            key={author.id}
                            className="sub p-8 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 transform border border-gray-100 dark:border-gray-700/50 flex flex-col items-center text-center cursor-pointer"
                        >
                            {/* Profile Image with Enhanced Border */}
                            <Image
                                src={author.image}
                                alt={author.name}
                                width={128} height={128}
                                style={{ width: 'auto', height: 'auto' }}
                                className="w-32 h-32 rounded-full object-cover mb-5 border-4 border-indigo-500/50 shadow-md"
                            />
                            
                            {/* Name and Email */}
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{author.name}</h2>
                            <p className="text-base text-indigo-600 dark:text-indigo-400 mb-6 font-medium">
                                {author.email}
                            </p>
                            
                            {/* Call to Action Button */}
                            <Link href={`/authors/${author.slug}`} passHref>
                                <button 
                                    className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    View Posts
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
