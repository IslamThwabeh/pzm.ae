import React from 'react';
import { useParams } from '@tanstack/react-router';

export function Services() {
  const { category } = useParams();

  const getServiceContent = () => {
    switch (category) {
      case 'brand-new':
        return {
          title: 'Brand New Devices',
          description: `At PZM Computers & Phones Store -Buy•Sell•Fix•Used•PC•Build, we offer a comprehensive selection of brand new devices from leading manufacturers. All our products come with official warranty and genuine accessories.

Smartphones & Mobile Devices:
- Latest iPhone models with all storage configurations
- Samsung Galaxy S and A series smartphones
- Google Pixel devices
- Premium Android phones from leading brands
- iPads and tablets
- Smartwatches and wearables

Laptops & Computers:
- MacBooks and MacBook Pro models
- Dell XPS and Inspiron series
- HP Spectre and Envy lineup
- Lenovo ThinkPad and Yoga series
- Gaming laptops from top manufacturers
- Custom desktop PCs

Gaming Systems:
- Latest gaming consoles
- Gaming laptops
- Custom gaming PC builds
- VR headsets and accessories
- Gaming peripherals
- Streaming equipment

Professional Equipment:
- Business laptops and workstations
- Professional desktop systems
- Network equipment
- Video conferencing solutions
- Business tablets
- Professional accessories

Our Warranty Promise:
- Official manufacturer warranty
- Genuine accessories included
- Free setup and configuration
- Technical support
- After-sales service
- Software updates and assistance

Why Choose Our New Devices:
- 100% genuine products
- Competitive pricing
- Expert technical support
- Flexible payment options
- Professional setup assistance
- Regular maintenance services

Additional Services:
- Device setup and configuration
- Data transfer from old devices
- Software installation
- Custom configurations
- Extended warranty options
- Trade-in programs

Visit our store today to explore our latest collection of brand new devices. Our knowledgeable staff will help you find the perfect device that matches your needs and preferences.`,
          image: '/images/Catigories/mini_brand_new.webp'
        };
      case 'secondhand':
        return {
          title: 'Quality Pre-owned Devices',
          description: `At PZM Computers & Phones Store -Buy•Sell•Fix•Used•PC•Build, we specialize in providing high-quality pre-owned devices that combine reliability with affordability. Each device undergoes our comprehensive certification process to ensure you receive a dependable product that meets our strict quality standards.

          Our Pre-owned Device Categories:
          
          Smartphones:
          - iPhones (iPhone 11 and newer)
          - Samsung Galaxy S and Note series
          - Google Pixel devices
          - Other premium Android phones
          
          Laptops & Computers:
          - MacBooks and MacBook Pros
          - Dell XPS and Latitude series
          - HP Spectre and EliteBook models
          - ThinkPad business laptops
          - Gaming laptops from top brands
          
          Tablets & iPads:
          - iPad Pro and Air models
          - Samsung Galaxy Tabs
          - Microsoft Surface devices
          
          Gaming Systems:
          - PlayStation consoles
          - Xbox systems
          - Nintendo devices
          - Gaming PC components
          
          Quality Assurance Process:
          - Comprehensive hardware diagnostics
          - Battery health verification (minimum 80%)
          - Full functionality testing
          - Professional cleaning and sanitization
          - Software updates and optimization
          - Data security wiping
          
          Every Device Includes:
          - 30-day warranty coverage
          - Free basic setup and configuration
          - Data transfer assistance
          - Software updates
          - Technical support
          
          Why Choose Our Pre-owned Devices:
          - Significant cost savings vs. new
          - Environmentally responsible choice
          - Thoroughly tested and verified
          - Clean history verification
          - Professional support and guidance
          
          Visit our store to explore our current inventory of quality pre-owned devices. Our expert staff will help you find the perfect device that matches your needs and budget.`,
          image: '/images/Catigories/mini_Used_Phones.webp'
        };
      case 'repair':
        return {
          title: 'Repair Services',
          description: `Professional repair services for all your electronic devices. Our certified technicians use genuine parts and advanced tools to ensure quality repairs.

          Services include:
          - Screen replacements
          - Battery replacements
          - Water damage recovery
          - Hardware repairs
          - Software troubleshooting
          - Data recovery
          - Performance optimization

          All repairs come with:
          - 90-day warranty
          - Genuine parts
          - Expert technicians
          - Quick turnaround
          - Competitive pricing`,
          image: '/images/Catigories/mini_laptop_maintenance.webp'
        };
      case 'gaming-pc':
        return {
          title: 'Gaming PC',
          description: `Custom gaming PC builds tailored to your needs and budget. We use premium components and expert assembly to create the perfect gaming rig.

          Build options include:
          - Entry-level gaming PCs
          - Mid-range performance builds
          - High-end gaming rigs
          - Professional streaming setups
          - VR-ready systems

          Every build includes:
          - Component selection consultation
          - Professional assembly
          - Cable management
          - Performance testing
          - Windows installation
          - Game optimization`,
          image: '/images/Catigories/mini_GamingPC.webp'
        };
      case 'sell-gadgets':
        return {
          title: 'Sell Your Devices',
          description: `Get the best value for your used electronics with our transparent and efficient buying process. At PZM Computers & Phones Store -Buy•Sell•Fix•Used•PC•Build, we offer competitive prices and instant payment for your devices.

          Devices We Accept:
          - iPhones (iPhone X and newer)
          - Samsung Galaxy phones (S and Note series)
          - Other premium Android smartphones
          - MacBooks and Apple laptops
          - Windows laptops and ultrabooks
          - Gaming laptops and desktops
          - iPads and tablets
          - Gaming consoles and accessories
          - Smartwatches and wearables

          Our Evaluation Process:
          - Professional device inspection
          - Market value assessment
          - Condition-based pricing
          - Instant price quotes
          - Same-day payment

          What We Check:
          - Overall physical condition
          - Screen and display quality
          - Battery health status
          - Functionality of all components
          - Internal storage capacity
          - Warranty status

          Additional Services:
          - Free data transfer service
          - Secure data wiping
          - Trade-in options available
          - Bulk purchase deals
          - Corporate buyback programs

          Tips for Maximum Value:
          - Back up your data before selling
          - Remove screen protectors/cases
          - Bring original accessories if available
          - Reset device to factory settings
          - Bring proof of purchase if possible

          Why Choose Us:
          - Best market prices
          - Instant payment
          - Professional evaluation
          - Secure data handling
          - No hidden fees
          - Environmentally responsible disposal

          Visit our store today for an instant evaluation and same-day payment. Our expert team ensures you get the best value for your devices with a hassle-free selling experience.`,
          image: '/images/Catigories/mini_sell-gadgets.webp'
        };
      case 'accessories':
        return {
          title: 'Accessories',
          description: `Complete your device setup with our range of quality accessories. We offer genuine products from leading manufacturers.

          Available accessories:
          - Phone cases and screen protectors
          - Chargers and power banks
          - Headphones and speakers
          - Storage solutions
          - Gaming peripherals
          - Laptop bags and sleeves

          All accessories feature:
          - Manufacturer warranty
          - Genuine products
          - Competitive pricing
          - Expert advice
          - Installation service`,
          image: '/images/Catigories/mini_mobile_accessories.webp'
        };
      default:
        return {
          title: 'Service Not Found',
          description: 'The requested service category does not exist.',
          image: ''
        };
    }
  };

  const service = getServiceContent();

  return (
    <section className="service-details">
      <h2>{service.title}</h2>
      <div className="service-content">
        {service.image && (
          <img src={service.image} alt={service.title} className="service-image" />
        )}
        <div className="service-description">
          <div className="whitespace-pre-line">{service.description}</div>
        </div>
      </div>
    </section>
  );
}