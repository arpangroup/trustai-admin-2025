import React, { useEffect, useRef, useState } from 'react';
import TreeViewer from './TreeViewer';
import { LuExpand, LuMinimize } from 'react-icons/lu';
import './ReferralTreeTab.css';

const ReferralTreeTab = ({ userId }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const fullscreenRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    const el = fullscreenRef.current;

    if (!document.fullscreenElement && el?.requestFullscreen) {
      el.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="tab-pane fade show active">
      <div
        ref={fullscreenRef}
        className={`referral-container ${isFullscreen ? "fullscreen-tree-tab" : ""}`}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="site-card">
              {/* <div className="site-card-header">
                <h4 className="title">Referral Tree</h4>
              </div> */}

              <div className='site-card-header d-flex justify-content-between align-items-center'>
                <h4 className="title mb-0">Referral Tree</h4>
                {/* <div>
                  {isFullscreen ? <LuMinimize /> : <LuExpand />}
                  <button className="btn btn-outline-primary btn-sm me-2">Zoom In</button>
                  <button className="btn btn-outline-primary btn-sm me-2">Zoom Out</button>
                  <button className="btn btn-outline-secondary btn-sm me-2">Reset</button>
                </div> */}

                <div onClick={toggleFullscreen} style={{ cursor: "pointer", fontSize: "1.25rem" }}>
                  {isFullscreen ? <LuMinimize title="Exit Fullscreen" /> : <LuExpand title="Enter Fullscreen" />}
                </div>

              </div>


              <div className="site-card-body table-responsive">
                {/* <p>No Referral user found</p> */}
                <TreeViewer userId = {userId}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralTreeTab;