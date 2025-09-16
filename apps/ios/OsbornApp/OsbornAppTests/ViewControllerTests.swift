import XCTest
@testable import OsbornApp

class ViewControllerTests: XCTestCase {
    var viewController: ViewController!
    
    override func setUpWithError() throws {
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        viewController = storyboard.instantiateViewController(withIdentifier: "ViewController") as? ViewController
        viewController.loadViewIfNeeded()
    }
    
    override func tearDownWithError() throws {
        viewController = nil
    }
    
    func testViewControllerInitialization() throws {
        XCTAssertNotNil(viewController)
        XCTAssertNotNil(viewController.view)
    }
    
    func testWebViewLoading() throws {
        XCTAssertNotNil(viewController.webView)
    }
    
    func testWebViewConfiguration() throws {
        let webView = viewController.webView
        XCTAssertTrue(webView.allowsBackForwardNavigationGestures)
    }
}
