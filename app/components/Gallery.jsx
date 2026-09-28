"use client"; // This file runs in the browser, not on the server

import { useState, useEffect } from "react";

export default function Gallery({ images }) {
  // selected = the main image object the user clicked on
  const [selected, setSelected] = useState(null);
  // lightboxImage = the URL currently shown large in the lightbox
  const [lightboxImage, setLightboxImage] = useState(null);
  // closing = true while the fade-out animation is playing
  const [closing, setClosing] = useState(false);

  // Listen for Escape key to close the lightbox
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") startClose();
    }
    window.addEventListener("keydown", handleKey);
    // Cleanup: remove the listener when the component unmounts
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function openLightbox(image) {
    setSelected(image);
    setLightboxImage(image.url); // Start with the main image URL
  }

  function startClose() {
    // Trigger the fade-out animation
    setClosing(true);
    // Wait for animation to finish before removing the lightbox from the DOM
    setTimeout(() => {
      setSelected(null);
      setLightboxImage(null);
      setClosing(false);
    }, 350); // Must match the CSS duration above
  }

  return (
    <>
      {/* Gallery grid — uses CSS columns for masonry-style natural aspect ratios */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="break-inside-avoid cursor-pointer" // break-inside-avoid prevents images splitting across columns
            onClick={() => openLightbox(image)}
          >
            <img
              src={image.url}
              alt={image.title || ""}
              className="w-full rounded-lg shadow hover:opacity-90 transition-opacity"
            />
            {/* Only render title and description if they exist */}
            {image.title && (
              <p className="text-gray-600 font-medium mt-2">{image.title}</p>
            )}
            {image.description && (
              <p className="text-gray-400 text-sm">{image.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox — only renders when an image is selected */}
      {selected && (
        <div
          // closing class triggers the fade-out CSS animation
          className={`lightbox-overlay fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4 gap-4 ${
            closing ? "lightbox-closing" : ""
          }`}
          onClick={startClose} // Click outside the image to close
        >
          {/* key={lightboxImage} forces React to re-mount the img element
              when the URL changes, which replays the fade-in animation */}
          <img
            key={lightboxImage}
            src={lightboxImage}
            alt={selected.title || ""}
            className="lightbox-swap lightbox-image max-h-[80vh] max-w-full rounded shadow-lg object-contain"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing lightbox
          />

          {/* Detail thumbnails — only shown if this image has detail images */}
          {selected.detail_images && selected.detail_images.length > 0 && (
            <div
              className="flex gap-3 flex-wrap justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing lightbox
            >
              {/* Main image thumbnail — always shown first */}
              <img
                src={selected.url}
                alt="Main"
                onClick={() => setLightboxImage(selected.url)}
                className={`w-16 h-16 rounded object-cover cursor-pointer border-2 ${
                  lightboxImage === selected.url
                    ? "border-white" // White border = currently selected
                    : "border-transparent hover:border-gray-400"
                }`}
              />
              {/* Detail image thumbnails */}
              {selected.detail_images.map((detail) => (
                <img
                  key={detail.id}
                  src={detail.url}
                  alt="Detail"
                  onClick={() => setLightboxImage(detail.url)}
                  className={`w-16 h-16 rounded object-cover cursor-pointer border-2 ${
                    lightboxImage === detail.url
                      ? "border-white"
                      : "border-transparent hover:border-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}