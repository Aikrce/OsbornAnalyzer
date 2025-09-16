import json
import sys

def fix_mobile_core_tests(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Update scripts
    if 'scripts' in data:
        data['scripts']['test'] = 'vitest'
        data['scripts']['test:coverage'] = 'vitest --coverage'
    
    # Update devDependencies
    if 'devDependencies' in data:
        # Remove Jest related packages
        jest_packages = ['jest', '@types/jest', 'react-test-renderer']
        for pkg in jest_packages:
            if pkg in data['devDependencies']:
                del data['devDependencies'][pkg]
        
        # Add Vitest packages
        data['devDependencies']['vitest'] = '^3.2.4'
        data['devDependencies']['@vitest/coverage-v8'] = '^3.2.4'
        data['devDependencies']['@testing-library/react-native'] = '^12.0.0'
        data['devDependencies']['@testing-library/jest-native'] = '^5.4.3'
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Updated mobile-core package.json for Vitest")

if __name__ == "__main__":
    fix_mobile_core_tests(sys.argv[1])
