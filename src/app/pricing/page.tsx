'use client';

import React from 'react';
import Link from 'next/link';
import { SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700">
            Choose Your Plan
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select the perfect plan for your PDF merging needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col">
            <div className="p-6 sm:p-8 flex-grow">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Free</h3>
              <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">$0</span>
                <span className="ml-1 text-xl text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <p className="mt-5 text-gray-500 dark:text-gray-400 text-sm">
                Perfect for occasional PDF merging needs
              </p>
              
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">5 PDF merges per month</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Max 10MB per file</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Basic PDF merging</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-700">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="w-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                    Get Started
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="block w-full text-center bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                  Current Plan
                </Link>
              </SignedIn>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-blue-500 dark:border-blue-400 flex flex-col transform scale-105 z-10">
            <div className="p-6 sm:p-8 flex-grow">
              <div className="inline-block px-3 py-1 text-xs font-medium leading-5 text-blue-800 bg-blue-100 dark:text-blue-100 dark:bg-blue-800 rounded-full mb-2">
                MOST POPULAR
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Premium</h3>
              <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">$9.99</span>
                <span className="ml-1 text-xl text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <p className="mt-5 text-gray-500 dark:text-gray-400 text-sm">
                Perfect for regular PDF merging needs
              </p>
              
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Unlimited PDF merges</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Max 50MB per file</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Advanced PDF editing</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Priority support</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 sm:p-8 bg-blue-50 dark:bg-blue-900/30">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Sign Up & Upgrade
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <button 
                  onClick={() => alert('Payment processing would be integrated here')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upgrade Now
                </button>
              </SignedIn>
            </div>
          </div>

          {/* Business Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col">
            <div className="p-6 sm:p-8 flex-grow">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Business</h3>
              <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">$24.99</span>
                <span className="ml-1 text-xl text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <p className="mt-5 text-gray-500 dark:text-gray-400 text-sm">
                Perfect for business PDF processing needs
              </p>
              
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Unlimited PDF merges</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Max 100MB per file</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Advanced PDF editing</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Dedicated support</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">API access</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-700">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="w-full bg-gray-800 dark:bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors">
                    Sign Up First
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/contact" className="block w-full text-center bg-gray-800 dark:bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors">
                  Contact Sales
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Have questions about our pricing? <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact us</Link>
          </p>
          <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}