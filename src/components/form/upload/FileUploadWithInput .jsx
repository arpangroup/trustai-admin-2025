// FileUploadWithInput.jsx
import React, { useState } from "react";
import ImageUploadModal from "./ImageUploadModal";

const FileUploadWithInput = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mb-3">
      <label htmlFor="imageInput" className="form-label">Selected Image</label>
      <div className="d-flex align-items-center gap-3">
        <input
          type="text"
          className="form-control"
          value={selectedImage || ""}
          readOnly
          onClick={() => setShowModal(true)}
          placeholder="Click to select image"
        />
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          File Upload
        </button>
      </div>

      <ImageUploadModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(url) => {
          setSelectedImage(url);
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default FileUploadWithInput;
