// 获取格式化的模板文本
export function getTemplateText(runText: string, second: number): string {
  if (runText?.indexOf('{%s}') !== -1) {
    return runText.replace(/\{([^{]*?)%s(.*?)\}/g, second.toString());
  } else {
    return runText;
  }
}
