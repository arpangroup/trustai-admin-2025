import ReactDOM from 'react-dom';
import './RightPanel.css';
import { useEffect } from 'react';

const RightPanel = ({ isOpen, onClose, children, style = null }) => {
    useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);



    if (!isOpen) return null;
    

    return (
    <>
      {isOpen && <div className="backdrop" onClick={onClose} />}
      <div 
        className={`side-panel ${isOpen ? 'open' : ''}`} 
        style={{ width: '800px', ...style }}>
        <button className="close-btn" onClick={onClose}>×</button>    
        {children}
      </div>
    </>
  );
}

export default RightPanel;