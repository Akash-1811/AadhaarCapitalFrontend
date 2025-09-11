/**
 * Utility function to scroll to the enquiry form on the homepage
 */
export const scrollToEnquiryForm = () => {
  // First, navigate to homepage if not already there
  if (window.location.pathname !== '/') {
    window.location.href = '/#enquiry-form';
    return;
  }

  // If already on homepage, scroll to the form
  const formElement = document.getElementById('enquiry-form');
  if (formElement) {
    formElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    // Optional: Add a subtle highlight effect
    formElement.style.transition = 'box-shadow 0.3s ease';
    formElement.style.boxShadow = '0 0 20px rgba(255, 102, 0, 0.3)';
    
    setTimeout(() => {
      formElement.style.boxShadow = '';
    }, 2000);
  }
};
