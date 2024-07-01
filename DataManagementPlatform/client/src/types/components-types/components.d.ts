//Data分页数据
interface DataPagination {
  current: number
  pageSize: number
  total: number
}

//定义TableData数据接口
interface TableData {
  id: string
  name: string
  description: string
  time: string
  tags: string[]
  continuousId?: number
}

//定义IdData数据接口
interface IdData {
  id: number
  name: string
  description: string
  tags: string // 假设 tags 是以逗号分隔的字符串
}

//定义Data数据接口
interface Data {
  name: string
  description: string
  time: string
  tags: string
}

//定义DataDialog组件prop接口
interface DataDialogProps {
  action: string
  visible: boolean
  onClose: () => void
  onAdd?: (data: AddDataParams) => void
  onEdit?: (data: EditDataParams) => void
  data?: EditDataParams
}

//定义Tag数据接口
interface DisplayTag {
  id: string
  name: string
}

//定义TagDialog组件prop接口
interface TagsDialogProps {
  action: string
  visible: boolean
  onClose: () => void
  onAdd?: (name: string) => void
  onEdit?: (id: string, updatedTag: DisplayTag) => void
  tag?: DisplayTag
}

//不同标签对应的颜色字典数据接口
interface ColorDict {
  key: string
  tags: string
}

type MenuItem = Required<MenuProps>['items'][number]

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}
