// export default function SamplePage() {
//   return(
//     <div className="main-content">
//       <h1>DemoPage!</h1>
//     </div>
//   )
// }


import React from 'react';

const SamplePage = ({ name }) => {
  return (
    <div className="main-content">
      <h1>Hello, {name} 👋</h1>
      <p>Deposit History!</p>
    </div>
  );
};

export default SamplePage;
