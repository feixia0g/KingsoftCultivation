import { message } from 'antd'

/**
 * 处理响应数据的通用函数
 * @param response - Axios响应对象
 * @returns 处理后的数据
 */
export function handleResponse<T>(response: {
  data: ApiResponse<T>
}): ApiResponse<T> {
  if (![200, 201, 204].includes(response.data.code)) {
    message.error(response.data.msg)
    throw new Error(response.data.msg || 'Unknown error')
  }
  return response.data
}
