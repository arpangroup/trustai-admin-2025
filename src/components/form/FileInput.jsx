// components/form/FileInput.jsx
const FileInput = ({ name, file, previewUrl, onChange }) => {
  return (
    <div className="wrap-custom-file">
      <input
        type="file"
        name={name}
        id={`${name}-upload`}
        accept=".jpg,.jpeg,.png"
        onChange={onChange}
      />
      <label
        htmlFor={`${name}-upload`}
        className={previewUrl ? "file-ok" : ""}
        style={{
          backgroundImage: previewUrl ? `url(${previewUrl})` : "none",
        }}
      >
        <img
          className="upload-icon"
          src="https://81habibi.com/assets/global/materials/upload.svg"
          alt="upload"
        />
        <span>{file?.name || "Select Screenshot (Required)"}</span>
      </label>
    </div>
  );
};

export default FileInput;
