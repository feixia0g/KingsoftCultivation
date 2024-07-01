interface DataRecord {
  id: string
  name: string
  description: string
  time: number
  tags: string[]
}

interface PageInfo {
  pageNo: number
  pageSize: number
  total: number
}

interface QueryDataParam {
  pageNo: number
  pageSize: number
  name?: string
  tags?: string
  startTime?: number
  endTime?: number
}

interface QueryResult {
  pageInfo: PageInfo
  dataInfo: DataRecord[]
}

interface AddDataParams {
  name: string
  description: string
  tags: string[]
}

interface DeleteDataParams {
  id: string
}

interface EditDataParams {
  id: string
  name: string
  description: string
  tags: string[]
}
