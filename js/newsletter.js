import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function handleNewsletterSubscription(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const email = emailInput.value;
    
    // Disable form while processing
    emailInput.disabled = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';
    
    try {
        const { data, error } = await supabase
            .from('newsletter_subscriptions')
            .insert([{ email }]);
            
        if (error) {
            if (error.code === '23505') { // Unique violation
                alert('You are already subscribed to our newsletter!');
            } else {
                throw error;
            }
        } else {
            alert('Thank you for subscribing to our newsletter!');
            form.reset();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Sorry, there was an error. Please try again later.');
    } finally {
        // Re-enable form
        emailInput.disabled = false;
        submitButton.disabled = false;
        submitButton.textContent = 'Subscribe';
    }
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', handleNewsletterSubscription);
    }
});