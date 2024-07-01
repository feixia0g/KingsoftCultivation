import request from '../request'
import { handleResponse } from './handle-response'

/**
 * 查询标签
 * @param 空
 * @returns 查询结果
 */
export async function queryTags(): Promise<ApiResponse<Tag[]>> {
  try {
    const response = await request.get<ApiResponse<Tag[]>>('/tags')
    return handleResponse(response)
  } catch (error) {
    throw new Error(`Failed to fetch tags: ${error}`)
  }
}

/**
 * 添加新标签
 * @param name - 标签名称
 * @returns 新标签数据
 */
export async function addTag(name: string): Promise<ApiResponse<null>> {
  try {
    const response = await request.post<ApiResponse<null>>('/tags', { name })
    return handleResponse(response)
  } catch (error) {
    throw new Error(`Failed to add tag: ${error}`)
  }
}

/**
 * 修改标签
 * @param tag - 标签
 * @returns 空
 */
export async function editTag(tag: Tag): Promise<ApiResponse<null>> {
  try {
    const response = await request.put<ApiResponse<null>>('/tags', tag)
    return handleResponse(response)
  } catch (error) {
    throw new Error(`Failed to edit tag: ${error}`)
  }
}

/**
 * 删除标签
 * @param id - 标签ID
 * @returns 空
 */
export async function delTag(id: string): Promise<ApiResponse<null>> {
  try {
    const response = await request.delete<ApiResponse<null>>(`/tags`, {
      params: { id }
    })
    return handleResponse(response)
  } catch (error) {
    throw new Error(`Failed to delete tag: ${error}`)
  }
}

/**
 * 批量删除标签
 * @param ids - 标签ID数组
 * @returns 空
 */
export async function batchDelTags(ids: string): Promise<ApiResponse<null>> {
  try {
    const response = await request.delete<ApiResponse<null>>(
      '/tags/batchDelete',
      { params: { ids } }
    )
    return handleResponse(response)
  } catch (error) {
    throw new Error(`Failed to batch delete tags: ${error}`)
  }
}
