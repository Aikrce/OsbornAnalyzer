import json
import sys

def fix_exports(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if 'exports' in data:
        for export_key, export_config in data['exports'].items():
            if isinstance(export_config, dict):
                # Create new ordered dict with types first
                new_config = {}
                if 'types' in export_config:
                    new_config['types'] = export_config['types']
                if 'import' in export_config:
                    new_config['import'] = export_config['import']
                if 'require' in export_config:
                    new_config['require'] = export_config['require']
                # Add any other keys
                for key, value in export_config.items():
                    if key not in ['types', 'import', 'require']:
                        new_config[key] = value
                
                data['exports'][export_key] = new_config
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Fixed exports configuration in {file_path}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        fix_exports(sys.argv[1])
    else:
        print("Usage: python fix_exports.py <package.json>")
