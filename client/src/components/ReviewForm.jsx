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
    <form onSubmit={handleSubmit}>
      <select name='rating'
        value={formData.rating}
        onChange={handleChange}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <textarea name='comment'
        placeholder='Write review'
        value={formData.comment}
        onChange={handleChange}
      />

      <button type='submit' disabled={loading}>
        {
          loading ? "Adding..." : "Add Review"
        }
      </button>
    </form>
  )
}

export default ReviewForm
