"use client"
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import React from 'react'

const fetcher = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    console.log("Data from fetcher:", data);
    
    if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
    }
    return data;
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

const Comments = ({ blogSlug }) => {
    useEffect(() => setMounted(true), []);
    const [mounted, setMounted] = useState(false);    
    const [desc, setDesc] = useState("")

    const { data: session , status} = useSession()

    // Always call SWR, but only if blogSlug exists
    // Trim the slug to ensure no whitespace issues
    const trimmedSlug = blogSlug?.trim();
    
    const { data, mutate, isLoading } = useSWR(
        trimmedSlug ? `/api/comments?blogSlug=${trimmedSlug}` : null,
        fetcher)

    if (!session) {
        return <p>Please sign in to view and post comments.</p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Description :", desc);
        // Trim the slug before sending to ensure consistency
        const trimmedSlug = blogSlug?.trim();
        console.log("Blog Slug being sent in POST:", trimmedSlug);

        if (!desc) return
        try {
            const res=  await fetch(`/api/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Use the trimmed slug
                body: JSON.stringify({ desc, blogSlug: trimmedSlug, userEmail: session.user.email}),
            })
            console.log("POST request response:", res);
            
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to submit comment");
            }
            setDesc("")
            mutate()
        } catch (error) {
            console.log("Error submitting comment:", error);
        }
    }
    return (
        <section className=" w-full py-16 mx-auto">
            <h2 className="text-4xl font-bold  my-5">Your Feedback</h2>

            <div className=' w-full flex flex-col gap-6'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chat" className="sr-only"></label>
                    <div className="flex items-center rounded-lg justify-around ">
                        <input type="text" value={desc}
                            onChange={(e) => { setDesc(e.target.value) }}
                            id="chat" rows="1" className=" p-2.5 w-full text-sm rounded-lg border focus:ring-gray-400 capitalize italic " placeholder="Write Your thoughts here..."></input>
                        <button
                            type="submit" className="btn-primary inline-flex justify-center p-3  rounded-full  cursor-pointer border  ml-2.5">
                            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                            </svg>
                            <span className="sr-only ">Send message</span>
                        </button>
                    </div>
                </form>

                {/* Other Comments */}
                {isLoading ? (
                    <p>Loading ....</p>
                ) : (
                    (data?.length > 0 ? (
                        data.map((item) => (
                            <div
                                key={item.id}
                                className=" w-full flex flex-col gap-3 mt-6">
                                <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
                                    <img className="w-6 h-6 rounded-full" src={item.user.image} alt={item.user.name} />
                                    <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                                        <p className="pe-3 font-medium e">{item.user.name}</p>
                                        {mounted && <p className="ps-3 text-sm ">{formatDate(item.createdAt)}</p>}
                                    </div>
                                </figcaption>
                                <hr className='' />
                                <p className="text-sm ">{item.desc}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet</p>
                    ))
                )}
            </div>
        </section>
    )
}
export default Comments
