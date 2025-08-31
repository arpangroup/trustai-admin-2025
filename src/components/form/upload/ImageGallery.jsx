// ImageGallery.jsx
import React, { useState } from "react";
import FilePreview from "./FilePreview";

const ImageGallery = ({ show, onClose, onSelect, images=[] }) => {
  const [selected, setSelected] = useState(null);
  if (!show) return null;
  
  return (
    <>
      <div className="d-flex flex-wrap gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            loading="lazy"
            onClick={() => setSelected(img)}
            className={`border rounded ${selected === img ? "border-primary border-3" : ""}`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              cursor: "pointer"
            }}
            alt={`img-${index}`}
          />
        ))}
      </div>
      <div className="mt-3 text-end">
        <button
          className="btn btn-primary"
          disabled={!selected}
          onClick={() => onSelect(selected)}
        >
          OK
        </button>
      </div>
    </>
  );
};

export default ImageGallery;
