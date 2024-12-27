// src/utils/razorpay.js
export const loadRazorpayScript = () => {
  // Check if Razorpay is already loaded
  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const initializeRazorpay = async (options) => {
  try {
    const res = await loadRazorpayScript();
    
    if (!res) {
      throw new Error('Razorpay SDK failed to load');
    }

    // Create a new instance without opening it immediately
    const rzp = new window.Razorpay({
      ...options,
      modal: {
        ...options.modal,
        backdropClose: false, // Prevent closing on backdrop click
        escape: false, // Prevent closing on escape key
        ondismiss: function() {
          // Handle modal dismissal
          if (options.modal?.ondismiss) {
            options.modal.ondismiss();
          }
        }
      }
    });

    // Add event listeners
    rzp.on('payment.failed', function(response) {
      if (options.onPaymentFailure) {
        options.onPaymentFailure(response);
      }
    });

    return rzp;
  } catch (error) {
    console.error('Razorpay initialization failed:', error);
    throw error;
  }
};