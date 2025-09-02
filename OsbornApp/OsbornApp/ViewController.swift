import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate, WKUIDelegate {
    
    private var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupWebView()
        loadLocalHTML()
    }
    
    private func setupWebView() {
        // 配置WebView
        let webConfiguration = WKWebViewConfiguration()
        
        // 允许内联播放媒体
        webConfiguration.allowsInlineMediaPlayback = true
        
        // 允许画中画
        webConfiguration.allowsPictureInPictureMediaPlayback = true
        
        // 创建WebView
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.navigationDelegate = self
        webView.uiDelegate = self
        
        // 允许缩放
        webView.scrollView.isScrollEnabled = true
        webView.scrollView.bounces = true
        
        // 设置背景色
        webView.backgroundColor = UIColor.systemBackground
        webView.scrollView.backgroundColor = UIColor.systemBackground
        
        // 添加到视图
        view.addSubview(webView)
        
        // 设置约束
        webView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            webView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            webView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
    
    private func loadLocalHTML() {
        guard let htmlPath = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "WebResources"),
              let htmlURL = URL(string: "file://\(htmlPath)") else {
            print("无法找到HTML文件")
            return
        }
        
        // 获取WebResources目录的URL作为baseURL
        let webResourcesPath = Bundle.main.path(forResource: "WebResources", ofType: nil) ?? ""
        let baseURL = URL(fileURLWithPath: webResourcesPath)
        
        do {
            let htmlString = try String(contentsOfFile: htmlPath, encoding: .utf8)
            webView.loadHTMLString(htmlString, baseURL: baseURL)
        } catch {
            print("加载HTML文件失败: \(error)")
        }
    }
    
    // MARK: - WKNavigationDelegate
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        print("网页加载完成")
    }
    
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        print("网页加载失败: \(error)")
    }
    
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        // 允许所有导航
        decisionHandler(.allow)
    }
    
    // MARK: - WKUIDelegate
    
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let alert = UIAlertController(title: "提示", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "确定", style: .default) { _ in
            completionHandler()
        })
        present(alert, animated: true)
    }
    
    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        let alert = UIAlertController(title: "确认", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "确定", style: .default) { _ in
            completionHandler(true)
        })
        alert.addAction(UIAlertAction(title: "取消", style: .cancel) { _ in
            completionHandler(false)
        })
        present(alert, animated: true)
    }
    
    // 支持状态栏样式
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .default
    }
}