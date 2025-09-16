import json
import sys

def update_cli_tools_deps(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Add test dependencies
    if 'devDependencies' not in data:
        data['devDependencies'] = {}
    
    test_deps = {
        'vitest': '^3.2.4',
        '@vitest/coverage-v8': '^3.2.4'
    }
    
    for dep, version in test_deps.items():
        data['devDependencies'][dep] = version
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Updated cli-tools package.json with test dependencies")

if __name__ == "__main__":
    update_cli_tools_deps(sys.argv[1])
