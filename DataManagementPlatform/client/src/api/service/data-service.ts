import request from '../request'
import { handleResponse } from './handle-response'

/**
 * 获取数据的服务函数
 * @param params - 请求参数
 * @returns 查询结果
 */
export async function queryData(
  params: QueryDataParam
): Promise<ApiResponse<QueryResult>> {
  try {
    const response = await request.get<ApiResponse<QueryResult>>('/data', {
      params
    })
    return handleResponse(response)
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`)
  }
}

/**
 * 新增数据的服务函数
 * @param data - 新增的数据
 * @returns 响应结果
 */
export async function addData(data: AddDataParams): Promise<ApiResponse<null>> {
  try {
    const response = await request.post<ApiResponse<null>>(`/data`, data)
    return handleResponse(response)
  } catch (error) {
    throw new Error(`Failed to add data: ${error}`)
  }
}

/**
 * 编辑数据的服务函数
 * @param data - 编辑的数据
 * @returns 响应结果
 */
export async function editData(
  data: EditDataParams
): Promise<ApiResponse<null>> {
  try {
    const response = await request.put<ApiResponse<null>>(`/data`, data)
    return handleResponse(response)
  } catch (error) {
    throw new Error(`Failed to add data: ${error}`)
  }
}

/**
 * 删除数据的服务函数
 * @param id - 要删除的数据ID
 * @returns 响应结果
 */
export async function delData(id: string): Promise<ApiResponse<null>> {
  try {
    const response = await request.delete<ApiResponse<null>>(`/data`, {
      params: { id }
    })
    return handleResponse(response)
  } catch (error) {
    throw new Error(`Failed to delete data: ${error}`)
  }
}
