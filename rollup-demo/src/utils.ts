/**
 * 生成一个随机整数（包含最大值）
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function deepClone<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  const result: any = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
