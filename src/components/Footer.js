import React from 'react';
import Icon from '@mdi/react';
import { mdiInstagram, mdiFacebook, mdiLinkedin, mdiTwitter} from '@mdi/js';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
        
        {/* Center section - Logo / Branding */}
        <div className="mb-4 md:mb-0 text-center">
          {/* Logo */}
          <a href="/">
            <img src="./assets/icons/blogger.png" alt="Blogger" className="w-40 font-bold h-auto" />
          </a>
            <p className="text-sm my-2">Your tagline or slogan here.</p>
          
          {/* dark light */}

          <label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                  d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input type="checkbox" value="halloween" className="toggle theme-controller" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
        </div>
          
        {/* Left section - Links */}
        <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Quick Links</h3>
        </div>



          {/* Right section - Social media icons */}
          <div className="">
            <h3 className="text-lg font-semibold">Follow Us: </h3>
            <div className="flex justify-center md:justify-end space-x-1 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <Icon className="hover:text-blue-500" path={mdiFacebook} size={1} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Icon className="hover:text-blue-400" path={mdiTwitter} size={1}/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Icon className=' hover:text-pink-400' path={mdiInstagram} size={1} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <Icon className="hover:text-blue-700" path={mdiLinkedin} size={1} />
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom section */}
        <div className="text-center mt-6 border-t border-gray-700 pt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Blogger. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;