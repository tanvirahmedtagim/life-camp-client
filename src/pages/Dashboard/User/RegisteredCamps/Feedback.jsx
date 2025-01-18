import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const FeedbackPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [feedbackGiven, setFeedbackGiven] = useState(false); // Track if feedback is already given

  useEffect(() => {
    // Check if feedback already exists for the camp
    const checkFeedback = async () => {
      try {
        const response = await axiosSecure.get(
          `/feedback/${id}/${user?.email}`
        );
        if (response.data) {
          setFeedbackGiven(true); // Feedback already given
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.email) {
      checkFeedback();
    }
  }, [id, user?.email, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feedbackGiven) {
      Swal.fire({
        icon: "info",
        title: "Feedback Already Given",
        text: "You have already submitted feedback for this camp.",
      });
      return;
    }

    if (rating < 1 || rating > 5) {
      Swal.fire({
        icon: "error",
        title: "Invalid Rating",
        text: "Rating must be between 1 and 5.",
      });
      return;
    }

    const feedbackData = {
      campId: id,
      rating,
      description,
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    try {
      await axiosSecure.post("/feedback", feedbackData);
      Swal.fire({
        icon: "success",
        title: "Feedback Submitted",
        text: "Thank you for your feedback!",
      });

      // Reset form data after submission
      setRating(0);
      setDescription("");
      setFeedbackGiven(true);

      // Redirect to registered camps page
      navigate("/dashboard/registered-camps");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your feedback. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Submit Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rating" className="block font-medium mb-1">
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            required
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border rounded"
            disabled={feedbackGiven}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={feedbackGiven}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
          disabled={feedbackGiven}
        >
          Submit Feedback
        </button>
      </form>

      {/* Show message below the submit button if feedback is already given */}
      {feedbackGiven && (
        <p className="mt-4 text-center text-sm text-teal-500">
          You have already given feedback for this camp.
        </p>
      )}
    </div>
  );
};

export default FeedbackPage;
