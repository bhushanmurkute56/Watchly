import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { API_URL } from '../Contraints';
import { Search } from "lucide-react";
import pagenotfound from "./../src/assets/pagenotfound.png";
import WatchlyCard from './WatchlyCard';
import "./../src/index.css";

function Home() {
    const [watchly, setWatchly] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    const loadWatchly = async () => {
        const response = await axios.get(`${API_URL}/watchly`);
        setWatchly(response.data.data);
    };

    useEffect(() => {loadWatchly()}, []);

    const searchWatchly = async () => {
        toast.loading("Search...", {id: "searching"});
        try {
            const response = await axios.get(`${API_URL}/watchly/search?q=${search}`);
            toast.dismiss();
            setWatchly(response.data.data);
            setError("");
        }
        catch (error) {
            console.error("Error searching movies:", error);
            toast.dismiss();
            setWatchly([]);
            setError(error.response.data.message);
        }

        useEffect(() => {searchWatchly()}, [search]);
    }
  return (
    <div style={{ background: "linear-gradient(135deg, #2b1055, #7597de, #ff0844)"}} className='py-10'>
        <div className='flex w-[280px] h-[35px] items-center bg-white p-2 rounded-md mx-auto'>
            <input type="text"
                placeholder='Search Movie...'
                className='border-none text-sm px-4 py-1 text-center mx-auto bg-white text-black focus:outline-none rounded-lg'
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}/>
            <Search className='cursor-pointer'/>
        </div>
        {error ? (
            <div className='text-center space-y-4 mt-10 border'>
                <p className='text-red-500 text-center mt-4'>{error}</p>
                <img src={pagenotfound} alt="" className='h-100 w-100 m-auto mt-40'/>
            </div>
        ) : (
            <div className='flex flex-wrap items-center gap-15 pt-20 justify-center w-6xl mx-auto'>
                {watchly.map((watchlyObj) => {
                    const { _id, title, description, images, category, director, year, language, rating} = watchlyObj;

                    return (
                        <WatchlyCard
                        _id={_id}
                        key={_id}
                        title={title}
                        description={description}
                        images={images}
                        category={category}
                        director={director}
                        year={year}
                        language={language}
                        rating={rating}
                        loadWatchly={loadWatchly}
                        />
                    )
                })}
            </div>
        )}
        <Toaster position='top-right'/>
    </div>
  )
}

export default Home;