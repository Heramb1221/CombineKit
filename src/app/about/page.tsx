import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700">
            About CombineKit
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're on a mission to make document management simple and accessible for everyone.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                CombineKit was founded in 2023 by a team of document management enthusiasts who were frustrated with the complexity and cost of existing PDF tools. We believed that merging PDF files should be simple, fast, and accessible to everyone, regardless of technical expertise.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                What started as a simple tool for our own use quickly grew into a comprehensive platform used by thousands of professionals, students, and businesses worldwide. Our focus on user experience, security, and performance has made CombineKit the preferred choice for PDF merging needs.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, we continue to innovate and expand our offerings while staying true to our core mission: making document management tasks simple and accessible for everyone.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Simplicity</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  We believe in making complex tasks simple. Our tools are designed to be intuitive and easy to use, eliminating unnecessary complexity.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Security</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Your documents contain sensitive information. We process all files locally in your browser, ensuring your data never leaves your device.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Accessibility</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  We believe everyone should have access to powerful document tools. That's why we offer a generous free tier and ensure our platform works on all devices.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Team</h2>
            <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
                CombineKit is built by a passionate team of developers, designers, and document management experts who are committed to creating the best PDF tools on the web.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full mx-auto mb-3 sm:mb-4"></div>
                  <h3 className="text-base sm:text-lg font-medium">Alex Johnson</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Founder & CEO</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full mx-auto mb-3 sm:mb-4"></div>
                  <h3 className="text-base sm:text-lg font-medium">Sarah Chen</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Lead Developer</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full mx-auto mb-3 sm:mb-4"></div>
                  <h3 className="text-base sm:text-lg font-medium">Michael Rodriguez</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">UX Designer</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}