import { useState } from 'react'
import { queryData } from '../api/service/data-service'
import dayjs, { Dayjs } from 'dayjs'

const useData = (tags: DisplayTag[]) => {
  const [allData, setAllData] = useState<TableData[]>([])
  const [pagination, setPagination] = useState<PageInfo>({
    pageNo: 1,
    pageSize: 10,
    total: 0
  })
  const [isTag, setIsTag] = useState(false)
  const [isPagination, setIsPagination] = useState<boolean>(false)

  //用于筛选
  const [filterName, setFilterName] = useState<string>('')
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [filterDateRange, setFilterDateRange] = useState<Dayjs[]>([])

  const [isFilter, setIsFilter] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      const response = await queryData({
        pageNo: pagination.pageNo,
        pageSize: pagination.pageSize
      })

      const tagMap: Map<string, string> = new Map(
        tags.map((tag) => [tag.id, tag.name])
      )

      setPagination({
        ...pagination,
        total: response.data.pageInfo.total
      })

      const updatedAllData = response.data.dataInfo.map((record, index) => ({
        ...record,
        time: dayjs(record.time).format('YYYY/MM/DD HH:mm:ss'),
        tags: record.tags.map((tagId) => {
          const tag = tagMap.get(tagId)
          if (!tag) {
            return tagId
          } else {
            setIsTag(true)
            return tag
          }
        }), // 返回 tag 或 tagId,
        continuousId: (pagination.pageNo - 1) * pagination.pageSize + index + 1
      }))

      setAllData(updatedAllData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const paginationFetchData = async () => {
    try {
      const response = await queryData({
        pageNo: pagination.pageNo,
        pageSize: pagination.pageSize
      })

      const tagMap: Map<string, string> = new Map(
        tags.map((tag) => [tag.id, tag.name])
      )

      const updatedAllData = response.data.dataInfo.map((record, index) => ({
        ...record,
        time: dayjs(record.time).format('YYYY/MM/DD HH:mm:ss'),
        tags: record.tags.map((tagId) => tagMap.get(tagId) || tagId),
        continuousId: (pagination.pageNo - 1) * pagination.pageSize + index + 1
      }))

      setAllData(updatedAllData)
      setIsPagination(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const filterData = async () => {
    try {
      const startTimeStamp = filterDateRange[0]
        ? dayjs(filterDateRange[0]).valueOf()
        : undefined
      const endTimeStamp = filterDateRange[1]
        ? dayjs(filterDateRange[1]).valueOf()
        : undefined

      const firstTagMap: Map<string, string> = new Map(
        tags.map((tag) => [tag.name, tag.id])
      )
      const filterTagsId = filterTags.map(
        (tagName) => firstTagMap.get(tagName) || tagName
      )

      const filterTagsString = filterTagsId.join(',')

      if (
        filterName === '' &&
        filterTags.length === 0 &&
        startTimeStamp === undefined &&
        endTimeStamp === undefined
      ) {
        fetchData()
      }

      const queryParams: QueryDataParam = {
        pageNo: pagination.pageNo,
        pageSize: pagination.pageSize
      }
      if (filterName !== '') queryParams.name = filterName
      if (filterTags.length > 0) queryParams.tags = filterTagsString
      if (startTimeStamp !== undefined) queryParams.startTime = startTimeStamp
      if (endTimeStamp !== undefined) queryParams.endTime = endTimeStamp

      const response = await queryData(queryParams)

      const tagMap: Map<string, string> = new Map(
        tags.map((tag) => [tag.id, tag.name])
      )

      setPagination({
        ...pagination,
        total: response.data.pageInfo.total
      })

      const updatedAllData = response.data.dataInfo.map((record, index) => ({
        ...record,
        time: dayjs(record.time).format('YYYY/MM/DD HH:mm:ss'),
        tags: record.tags.map((tagId) => tagMap.get(tagId) || tagId),
        continuousId: (pagination.pageNo - 1) * pagination.pageSize + index + 1
      }))

      setAllData(updatedAllData)
      setIsFilter(false)
    } catch (error) {
      console.error('Error filtering data:', error)
    }
  }

  return {
    allData,
    pagination,
    setPagination,
    isTag,
    isPagination,
    setIsPagination,
    fetchData,
    paginationFetchData,
    filterName,
    setFilterName,
    filterTags,
    setFilterTags,
    filterDateRange,
    setFilterDateRange,
    isFilter,
    setIsFilter,
    filterData
  }
}

export default useData
