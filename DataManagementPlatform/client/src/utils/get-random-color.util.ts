// 预设的颜色数组
const presetColors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
]

// 简单的字符串散列函数
const hashString = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

// 将散列值映射到预设颜色数组中的索引
export const getColorFromHash = (tag: string): string => {
  const hash = hashString(tag)
  const index = Math.abs(hash) % presetColors.length
  return presetColors[index]
}
