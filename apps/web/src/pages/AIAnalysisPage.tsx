import React, { useState } from 'react'

const AIAnalysisPage: React.FC = () => {
  const [topic, setTopic] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const analysisDimensions = [
    { id: 1, name: '关键词分析', description: '提取核心关键词和概念' },
    { id: 2, name: '领域洞察', description: '分析行业趋势和发展方向' },
    { id: 3, name: '市场趋势', description: '评估市场机会和竞争态势' },
    { id: 4, name: '技术发展', description: '分析技术可行性和创新点' },
    { id: 5, name: '用户需求', description: '识别用户痛点和需求' },
    { id: 6, name: '竞争分析', description: '分析竞争对手和差异化' },
    { id: 7, name: '创新机会', description: '发现创新突破点' },
    { id: 8, name: '风险评估', description: '识别潜在风险和挑战' },
    { id: 9, name: '实施建议', description: '提供具体实施建议' }
  ]

  const handleAnalyze = async () => {
    if (!topic.trim()) return
    
    setIsAnalyzing(true)
    
    // 模拟AI分析过程
    setTimeout(() => {
      const mockResult = {
        topic: topic,
        timestamp: new Date().toISOString(),
        dimensions: analysisDimensions.map(dim => ({
          ...dim,
          insights: [
            `基于"${topic}"的${dim.name}显示...`,
            `在${dim.name}方面，建议关注...`,
            `${dim.name}的关键发现是...`
          ],
          score: Math.floor(Math.random() * 40) + 60 // 60-100分
        }))
      }
      
      setAnalysisResult(mockResult)
      setIsAnalyzing(false)
    }, 3000)
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
          AI智能分析
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
            placeholder="请输入要分析的主题、产品或想法..."
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
            {isAnalyzing ? 'AI分析中...' : '开始AI分析'}
          </button>
        </div>

        {/* 分析结果 */}
        {analysisResult && (
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: '#f8fafc', marginBottom: '1rem' }}>
              分析结果：{analysisResult.topic}
            </h2>
            <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
              分析时间：{new Date(analysisResult.timestamp).toLocaleString()}
            </p>
          </div>
        )}

        {/* 九维度分析网格 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {analysisDimensions.map((dimension) => {
            const result = analysisResult?.dimensions.find((d: any) => d.id === dimension.id)
            return (
              <div key={dimension.id} style={{
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
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center'
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
                      {dimension.id}
                    </div>
                    <div>
                      <h3 style={{ 
                        color: '#f8fafc', 
                        fontSize: '1.1rem',
                        margin: 0
                      }}>
                        {dimension.name}
                      </h3>
                      <p style={{ 
                        color: '#cbd5e1', 
                        fontSize: '0.9rem',
                        margin: 0
                      }}>
                        {dimension.description}
                      </p>
                    </div>
                  </div>
                  {result && (
                    <div style={{
                      background: '#10b981',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {result.score}分
                    </div>
                  )}
                </div>
                <div style={{
                  background: '#334155',
                  borderRadius: '8px',
                  padding: '1rem',
                  minHeight: '120px'
                }}>
                  {result ? (
                    <div>
                      {result.insights.map((insight: string, index: number) => (
                        <div key={index} style={{ 
                          color: '#cbd5e1', 
                          marginBottom: '0.5rem',
                          fontSize: '0.9rem'
                        }}>
                          • {insight}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ 
                      color: '#64748b', 
                      fontStyle: 'italic',
                      textAlign: 'center',
                      padding: '2rem 0'
                    }}>
                      点击"开始分析"后，这里将显示{dimension.name}结果...
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AIAnalysisPage
