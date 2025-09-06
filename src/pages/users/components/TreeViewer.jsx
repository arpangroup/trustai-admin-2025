import { useEffect, useRef, useState } from 'react';
import styles from './TreeViewer.module.css';
import { LuMaximize2, LuRefreshCw, LuZoomIn, LuZoomOut } from 'react-icons/lu';
import { API_ROUTES } from '../../../routes';
import apiClient from '../../../api/apiClient';

const TreeViewer = ({ userId }) => {
  const [treeData, setTreeData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const treeWrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const maxLevel = urlParams.get('level') || 3;

    // fetch(`/api/v1/tree/${userId}?maxLevel=${maxLevel}`)
    //   .then(res => res.json())
    //   .then(setTreeData)
    //   .catch(() => setTreeData({ error: true }));

    apiClient.get(API_ROUTES.REFERRAL_TREE(userId, maxLevel))
    .then(setTreeData)
    .catch(() => setTreeData({ error: true }));



  }, []);
  

  const buildTree = (node, level = 0) => {
    if (!node) return null;
    return (
      <li key={node.userId}>
        <div
          className={`node ${selectedUser?.userId === node.userId ? 'selected' : ''}`}
          data-level={level}
          title={`User ID: ${node.userId}`}
          onClick={(e) => handleUserClick(node, e)}
        >
          {node.username}
        </div>
        {node.children && node.children.length > 0 && (
          <ul>
            {node.children.map(child => buildTree(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  const handleUserClick = (node, event) => {
    setSelectedUser(node);
    const url = new URL(window.location);
    url.searchParams.set("userId", node.userId);
    window.history.replaceState({}, "", url);
  };

  //   const zoom = (delta) => {
  //     let newScale = Math.max(0.2, scale + delta);
  //     setScale(newScale);
  //     if (treeWrapperRef.current) {
  //       treeWrapperRef.current.style.transform = `scale(${newScale})`;
  //     }
  //   };




  //   const resetZoom = () => {
  //     setScale(1);
  //     if (treeWrapperRef.current) {
  //       treeWrapperRef.current.style.transform = 'scale(1)';
  //     }
  //   };

  const zoom = (delta) => {
    setScale(prevScale => {
      const newScale = Math.max(0.2, prevScale + delta);
      if (treeWrapperRef.current) {
        treeWrapperRef.current.style.transform = `scale(${newScale})`;
      }
      return newScale;
    });
  };

  const resetZoom = () => {
    setScale(() => {
      if (treeWrapperRef.current) {
        treeWrapperRef.current.style.transform = 'scale(1)';
      }
      return 1;
    });
  };


  return (
    <div className="canvas">
      <div className="controls">
        {/* <button className="btn btn-outline-primary btn-sm me-2" onClick={() => zoom(0.1)}>Zoom In</button>
    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => zoom(-0.1)}>Zoom Out</button>
    <button className="btn btn-outline-secondary btn-sm me-2" onClick={resetZoom}>Reset</button> */}

        <div className="controls d-flex align-items-center mb-2">
          <button
            className="btn btn-outline-primary btn-sm me-2"
            onClick={() => zoom(0.1)}
            title="Zoom In"
            style={{ fontSize: '1.2rem' }}
          >
            <LuZoomIn />
          </button>
          <button
            className="btn btn-outline-primary btn-sm me-2"
            onClick={() => zoom(-0.1)}
            title="Zoom Out"
            style={{ fontSize: '1.2rem' }}
          >
            <LuZoomOut />
          </button>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={resetZoom}
            title="Reset Zoom"
            style={{ fontSize: '1.2rem' }}
          >
            <LuRefreshCw />
          </button>

          <button
            className="btn btn-outline-success btn-sm me-2"
            // onClick={fitToScreen}
            title="Fit to Screen"
            style={{ fontSize: '1.2rem' }}
          >
            <LuMaximize2 />
          </button>
        </div>



      </div>

      {selectedUser && (
        <div id="selectedUserLabel" style={{ padding: '10px' }}>
          Selected User: {selectedUser.username} (ID: {selectedUser.userId}) ℹ️ Balance: {selectedUser.walletBalance} ℹ️ Rank: {selectedUser.userRank}
        </div>
      )}

      {/* Scrollable wrapper */}
      <div className="tree-container">
        <div
          className="tree-wrapper"
          ref={treeWrapperRef}
          style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
        >
          <div className={styles.tree} id="mlmTree">
            {treeData && !treeData.error ? <ul>{buildTree(treeData)}</ul> : <div>Failed to load tree.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeViewer;
