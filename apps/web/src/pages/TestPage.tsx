import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>测试页面</h1>
      <p>如果您能看到这个页面，说明 React 应用正常工作。</p>
      <div
        style={{
          background: '#f0f0f0',
          padding: '10px',
          borderRadius: '5px',
          marginTop: '20px',
        }}
      >
        <h3>当前时间：</h3>
        <p>{new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TestPage;
