import React, { useState } from 'react'

const OsbornAnalysisPage: React.FC = () => {
  const [topic, setTopic] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const osbornQuestions = [
    { id: 1, question: '其他用途：能否有其他用途？', suggestions: [] },
    { id: 2, question: '借用：能否借用其他领域的想法？', suggestions: [] },
    { id: 3, question: '改变：能否改变颜色、形状、声音等？', suggestions: [] },
    { id: 4, question: '扩大：能否扩大、增加、延长？', suggestions: [] },
    { id: 5, question: '缩小：能否缩小、减少、缩短？', suggestions: [] },
    { id: 6, question: '替代：能否用其他材料、方法替代？', suggestions: [] },
    { id: 7, question: '重新安排：能否重新安排顺序、布局？', suggestions: [] },
    { id: 8, question: '颠倒：能否颠倒、反向思考？', suggestions: [] },
    { id: 9, question: '组合：能否组合、合并不同元素？', suggestions: [] }
  ]

  const handleAnalyze = async () => {
    if (!topic.trim()) return
    
    setIsAnalyzing(true)
    // 模拟分析过程
    setTimeout(() => {
      setIsAnalyzing(false)
      alert('奥斯本分析完成！')
    }, 2000)
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0f172a', 
      color: '#f8fafc',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          color: '#8b5cf6',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          奥斯本九问分析
        </h1>

        {/* 输入区域 */}
        <div style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#f8fafc', marginBottom: '1rem' }}>分析主题</h2>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="请输入要分析的主题或产品..."
            style={{
              width: '100%',
              padding: '1rem',
              background: '#334155',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}
          />
          <button
            onClick={handleAnalyze}
            disabled={!topic.trim() || isAnalyzing}
            style={{
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              opacity: (!topic.trim() || isAnalyzing) ? 0.5 : 1
            }}
          >
            {isAnalyzing ? '分析中...' : '开始奥斯本分析'}
          </button>
        </div>

        {/* 九问网格 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {osbornQuestions.map((item) => (
            <div key={item.id} style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '1.5rem',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  marginRight: '1rem'
                }}>
                  {item.id}
                </div>
                <h3 style={{ 
                  color: '#f8fafc', 
                  fontSize: '1.1rem',
                  margin: 0
                }}>
                  {item.question}
                </h3>
              </div>
              <div style={{
                background: '#334155',
                borderRadius: '8px',
                padding: '1rem',
                minHeight: '100px',
                color: '#cbd5e1',
                fontStyle: 'italic'
              }}>
                {item.suggestions.length > 0 
                  ? item.suggestions.map((suggestion, index) => (
                      <div key={index} style={{ marginBottom: '0.5rem' }}>
                        • {suggestion}
                      </div>
                    ))
                  : '点击"开始分析"后，这里将显示创新建议...'
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OsbornAnalysisPage
