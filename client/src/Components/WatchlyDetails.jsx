import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { Languages } from 'lucide-react';
import { API_URL } from '../../Contraints';

function WatchlyDetails() {
    const { id } = useParams();

    const [watchlyDetails, setWatchlyDetails] = useState({
        _id: "",
        title: "",
        description: "",
        images: [],
        category: "",
        director: "",
        year: "",
        language: "",
        rating: 0
    });

    const changeRating = async (newRating) => {
        setWatchlyDetails({ ...watchlyDetails, rating: newRating });
        await axios.patch(`${API_URL}/watchly/${id}/rating`, { rating: newRating });
    }

    const loadWatchlyDetails = async () => {
        const response = await axios.get(`${API_URL}/watchly/${id}`);
        setWatchlyDetails(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() => { loadWatchlyDetails() }, [id]);

        return (
            <div style={{ background: "linear-gradient(135deg, #2b1055, #7597de, #ff0844)"}} 
                 className='min-h-screen py-10 px-4 flex items-center justify-center'>
                <div className='max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-10'>
                    <div className='relative'>
                        <img
                            src={watchlyDetails.images[0]}
                            alt={watchlyDetails.title}
                            className='w-[350px] h-[500px] rounded-xl object-cover shadow-xl hover:scale-105 transition-transform duration-300'
                        />
                    </div>

                    <div className='backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-2xl w-[500px] space-y-4'>
                        <h1 className='text-3xl font-bold text-white mb-6'>{watchlyDetails.title}</h1>
                        
                        <p className='text-gray-200 leading-relaxed'>{watchlyDetails.description}</p>
                        
                        <div className='grid grid-cols-2 gap-4 mt-6'>
                            <div className='space-y-3'>
                                <p className='text-gray-200'>
                                    <span className='text-green-400 font-semibold'>Category: </span>
                                    {watchlyDetails.category}
                                </p>
                                <p className='text-gray-200'>
                                    <span className='text-green-400 font-semibold'>Director: </span>
                                    {watchlyDetails.director}
                                </p>
                            </div>
                            <div className='space-y-3'>
                                <p className='text-gray-200'>
                                    <span className='text-green-400 font-semibold'>Year: </span>
                                    {watchlyDetails.year}
                                </p>
                                <p className='text-gray-200'>
                                    <span className='text-green-400 font-semibold'>Language: </span>
                                    {watchlyDetails.language}
                                </p>
                            </div>
                        </div>

                        <div className='mt-6'>
                            {/* <p className='text-green-400 font-semibold mb-2'>Rat</p> */}
                            <div className='flex gap-2'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => changeRating(star)}
                                        className={`text-2xl ${
                                            star <= watchlyDetails.rating 
                                                ? 'text-yellow-400' 
                                                : 'text-gray-400'
                                        } hover:text-yellow-400 transition-colors`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default WatchlyDetails;