import React, { useState } from 'react';
import { initializeRazorpay } from '../utils/razorpay';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../Components/ui/dialog";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
// import { X } from "lucide-react";

const DonationForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleDonation = async (finalAmount) => {
    setProcessing(true);
    
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: finalAmount * 100,
      currency: 'INR',
      name: 'Sonch',
      description: 'Donation',
      image: '',
      handler: function(response) {
        const paymentDetails = {
          paymentId: response.razorpay_payment_id,
          amount: finalAmount,
          currency: 'INR',
          timestamp: new Date().toISOString()
        };
        
        const donations = JSON.parse(localStorage.getItem('donations') || '[]');
        donations.push(paymentDetails);
        localStorage.setItem('donations', JSON.stringify(donations));
        
        alert('Thank you for your donation! Payment ID: ' + response.razorpay_payment_id);
        setIsModalOpen(false);
        setAmount('');
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#2563eb'
      },
      modal: {
        ondismiss: function() {
          setProcessing(false);
        }
      }
    };

    try {
      const rzp = await initializeRazorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error:', error);
      alert('Payment initialization failed. Please try again.');
      setProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    handleDonation(Number(amount));
  };

  return (
    <div className="w-full max-w-md mx-auto mr-2 ml-5">
      <Button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-yellow-300 hover:bg-white text-gray-600 mr-4 font-semibold py-3 rounded-full shadow-md transition-colors"
      >
        Donate
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md border rounded-lg shadow-lg">
          <div className="relative">
            <DialogHeader className="px-6 pt-6 pb-4">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Make a Donation
              </DialogTitle>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                {/* <X className="h-5 w-5 text-gray-500" /> */}
              </button>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
              <div className="space-y-2">
                <label 
                  htmlFor="amount" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Donation Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="pl-8 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    min="1"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Processing...' : 'Proceed to Pay'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationForm;