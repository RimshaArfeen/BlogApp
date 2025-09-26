import Link from 'next/link';

// Mock data fetching function. In a real app, this would fetch from your database.
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
          <section className="px-3 md:px-10 py-24 min-h-screen">
               <div className="w-full lg:w-[90%] mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center">Our Authors</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                         {authors.map((author) => (
                              <div
                                   key={author.id}
                                   className="sub border dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center duration-200"
                              >
                                   <img
                                        src={author.image}
                                        alt={author.name}
                                        className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200 dark:border-gray-700"
                                   />
                                   <h2 className="text-xl font-bold mb-2">{author.name}</h2>
                                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{author.email}</p>
                                   
                                   <Link href={`/authors/${author.slug}`} passHref>
                                        <button className="btn-primary text-white font-medium py-2 px-6 rounded-lg hover:cursor-pointer transition-colors duration-200 shadow-md">
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
