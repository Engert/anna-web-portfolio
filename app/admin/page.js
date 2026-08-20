"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [draggedId, setDraggedId] = useState(null);

  async function fetchImages() {
    const res = await fetch("/api/images");
    const data = await res.json();
    setImages(data.images || []);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.url) {
      setUploadedUrl(data.url);
      setTitle("");
      setDescription("");
      setFile(null);
      fetchImages();
    } else {
      setError("Upload failed");
    }

    setUploading(false);
  }

  async function handleDelete(id, public_id) {
    const confirmed = confirm("Delete this image?");
    if (!confirmed) return;

    const res = await fetch("/api/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, public_id }),
    });

    const data = await res.json();
    if (data.success) {
      fetchImages();
      setUploadedUrl(null);
    } else {
      alert("Delete failed");
    }
  }

  function handleDragStart(id) {
    setDraggedId(id);
  }

  function handleDragOver(e, overId) {
    e.preventDefault();
    if (draggedId === overId) return;

    const dragged = images.find((img) => img.id === draggedId);
    const rest = images.filter((img) => img.id !== draggedId);
    const overIndex = rest.findIndex((img) => img.id === overId);
    rest.splice(overIndex, 0, dragged);
    setImages(rest);
  }

  async function handleDragEnd() {
    setDraggedId(null);
    await fetch("/api/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images }),
    });
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-600 mb-8">Admin</h1>

      {/* Upload section */}
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="text-xl font-semibold text-gray-500">Upload New Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-80"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-80 h-24"
        />
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 disabled:opacity-50 w-32"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {uploadedUrl && <p className="text-gray-500">Uploaded successfully!</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Image management section */}
      <h2 className="text-xl font-semibold text-gray-500 mb-2">Manage Images</h2>
      <p className="text-gray-400 text-sm mb-4">Drag images to reorder them.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            draggable
            onDragStart={() => handleDragStart(image.id)}
            onDragOver={(e) => handleDragOver(e, image.id)}
            onDragEnd={handleDragEnd}
            className={`flex flex-col gap-2 cursor-grab ${
              draggedId === image.id ? "opacity-40" : "opacity-100"
            }`}
          >
            <img
              src={image.url}
              alt={image.title || ""}
              className="w-full rounded-lg shadow object-cover aspect-square"
            />
            {image.title && (
              <p className="text-gray-600 text-sm font-medium">{image.title}</p>
            )}
            <button
              onClick={() => handleDelete(image.id, image.public_id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}