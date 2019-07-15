// 获取格式化的模板文本
export function getTemplateText(runText: string, second: number): string {
  return runText.replace(/\{([^{]*?)%s(.*?)\}/g, second.toString());
}
