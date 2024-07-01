import request from '../request'
import { handleResponse } from './handle-response'

/**
 * 设置语言
 * @param lang - 要设置的语言
 * @returns 响应结果
 */
export async function setLang(lang: string): Promise<ApiResponse<null>> {
  try {
    const response = await request.post<ApiResponse<null>>('/lang', { lang })
    return handleResponse(response)
  } catch (error) {
    throw new Error(`Failed to set language:${error}`)
  }
}

/**
 * 设置语言
 * @param lang - 要设置的语言
 * @returns 响应结果
 */
export async function getLang(): Promise<ApiResponse<string>> {
  try {
    const response = await request.get<ApiResponse<string>>('/lang')
    return handleResponse(response)
  } catch (error) {
    throw new Error(`Failed to set language: ${error}`)
  }
}
