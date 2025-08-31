import React from "react";

const FilePreview = ({ fileObj, width = 100, height = 100 }) => {
  const { file, preview } = fileObj;
  const fileType = file.type;

  const commonStyle = {
    width: `${width}px`,
    height: `${height}px`,
    objectFit: "cover",
  };

  if (fileType.startsWith("image/")) {
    return (
      <img
        src={preview}
        alt="preview"
        className="rounded border"
        style={commonStyle}
      />
    );
  } else if (fileType.startsWith("video/")) {
    return (
      <video
        src={preview}
        className="rounded border"
        style={commonStyle}
        controls
        muted
      />
    );
  } else if (fileType === "application/pdf") {
    return (
      <iframe
        src={preview}
        title="PDF preview"
        className="rounded border"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          border: "1px solid #ccc",
        }}
      />
    );
  } else if (
    fileType === "application/msword" ||
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center rounded border"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: "#f1f1f1",
          fontSize: "12px",
          textAlign: "center",
          padding: "5px",
        }}
      >
        <i className="bi bi-file-earmark-word" style={{ fontSize: "24px", color: "#2B579A" }}></i>
        <span className="text-truncate w-100">{file.name}</span>
      </div>
    );
  } else {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center rounded border"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: "#f8f9fa",
          fontSize: "12px",
          textAlign: "center",
          padding: "5px",
        }}
      >
        <i className="bi bi-file-earmark" style={{ fontSize: "24px" }}></i>
        <span className="text-truncate w-100">{file.name}</span>
      </div>
    );
  }
};

export default FilePreview;
