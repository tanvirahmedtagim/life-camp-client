/* eslint-disable react-hooks/exhaustive-deps */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = ({
  closeModal,
  paymentInfo,
  refetch,
  onPaymentSuccess,
}) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState(""); // Client secret from backend
  const [processing, setProcessing] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error handling state

  useEffect(() => {
    if (paymentInfo?.registeredCampId && paymentInfo?.fees) {
      getPaymentIntent(); // Fetch client secret when paymentInfo changes
    }
  }, [paymentInfo]);

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        registeredCampId: paymentInfo?.registeredCampId,
        fees: paymentInfo?.fees,
      });
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err);
      setError("Failed to create payment intent. Please try again.");
    }
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setProcessing(true); // Set loading state to true
    event.preventDefault(); // Prevent form submission

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false);
      return;
    }

    // Create payment method with card info
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcessing(false); // Reset loading state
      setError(error.message); // Set error message
      return;
    }

    // Confirm payment using the client secret from backend
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: paymentInfo?.customer?.name,
            email: paymentInfo?.customer?.email,
          },
        },
      });

    if (paymentError) {
      setProcessing(false);
      setError(paymentError.message); // Show error message if payment fails
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        const payment = {
          ...paymentInfo,
          transactionId: paymentIntent?.id,
          paymentStatus: "Paid",
        };
        // Save payment data to the backend
        await axiosSecure.post("/registered", payment);
        console.log("Payment saved", payment);

        // Call onPaymentSuccess callback to refetch and update UI
        refetch();

        // Navigate to registered camps page
        navigate("/dashboard/registered-camps");

        // Show success message
        Swal.fire(
          "Success!",
          "Your payment has been completed successfully.",
          "success"
        );
      } catch (err) {
        setError("Failed to save payment data. Please try again.");
        console.log(err);
      } finally {
        setProcessing(false); // Reset loading state
        closeModal(); // Close modal
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-around mt-2 gap-2">
        <button
          className="bg-teal-500 px-3 rounded-xl text-white"
          disabled={!stripe || !clientSecret || processing} // Disable if Stripe is not loaded or payment is in progress
          type="submit"
        >
          {processing ? "Processing..." : `Pay: $${paymentInfo?.fees}`}{" "}
          {/* Change text based on processing state */}
        </button>
        <button
          className="btn text-teal-500"
          type="button"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
      {error && <p className="text-red-600 mt-2">{error}</p>}{" "}
      {/* Display error if any */}
    </form>
  );
};

export default CheckoutForm;
