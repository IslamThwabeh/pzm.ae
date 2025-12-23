import React from 'react';
import { Link } from '@tanstack/react-router';

export function Home() {
  return (
    <div>
      {/* Hero Slider */}
      <section className="slider">
        <button className="prev" aria-label="Previous slide">&#10094;</button>
        <button className="next" aria-label="Next slide">&#10095;</button>
        <div className="slides">
          <img src="/images/Services/Sell_Your_Old_iPhones.jpg" alt="Sell Your Old iPhones" className="active" />
          <img src="/images/Services/repairing_services.jpg" alt="Repairing Services" />
          <img src="/images/Services/reignite_your_macbook.jpg" alt="Reignite Your MacBook" />
          <img src="/images/Services/sell_old_mackbook.jpg" alt="Sell Old MacBook" />
          <img src="/images/Services/all_services_pic.jpg" alt="All Services" />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome to PZM Computers & Phones Store -Buy•Sell•Fix•Used•PC•Build</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-4">
            Located in the heart of Dubai, PZM Computers & Phones Store -Buy•Sell•Fix•Used•PC•Build is your trusted destination for all things tech. 
            With over a decade of experience, we specialize in providing comprehensive solutions for your electronic devices, 
            from sales and repairs to custom builds and accessories.
          </p>
          <p className="text-lg mb-4">
            Our team of certified technicians combines expertise with genuine parts to deliver exceptional service. 
            Whether you're looking to buy, sell, repair, or upgrade your devices, we offer transparent pricing, 
            quality assurance, and professional support every step of the way.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Why Choose PZM?</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Certified technicians with years of experience</li>
                <li>Genuine parts and quality assurance</li>
                <li>Competitive pricing and transparent quotes</li>
                <li>Quick turnaround on repairs</li>
                <li>Comprehensive warranty coverage</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Our Commitment</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Expert advice and consultation</li>
                <li>Customer satisfaction guarantee</li>
                <li>After-sales support</li>
                <li>Eco-friendly practices</li>
                <li>Latest tech solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="categories">
          <div className="category hover-lift">
            <div className="category-img">
              <img src="/images/Catigories/mini_brand_new.webp" alt="New Devices" />
            </div>
            <h3>New Devices</h3>
            <p>Latest smartphones, laptops, and accessories from leading brands</p>
            <Link to="/services/brand-new" className="read-more">Learn More</Link>
          </div>
          <div className="category hover-lift">
            <div className="category-img">
              <img src="/images/Catigories/mini_Used_Phones.webp" alt="Used Devices" />
            </div>
            <h3>Used Devices</h3>
            <p>Quality-checked pre-owned devices at competitive prices</p>
            <Link to="/services/secondhand" className="read-more">Learn More</Link>
          </div>
          <div className="category hover-lift">
            <div className="category-img">
              <img src="/images/Catigories/mini_laptop_maintenance.webp" alt="Repair Services" />
            </div>
            <h3>Repair Services</h3>
            <p>Professional device repair and maintenance by certified technicians</p>
            <Link to="/services/repair" className="read-more">Learn More</Link>
          </div>
          <div className="category hover-lift">
            <div className="category-img">
              <img src="/images/Catigories/mini_GamingPC.webp" alt="Gaming PC" />
            </div>
            <h3>Gaming PC</h3>
            <p>Custom gaming PC builds with premium components</p>
            <Link to="/services/gaming-pc" className="read-more">Learn More</Link>
          </div>
          <div className="category hover-lift">
            <div className="category-img">
              <img src="/images/Catigories/mini_sell-gadgets.webp" alt="Sell Devices" />
            </div>
            <h3>Sell Devices</h3>
            <p>Get the best value for your used electronics</p>
            <Link to="/services/sell-gadgets" className="read-more">Learn More</Link>
          </div>
          <div className="category hover-lift">
            <div className="category-img">
              <img src="/images/Catigories/mini_mobile_accessories.webp" alt="Accessories" />
            </div>
            <h3>Accessories</h3>
            <p>Wide range of genuine accessories for all devices</p>
            <Link to="/services/accessories" className="read-more">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Visit Our Store</h2>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Store Location</h3>
              <p className="mb-4">
                Find us inside Hessa Union Coop Hypermarket, Ground floor. We're conveniently located 
                to serve customers throughout Dubai with easy parking access and extended business hours.
              </p>
              <div className="space-y-2">
                <p><strong>Address:</strong> Hessa Street Branch</p>
                <p><strong>Phone:</strong> +971 528026677</p>
                <p><strong>Email:</strong> info@pzm.ae</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <p><strong>Monday - Saturday:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Sunday:</strong> 11:00 AM - 9:00 PM</p>
                <p className="mt-4">
                  Extended hours available by appointment for emergency repairs and corporate clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}