import React from 'react'

const UploadImageInput = ({ onChange, label }) => {
    const uploadButtonStyles = "bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex gap-3 ";

    return (
        <div className="flex items-center ">
          <label htmlFor="bgImage" className="text-gray-700 font-medium mr-4">
            {label}
          </label>
          <input
            type="file"
            id="bgImage"
            className="sr-only"
            accept="image/*"
            onChange={onChange}
          />
          <label htmlFor="bgImage" className={uploadButtonStyles}>
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>            Upload Image
          </label>
        </div>
      );
    
}

export default UploadImageInput
