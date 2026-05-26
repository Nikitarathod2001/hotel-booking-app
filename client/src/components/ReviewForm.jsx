import React, {useState} from 'react';
import { createReview } from '../services/reviewService';
import toast from 'react-hot-toast';

const ReviewForm = ({hotelId, onReviewAdded}) => {

  const [formData, setFormData] = useState({
    rating: 5,
    comment: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);

      await createReview({
        hotelId, 
        ...formData
      });

      toast.success("Review added");

      setFormData({
        rating: 5,
        comment: ""
      });

      onReviewAdded();
      
    } catch (error) {
      cosnole.log(error);
      toast.error(error.response?.data?.message || "Review failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className='bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-5'
    >

      <div>

        <h3 className='text-2xl font-bold text-slate-900 mb-2'>
          Write a Review
        </h3>

        <p className='text-slate-500'>
          Share your experience with other guests.
        </p>

      </div>

      <div>

        <label className='block text-sm font-medium text-slate-700 mb-2'>
          Rating
        </label>

        <select name='rating'
          value={formData.rating}
          onChange={handleChange}
          className='w-full rounded-2xl px-3 py-3 border border-zinc-400 focus:outline-1'
        >

          <option value="1">
            ⭐ 1 - Poor
          </option>

          <option value="2">
            ⭐⭐ 2 - Fair
          </option>

          <option value="3">
            ⭐⭐⭐ 3 - Good
          </option>

          <option value="4">
            ⭐⭐⭐⭐ 4 - Very Good
          </option>

          <option value="5">
            ⭐⭐⭐⭐⭐ 5 - Excellent
          </option>

        </select>

      </div>

      <div>

        <label className='block text-sm font-medium text-slate-700 mb-2'>
          Review
        </label>

        <textarea name='comment'
          placeholder='Write your experience'
          value={formData.comment}
          onChange={handleChange}
          rows={3}
          className='w-full rounded-2xl px-3 py-3 border border-zinc-400 focus:outline-1'
        />

      </div>

      <button type='submit' disabled={loading}
        className='w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-semibold text-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {
          loading ? "Adding Review..." : "Add Review"
        }
      </button>

    </form>
  )
}

export default ReviewForm
