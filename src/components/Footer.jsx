import React from 'react';
import { CiMail } from "react-icons/ci";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-black p-8 ">

      <div className="max-w-5xl mx-auto flex md:flex-row justify-between ">

 {/* left */}

        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold  mb-3 text-white">
            Shop Non-Stop on Meesho
          </h1>
          <span className="text-lg  text-white block">
            Trusted by crores of Indians
          </span>
          <div className="mt-2  text-white">
            Cash on Delivery | Free Delivery
          </div>

          <div className="flex mt-4 gap-3">
            <a href="https://www.meesho.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/static/apple-store.webp"
                width={150}
                alt="Download on the App Store"
              />
            </a>
            <a href="https://www.meesho.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/static/play-store.webp"
                width={150}
                alt="Get it on Google Play"
              />
            </a>
          </div>
        </div>

        {/* RIGHT  */}

        <div className="flex gap-10  text-white md:w-1/2">
          <ul className="space-y-2 mt-2">
            <li>Careers</li>
            <li>Become a Supplier</li>
            <li>Hall of Fame</li>
            <li>Sitemap</li>
          </ul>

          <ul className="space-y-2 mt-2">
            <li>Legal and Policies</li>
            <li>Meesho Tech Blog</li>
            <li>Notices and Returns</li>
          </ul>


          <ul className="space-y-2 ml-10 ">
               <h1 className='text-center text-2xl font-bold mb-5'>Contact</h1>
              <div className=''>
              <a href=""><li className='flex'><CiMail className='text-3xl mr-4 flex mb-5'/>robinofficial200@gmail.com</li></a>
              <a href=""><li className='flex'><FaSquareXTwitter className='text-3xl mr-4 flex mb-5'/>X.com</li></a>
               <a href=""><li className='flex'><FaInstagramSquare className='text-3xl mr-4 flex mb-5'/>Istagram</li></a>

              </div>
          </ul>
        </div>

      </div>
    </footer>
  );
};
