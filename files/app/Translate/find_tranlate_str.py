import os  
import re  
from openpyxl import Workbook  
  
def find_unique_tr_strings_in_cpp_files(directory):  
    unique_strings = set()  
    # 遍历指定目录及其子目录  
    for root, dirs, files in os.walk(directory):  
        for file in files:  
            if file.endswith('.cpp'):  
                file_path = os.path.join(root, file)  
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:  
                    content = f.read()  
                    # 使用正则表达式查找tr("")内的字符串  
                    matches = re.findall(r'tr\s*\(\s*"(.*?)"\s*\)', content)  
                    unique_strings.update(matches)  # 更新集合以去除重复项  
    return unique_strings  
  
def dump_unique_strings_to_excel(unique_strings, excel_path):  
    wb = Workbook()  
    ws = wb.active  
    ws.title = "Qt Unique Translations"  
      
    # 将唯一的字符串写入Excel的第一列  
    for row, string in enumerate(unique_strings, start=1):  
        ws[f'A{row}'] = string  
      
    # 保存Excel文件  
    wb.save(excel_path)  
  
# 指定要搜索的目录（当前目录）和Excel文件的保存路径  
directory_to_search = '../'  
excel_output_path = 'qt_unique_translations.xlsx'  
  
# 查找所有.cpp文件中的tr("")中的唯一字符串  
unique_strings = find_unique_tr_strings_in_cpp_files(directory_to_search)  
  
# 将找到的唯一字符串写入Excel文件  
dump_unique_strings_to_excel(unique_strings, excel_output_path)  
  
print(f"Qt翻译中的唯一字符串已写入 {excel_output_path}")
