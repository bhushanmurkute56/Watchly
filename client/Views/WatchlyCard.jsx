import React from 'react';
import axios from 'axios';
import { API_URL } from '../Contraints';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { Trash } from 'lucide-react';

function WatchlyCard({ _id, title, description, images, category, director, year, language, rating, loadWatchly }) {

  const deleteWatchly = (e) => {
    const response = axios.delete(`${API_URL}/watchly/${_id}/delete`);
    toast.success("Watchly Deleted Successfully");
    loadWatchly();
  }
  return (
    <Link to={`/watchly/${_id}`}>
      <div className='shadow-lg rounded-xl relative'> 
        <img src={images[0]} alt="" className='h-[440px] w-[310px] object-cover rounded-lg' />
        <h2 className='absolute text-black bg-amber-300/70 text-xl p-2 rounded-lg w-full top-0'>{title}</h2>
        <Trash className='inline-block absolute text-red-500 top-2.5 right-3' onClick={(e) => {
          deleteWatchly();
          e.preventDefault();
          e.stopPropagation();
        }} />
        <span className='absolute top-20 right-2 bg-yellow-500 p-1 rounded-lg'>{category}</span></div>
    </Link>
  )
}

export default WatchlyCard;