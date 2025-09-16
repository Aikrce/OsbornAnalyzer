import json
import sys

def update_web_core_deps(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Add test dependencies
    if 'devDependencies' not in data:
        data['devDependencies'] = {}
    
    test_deps = {
        '@testing-library/react': '^16.3.0',
        '@testing-library/jest-dom': '^6.8.0',
        '@testing-library/user-event': '^14.5.0',
        'jsdom': '^27.0.0'
    }
    
    for dep, version in test_deps.items():
        data['devDependencies'][dep] = version
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Updated web-core package.json with test dependencies")

if __name__ == "__main__":
    update_web_core_deps(sys.argv[1])
