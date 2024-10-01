import xml.etree.ElementTree as ET  
from openpyxl import Workbook  
  
def parse_ts_file(file_path, language):  
    tree = ET.parse(file_path)  
    root = tree.getroot()  
    translations = {}  
      
    for message in root.findall('context/message'):  
        source = message.find('source').text if message.find('source') is not None else ''  
        translation = ''  
        for trans in message.findall('translation'):  
            # 假设每个<translation>只对应一个语言，并且文件名代表该语言  
            # 如果需要更复杂的匹配，可以检查trans.get('lang')  
            if trans.text is not None:  
                translation = trans.text  
                break  # 假设每个message只有一个translation  
        translations[source] = translation  
      
    return translations, language  
  
def write_translations_to_excel(translations_dict, excel_file_path):  
    workbook = Workbook()  
    worksheet = workbook.active  
    worksheet.title = 'Translations'  
  
    # 设置列标题  
    languages = list(translations_dict.keys())
    languages.remove('英文')
    languages.insert(0, '英文')  
    worksheet.append(languages)  
  
    # 假设LanguageEnglish.ts的翻译在translations_dict['LanguageEnglish']中  
    english_translations = translations_dict['英文']  
  
    # 写入翻译项  
    for source in sorted(english_translations.keys()):  
        row = [source]  
        for lang in languages[1:]:  # 跳过第一列（基准语言）  
            if lang in translations_dict:  
                translation = translations_dict[lang].get(source, '')  # 如果没有找到，则为空字符串  
            else:  
                translation = ''  # 如果没有该语言的文件，则为空字符串  
            row.append(translation)  
        worksheet.append(row)  
  
    # 保存Excel文件  
    workbook.save(excel_file_path)  
  
# 定义.ts文件的路径  
ts_file_paths = {  
    '英文': 'LanguageEnglish.ts',  
    '中文': 'LanguageChinese.ts',  
    '法语': 'LanguageFrench.ts',  
    '德语': 'LanguageGerman.ts',  
    '意大利语': 'LanguageItaly.ts',
    '日语': 'LanguageJapanese.ts',  
    '俄语': 'LanguageRussian.ts',  
    '西班牙语': 'LanguageSpain.ts'
}  
  
# 提取翻译  
translations = {}  
for lang, path in ts_file_paths.items():  
    trans, _ = parse_ts_file(path, lang)  
    translations[lang] = trans  
  
# 写入Excel  
excel_file_path = 'Translations.xlsx'  
write_translations_to_excel(translations, excel_file_path)  
  
print("Translations successfully written to Excel file.")