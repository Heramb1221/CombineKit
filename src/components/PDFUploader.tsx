'use client'

import { useState, useRef } from 'react'

type PDFUploaderProps = {
  onFilesSelected: (files: File[]) => void
  multiple?: boolean
  className?: string
}

export default function PDFUploader({ 
  onFilesSelected, 
  multiple = true,
  className = ''
}: PDFUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      // Only accept PDF files
      const pdfFiles = fileArray.filter(file => file.type === 'application/pdf')
      
      if (pdfFiles.length > 0) {
        onFilesSelected(pdfFiles)
      }
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files)
      // Only accept PDF files
      const pdfFiles = fileArray.filter(file => file.type === 'application/pdf')
      
      if (pdfFiles.length > 0) {
        onFilesSelected(pdfFiles)
      }
    }
  }
  
  return (
    <div 
      className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'} ${className}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        id="pdf-uploader"
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange} 
        className="hidden" 
        multiple={multiple} 
        accept=".pdf,application/pdf" 
      />
      <div className="space-y-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Drag and drop PDF files here, or click to select files
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Only PDF files are supported
        </p>
      </div>
    </div>
  )
}