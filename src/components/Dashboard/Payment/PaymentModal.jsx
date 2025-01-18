import React, { Fragment, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentModal = ({
  closeModal,
  isOpen,
  camp,
  refetch,
  onPaymentSuccess,
}) => {
  const { user } = useAuth();
  const [paymentInfo, setPaymentInfo] = useState(null);

  // Update payment info when camp changes
  useEffect(() => {
    if (camp) {
      setPaymentInfo({
        customer: {
          name: user?.displayName,
          email: user?.email,
        },
        registeredCampId: camp._id,
        fees: camp.fees,
        status: "Pending",
      });
    }
  }, [camp, user]);

  if (!camp) {
    return null; // Avoid rendering if camp data is not available
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-teal-900"
                >
                  Review Info Before Register
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-teal-500">
                    Camp Name: {camp.name}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-teal-500">
                    Registerer: {user?.displayName}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-teal-500">Fees: $ {camp.fees}</p>
                </div>

                {/* CheckoutForm */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    closeModal={closeModal}
                    paymentInfo={paymentInfo}
                    refetch={refetch}
                    onPaymentSuccess={onPaymentSuccess}
                  />
                </Elements>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PaymentModal;
