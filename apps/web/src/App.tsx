import React from 'react';
import './index.css';

// 简化的测试组件
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>奥斯本创新九问 · 智能分析工具</h1>
      <p>应用正在加载中...</p>
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
      <p>如果您能看到这个页面，说明基本的React应用已经正常工作。</p>
    </div>
  );
}

export default App;
