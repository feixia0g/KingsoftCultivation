import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, Tooltip, Popover, Tag, message } from 'antd'
import type { TableColumnsType } from 'antd'
import style from './data-table.module.css'
import { RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import { getColorFromHash } from '../../../utils/get-random-color.util'
import DataDialog from '../../dialogs/data-dialog.component'
import { addData, editData, delData } from '../../../api/service/data-service'
import useTags from '../../../hooks/useTags'
import useData from '../../../hooks/useData'
import FilterBar from './filter-bar/filter-bar.component'
import DataTableContent from './data-table-content/data-table-content.component'

export default function DataTable() {
  const { tags, fetchTags } = useTags()
  const {
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
  } = useData(tags)
  const [displayData, setDisplayData] = useState<TableData[]>([])
  const [editingData, setEditingData] = useState<EditDataParams>()

  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false)
  const [isEditDialogVisible, setIsEditDialogVisible] = useState<boolean>(false)

  const texts = useSelector((state: RootState) => state.language.texts)

  const [loading, setLoading] = useState(true) // 新增 loading 状态

  const columns: TableColumnsType<TableData> = [
    {
      title: texts.dataTable.columns.id,
      dataIndex: 'continuousId',
      key: 'continuousId',
      ellipsis: true,
      width: 80,
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )
    },
    {
      title: texts.dataTable.columns.name,
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 120,
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )
    },
    {
      title: texts.dataTable.columns.description,
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 200,
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )
    },
    {
      title: texts.dataTable.columns.time,
      dataIndex: 'time',
      key: 'time',
      ellipsis: true,
      width: 120,
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )
    },
    {
      title: texts.dataTable.columns.tags,
      dataIndex: 'tags',
      key: 'tags',
      ellipsis: true,
      width: 200,
      render: (tags: string[]) => {
        if (tags.length > 2) {
          const popoverContent = (
            <div>
              {tags.slice(2).map((tag, index) => (
                <Tag color={getColorFromHash(tag)} key={index}>
                  {tag}
                </Tag>
              ))}
            </div>
          )
          return (
            <div>
              <Tag color={getColorFromHash(tags[0])}>{tags[0]}</Tag>
              <Tag color={getColorFromHash(tags[1])}>{tags[1]}</Tag>
              <Popover
                content={popoverContent}
                title={texts.dataTable.popover.otherTags}
              >
                <Button
                  size="small"
                  style={{
                    height: '22px',
                    lineHeight: '20px',
                    padding: '0 6px',
                    fontSize: '12px',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  ...
                </Button>
              </Popover>
            </div>
          )
        }
        return tags.map((tag, index) => (
          <Tag color={getColorFromHash(tag)} key={index}>
            {tag}
          </Tag>
        ))
      }
    },
    {
      title: texts.dataTable.columns.action,
      key: 'action',
      ellipsis: true,
      width: 120,
      render: (record: TableData) => (
        <span className={style['action-wrapper']}>
          <Button type="link" onClick={() => handleEditClick(record)}>
            {texts.common.edit}
          </Button>

          <Popconfirm
            title={texts.common.deleteConfirm}
            description=""
            onConfirm={() => handleDeleteClick(record.id)}
            okText={texts.common.confirm}
            cancelText={texts.common.cancel}
          >
            <Button type="link" danger>
              {texts.common.delete}
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ]

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  useEffect(() => {
    if (isTag) {
      setLoading(false)
    }
  }, [isTag])

  useEffect(() => {
    filterData()
  }, [isFilter])

  useEffect(() => {
    fetchData()
  }, [tags])

  useEffect(() => {
    if (isTag) {
      setDisplayData(allData)
    }
  }, [allData, isTag])

  useEffect(() => {
    paginationFetchData()
  }, [isPagination])

  const handleTableChange = (page: number, pageSize?: number) => {
    setIsPagination(true)
    setPagination({
      ...pagination,
      pageNo: page,
      pageSize: pageSize ?? pagination.pageSize
    })
  }

  const handleAddData = async (newData: AddDataParams) => {
    try {
      const response = await addData(newData)
      fetchData()
      if (response.code === 201) {
        message.success(response.msg)
      }
    } catch (error) {
      console.error('Error adding data:', error)
    }
  }

  const handleEditData = async (data: EditDataParams) => {
    try {
      const response = await editData(data)
      fetchData()
      if (response.code === 201) {
        message.success(response.msg)
      }
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  const handleEditClick = (record: TableData) => {
    setEditingData({
      id: record.id,
      name: record.name,
      description: record.description,
      tags: record.tags
    })
    setIsEditDialogVisible(true)
  }

  const handleDeleteClick = async (id: string) => {
    try {
      const response = await delData(id)
      fetchData()
      if (response.code === 204) {
        message.success(response.msg)
      }
    } catch (error) {
      console.error('Error deleting data:', error)
    }
  }

  return (
    <div className={style['data-table-wrapper']}>
      <div className={style['data-table']}>
        <FilterBar
          texts={texts}
          filterName={filterName}
          setFilterName={setFilterName}
          filterTags={filterTags}
          setFilterTags={setFilterTags}
          filterDateRange={filterDateRange}
          setFilterDateRange={setFilterDateRange}
          setIsFilter={setIsFilter}
          fetchData={fetchData}
          tags={tags}
        />
        <DataTableContent
          setIsAddDialogVisible={setIsAddDialogVisible}
          texts={texts}
          loading={loading}
          columns={columns}
          displayData={displayData}
          pagination={pagination}
          handleTableChange={handleTableChange}
        />
        <DataDialog
          action={'add'}
          visible={isAddDialogVisible}
          onClose={() => setIsAddDialogVisible(false)}
          onAdd={handleAddData}
        />
        {editingData && (
          <DataDialog
            action={'edit'}
            visible={isEditDialogVisible}
            onClose={() => setIsEditDialogVisible(false)}
            onEdit={handleEditData}
            data={editingData}
          />
        )}
      </div>
    </div>
  )
}
