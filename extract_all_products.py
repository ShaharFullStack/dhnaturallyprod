import docx
import os
import json

def read_docx(file_path):
    try:
        doc = docx.Document(file_path)
        full_text = []
        for para in doc.paragraphs:
            if para.text.strip():
                full_text.append(para.text)
        return '\n\n'.join(full_text)
    except Exception as e:
        return f"Error reading {os.path.basename(file_path)}: {e}"

def extract_product_info(content, filename):
    """Extract structured information from product content"""
    product_name = filename.replace('.docx', '').replace('_', ' ').replace(',', '')

    # Initialize product info
    product_info = {
        'name': product_name,
        'source': 'Unknown',
        'primary_affinity': 'General',
        'key_properties': [],
        'modalities': {'worse': [], 'better': []},
        'clinical_evidence': '',
        'safety_notes': '',
        'traditional_uses': '',
        'full_content': content
    }

    lines = content.split('\n')
    current_section = None

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Extract source
        if 'source:' in line.lower() or 'prepared from' in line.lower():
            if 'prepared from' in line.lower():
                product_info['source'] = line.split('prepared from')[-1].strip()
            elif 'source:' in line.lower():
                product_info['source'] = line.split('source:')[-1].strip()

        # Extract primary affinity
        if 'primary affinity' in line.lower() or 'main sphere' in line.lower():
            if 'primary affinity' in line.lower():
                product_info['primary_affinity'] = line.split('primary affinity')[-1].strip()
            elif 'main sphere' in line.lower():
                product_info['primary_affinity'] = line.split('main sphere')[-1].strip()

        # Extract key properties
        if 'key properties' in line.lower() or 'key homeopathic properties' in line.lower():
            current_section = 'properties'
        elif 'modalities' in line.lower():
            current_section = 'modalities'
        elif 'clinical evidence' in line.lower():
            current_section = 'clinical'
        elif 'safety' in line.lower():
            current_section = 'safety'
        elif current_section == 'properties' and line.startswith('-'):
            product_info['key_properties'].append(line[1:].strip())
        elif current_section == 'modalities' and ('worse:' in line.lower() or 'better:' in line.lower()):
            if 'worse:' in line.lower():
                product_info['modalities']['worse'] = [item.strip() for item in line.split('worse:')[-1].split(',')]
            elif 'better:' in line.lower():
                product_info['modalities']['better'] = [item.strip() for item in line.split('better:')[-1].split(',')]

    return product_info

# Read all product documents
products_dir = r'C:\Codes\dhnaturally\Database\products'
all_products = []

for filename in os.listdir(products_dir):
    if filename.endswith('.docx'):
        file_path = os.path.join(products_dir, filename)
        content = read_docx(file_path)
        if not content.startswith('Error'):
            product_info = extract_product_info(content, filename)
            all_products.append(product_info)

# Save to JSON for processing
with open('all_products_data.json', 'w', encoding='utf-8') as f:
    json.dump(all_products, f, indent=2, ensure_ascii=False)

print(f"Extracted information for {len(all_products)} products")
print("Data saved to all_products_data.json")
