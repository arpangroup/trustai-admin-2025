import UploadIcon from '../../assets/icons/upload.svg';

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
          src={UploadIcon}
          alt="upload"
        />
        <span>{file?.name || "Select Screenshot (Required)"}</span>
      </label>
    </div>
  );
};

export default FileInput;
