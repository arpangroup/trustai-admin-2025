// ImageUploadModal.jsx
import React, { useEffect, useRef, useState } from "react";
import ImageGallery from "./ImageGallery";
import FilePreview from "./FilePreview";
import { ACCEPTED_FILE_TYPES } from "../../../constants/config";
import apiClient from "../../../api/apiClient";
import { API_ROUTES } from "../../../routes";

const ImageUploadModal = ({ show, onClose, onSelect }) => {
  const [tab, setTab] = useState("upload");
  const [previews, setPreviews] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef();


  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ACCEPTED_FILE_TYPES.split(",").map(type => type.trim());;

    const filteredFiles = files.filter(file => allowedTypes.includes(file.type));
    if (filteredFiles.length !== files.length) {
      alert("Some files were not images and have been ignored.");
    }

    const newPreviews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const uploadFiles = async () => {
    if (previews.length === 0) return;

    const formData = new FormData();
    previews.forEach(p => {
      formData.append("files", p.file);
    });

    try {
      // const response = await fetch(API_ROUTES.STORAGE.UPLOAD, {
      //   method: "POST",
      //   body: formData,
      // });
      
      // if (!response.ok) {
      //   throw new Error("Upload failed");
      // }
      
      // const result = await response.json(); // This should return a map of filename -> fileId

      const response = await apiClient.post(API_ROUTES.STORAGE.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response.data; // Should be a map of filename -> fileId


      //const uploadedUrls = Object.values(result).map(fileId => `/api/v1/files/${fileId}`); // Assuming this forms the URL
      const uploadedUrls = Object.values(result);

      setUploadedImages(prev => [...uploadedUrls, ...prev]);
      setPreviews([]);
      setTab("select");
    } catch (err) {
      console.error("Error uploading files:", err);
      alert("Failed to upload files. Please try again.");
    }
  };

  const uploadFilesWithProgress_old = async () => {
    if (previews.length === 0) return;

    const formData = new FormData();
    previews.forEach(p => {
      formData.append("files", p.file);
    });

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onloadstart = () => {
      setIsUploading(true);
      setUploadProgress(0);
    };

    xhr.onloadend = () => {
      setIsUploading(false);
      setUploadProgress(0);
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText);
            const uploadedUrls = Object.values(result);
            setUploadedImages(prev => [...uploadedUrls, ...prev]);
            setPreviews([]);
            setTab("select");
          } catch (err) {
            console.error("Error parsing upload response:", err);
            alert("Upload failed. Invalid server response.");
          }
        } else {
          console.error("Upload failed with status:", xhr.status);
          alert("Failed to upload files. Please try again.");
        }
      }
    };

    xhr.open("POST", "/api/v1/files/upload-multiple");
    xhr.send(formData);
  };

  const uploadFilesWithProgress = async () => {
    if (previews.length === 0) return;

    const formData = new FormData();
    previews.forEach(p => {
      formData.append("files", p.file);
    });

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const response = await apiClient.post(API_ROUTES.STORAGE.UPLOAD, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          },
        }
      );

      const result = response.data;
      // const uploadedUrls = Object.values(result);
      const uploadedUrls = Object.values(result).map(file => file.downloadUrl);
      setUploadedImages(prev => [...uploadedUrls, ...prev]);
      setPreviews([]);
      setTab("select");
    } catch (error) {
      console.error("Upload failed:", error.message);
      alert("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const simulateUpload = () => {
    const uploaded = previews.map(p => p.preview);
    setUploadedImages(prev => [...uploaded, ...prev]);
    setPreviews([]);
    setTab("select");
  };

  // useEffect(() => {
  //   if (tab === "select") {
  //     // simulate API call to load dummy images
  //     //https://jsonplaceholder.typicode.com/photos
  //     fetch("https://picsum.photos/v2/list?page=2&limit=20")
  //       .then(res => res.json())
  //       .then(data => {
  //         //const urls = data.map(img => img.download_url);
  //         const urls = data.map(img => `https://picsum.photos/id/${img.id}/200/200`);
  //         //setUploadedImages(urls);
  //         setUploadedImages(prev => {
  //           // Avoid duplicates (optional)
  //           const unique = Array.from(new Set([...prev, ...urls]));
  //           return unique;
  //       });
  //       });
  //   }
  // }, [tab]);

  // useEffect(() => {
  //   if (show) {
  //     fetch("https://picsum.photos/v2/list?page=2&limit=20")
  //       .then(res => res.json())
  //       .then(data => {
  //         const urls = data.map(img => `https://picsum.photos/id/${img.id}/200/200`);
  //         setUploadedImages((prev) => {
  //           // Avoid duplicates (optional)
  //           const unique = Array.from(new Set([...prev, ...urls]));
  //           return unique;
  //         });
  //       });
  //   }
  // }, [show]);

  useEffect(() => {
    if (show) {
      // fetch("/api/v1/files")
      //   .then(res => res.json())
      //   .then(data => {
      //     const urls = data.map(url => url.downloadUrl);
      //     setUploadedImages((prev) => {
      //       // Avoid duplicates (optional)
      //       const unique = Array.from(new Set([...prev, ...urls]));
      //       return unique;
      //     });
      //   });
      apiClient.get(API_ROUTES.STORAGE.IMAGES)
      .then(res => {
        const urls = res.data.map(file => file.downloadUrl);
        setUploadedImages(prev => {
          const unique = Array.from(new Set([...prev, ...urls]));
          return unique;
        });
      })
      .catch(error => {
        console.error('Failed to fetch files:', error.message);
        // Optional: Show error message in UI
      });
    }
  }, [show]);


  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content shadow-lg rounded-3 overflow-hidden">
          <div className="modal-header bg-light text-black">
            <h5 className="modal-title">Image Manager</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body overflow-auto" style={{ maxHeight: "70vh" }}>
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button className={`nav-link ${tab === "upload" ? "active" : ""}`} onClick={() => setTab("upload")}>Upload</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${tab === "select" ? "active" : ""}`} onClick={() => setTab("select")}>Gallery</button>
              </li>
            </ul>

            {tab === "upload" && (
              <>
                <input
                  type="file"
                  multiple
                  accept={ACCEPTED_FILE_TYPES}
                  className="form-control mb-3"
                  onChange={handleUpload}
                  ref={inputRef}
                />
                <div className="d-flex flex-wrap gap-2">
                  {previews.map((p, index) => (
                    // <img
                    //   key={index}
                    //   src={p.preview}
                    //   alt="preview"
                    //   className="rounded border"
                    //   style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    // />
                    <FilePreview key={index} fileObj={p} />
                  ))}
                </div>

                  {isUploading && (
                    <div className="progress mb-3 mt-4" style={{ height: "20px" }}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                        aria-valuenow={uploadProgress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {uploadProgress}%
                      </div>
                    </div>
                  )}

                <div className="mt-3 text-end">
                  {/* <button className="btn btn-success" onClick={simulateUpload}>Upload</button> */}
                  <button className="btn btn-success" onClick={uploadFilesWithProgress} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </>
            )}

            {tab === "select" && (
              <ImageGallery
                show={show}
                images={uploadedImages}
                onClose={onClose}
                onSelect={(url) => {
                  onSelect(url);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
