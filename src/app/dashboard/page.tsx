'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import PDFUploader from '@/components/PDFUploader'
import FileList from '@/components/FileList'

export default function Dashboard() {
  const { user, isSignedIn } = useUser()
  const [files, setFiles] = useState<File[]>([])
  const [mergedFileUrl, setMergedFileUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usageInfo, setUsageInfo] = useState<{
    usageCount: number;
    limit: number;
    hasExceededLimit: boolean;
    remainingGenerations: number;
  } | null>(null)
  const [isLoadingUsage, setIsLoadingUsage] = useState(false)
  
  // Clean up object URL when component unmounts or when URL changes
  useEffect(() => {
    return () => {
      // Revoke any existing object URL to prevent memory leaks
      if (mergedFileUrl) {
        URL.revokeObjectURL(mergedFileUrl)
      }
    }
  }, [mergedFileUrl])
  
  // Fetch usage information when the component mounts or user changes
  useEffect(() => {
    const fetchUsageInfo = async () => {
      if (!isSignedIn) return;
      
      setIsLoadingUsage(true);
      try {
        const response = await fetch('/api/pdf-usage');
        
        if (response.ok) {
          const data = await response.json();
          setUsageInfo(data);
        } else {
          console.error('Failed to fetch usage information');
        }
      } catch (err) {
        console.error('Error fetching usage information:', err);
      } finally {
        setIsLoadingUsage(false);
      }
    };
    
    fetchUsageInfo();
  }, [isSignedIn, user?.id])
  
  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles])
    setError(null)
  }
  
  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }
  
  const clearAll = () => {
    // Revoke any existing object URL to prevent memory leaks
    if (mergedFileUrl) {
      URL.revokeObjectURL(mergedFileUrl)
    }
    
    setFiles([])
    setMergedFileUrl(null)
    setError(null)
  }
  
  const mergePDFs = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge')
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const formData = new FormData()
      files.forEach((file, index) => {
        formData.append(`file${index}`, file)
      })
      
      const response = await fetch('/api/merge-pdf', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        
        // If the error is due to exceeding the free tier limit, update the usage info
        if (errorData.requiresUpgrade) {
          setUsageInfo(prev => ({
            ...prev!,
            usageCount: errorData.usageCount,
            hasExceededLimit: true,
            remainingGenerations: 0
          }));
        }
        
        throw new Error(errorData.error || 'Failed to merge PDF files')
      }
      
      // Get the blob from the response
      const blob = await response.blob()
      
      // Ensure the blob is of type 'application/pdf'
      const pdfBlob = new Blob([blob], { type: 'application/pdf' })
      
      // Create a URL for the blob
      const url = URL.createObjectURL(pdfBlob)
      console.log('Created URL for merged PDF:', url)
      setMergedFileUrl(url)
      
      // Update usage info after successful merge
      if (isSignedIn) {
        const response = await fetch('/api/pdf-usage');
        if (response.ok) {
          const data = await response.json();
          setUsageInfo(data);
        }
      }
    } catch (err: any) {
      console.error('Error merging PDFs:', err)
      setError(err.message || 'Failed to merge PDF files. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const downloadMergedFile = () => {
    if (mergedFileUrl) {
      console.log('Downloading file from URL:', mergedFileUrl)
      const a = document.createElement('a')
      a.href = mergedFileUrl
      a.download = 'merged_document.pdf'
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      setTimeout(() => {
        document.body.removeChild(a)
      }, 100)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">PDF Merger</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Combine multiple PDF files into a single document
          </p>
          
          {/* Usage Information */}
          {isSignedIn && usageInfo && (
            <div className="mt-4 flex justify-center">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${usageInfo.hasExceededLimit ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                <span className="font-medium">
                  {usageInfo.hasExceededLimit 
                    ? 'Free tier limit exceeded' 
                    : `${usageInfo.remainingGenerations} free merges remaining`}
                </span>
                {usageInfo.hasExceededLimit && (
                  <Link href="/pricing" className="ml-2 underline font-medium">
                    Upgrade now
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6">
          {/* File Upload Area */}
          <PDFUploader onFilesSelected={handleFilesSelected} />
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {error}
              {error.includes('Free tier limit exceeded') && (
                <div className="mt-2">
                  <Link href="/pricing" className="text-red-700 dark:text-red-300 font-medium underline">
                    Upgrade to Premium
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {/* File List */}
          <FileList 
            files={files} 
            onRemove={removeFile} 
            onClearAll={clearAll} 
          />
          
          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => document.getElementById('pdf-uploader')?.click()}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Add More Files
            </button>
            <button
              onClick={mergePDFs}
              disabled={files.length < 2 || isLoading || (usageInfo?.hasExceededLimit ?? false)}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${(files.length < 2 || isLoading || (usageInfo?.hasExceededLimit ?? false)) ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={usageInfo?.hasExceededLimit ? 'Free tier limit exceeded. Please upgrade.' : ''}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Merge PDFs'}
            </button>
          </div>
          
          {/* Download Section */}
          {mergedFileUrl && (
            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-1">
                    PDF Successfully Merged!
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Your files have been combined into a single PDF document
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={downloadMergedFile}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </button>
                  <a 
                    href={mergedFileUrl} 
                    download="merged_document.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Direct Link
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}