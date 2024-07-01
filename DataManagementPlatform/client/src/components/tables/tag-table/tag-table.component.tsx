import React, { useEffect, useState } from 'react'
import style from './tag-table.module.css'
import { Button, Card, Popconfirm, Table, Tag, Tooltip, message } from 'antd'
import type { TableColumnsType } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { TableRowSelection } from 'antd/es/table/interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { getColorFromHash } from '../../../utils/get-random-color.util'
import TagDialog from '../../dialogs/tag-dialog.component'
import {
  addTag,
  batchDelTags,
  delTag,
  editTag
} from '../../../api/service/tag-service'
import useTags from '../../../hooks/useTags'

export default function LabelTable() {
  const { tags, fetchTags } = useTags()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [editingTag, setEditingTag] = useState<DisplayTag | null>(null)

  //控制新增和编辑标签弹窗
  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false)
  const [isEditDialogVisible, setIsEditDialogVisible] = useState<boolean>(false)

  const texts = useSelector((state: RootState) => state.language.texts)

  const columns: TableColumnsType<DisplayTag> = [
    {
      title: texts.tagsTable.columns.tag,
      dataIndex: 'name',
      key: 'name',
      width: 80,
      render: (tag: string) => (
        <Tooltip title={tag}>
          <span className="text-ellipsis">
            <Tag color={getColorFromHash(tag)}>{tag}</Tag>
          </span>
        </Tooltip>
      )
    },
    {
      title: texts.tagsTable.columns.action,
      key: 'action',
      width: 120,
      render: (record: DisplayTag) => (
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

  const handleBatchDelete = async (ids: string[]) => {
    try {
      const idsStr = ids.join(',')
      const response = await batchDelTags(idsStr)
      if (response.code === 204) {
        message.success(response.msg)
      }
      fetchTags()
    } catch (error) {
      console.error('Error batchDeleting tags:', error)
    }
  }

  const rowSelection: TableRowSelection<DisplayTag> = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      const keys = selectedRowKeys
      const stringKeys: string[] = keys.map((key) => key.toString())
      setSelectedRowKeys(stringKeys)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  const handleAdd = async (name: string) => {
    try {
      const response = await addTag(name)
      fetchTags()
      if (response.code === 201) {
        message.success(response.msg)
      }
    } catch (error) {
      console.error('Error adding tag:', error)
    }
  }

  const handleEditClick = (tag: DisplayTag) => {
    setEditingTag(tag)
    setIsEditDialogVisible(true)
  }

  const handleDeleteClick = async (id: string) => {
    try {
      const response = await delTag(id)
      fetchTags()
      if (response.code === 204) {
        message.success(response.msg)
      }
    } catch (error) {
      console.error('Error deleting tag:', error)
      message.error(`Error deleting tag:,${error}`)
    }
  }

  const handleEdit = async (id: string, updatedTag: DisplayTag) => {
    try {
      const response = await editTag(updatedTag)
      fetchTags()
      if (response.code === 201) {
        message.success(response.msg)
      } else {
        message.error(response.msg)
      }
    } catch (error) {
      console.error('Error updating tag:', error)
      message.error(`Error updating tag:,${error}`)
    }
  }

  return (
    <div className={style['label-table-wrapper']}>
      <div className={style['label-table']}>
        <Card className={style['label-card']}>
          <div className={style['label-bar']}>
            <div className={style['label-bar-item']}>
              <div className={style['add-label']}>
                <Button
                  type="primary"
                  onClick={() => setIsAddDialogVisible(true)}
                >
                  <PlusOutlined /> {texts.tagsTable.addTag}
                </Button>
                <Button
                  type="primary"
                  danger
                  disabled={selectedRowKeys.length === 0}
                  onClick={() => {
                    handleBatchDelete(selectedRowKeys)
                  }}
                >
                  <MinusOutlined /> {texts.tagsTable.deleteTag}
                </Button>
              </div>
            </div>
            <div className={style['label-bar-item']}>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={tags}
                rowKey="id"
              />
              {editingTag && (
                <TagDialog
                  action={'edit'}
                  visible={isEditDialogVisible}
                  onClose={() => setIsEditDialogVisible(false)}
                  onEdit={handleEdit}
                  tag={editingTag}
                />
              )}
              <TagDialog
                action={'add'}
                visible={isAddDialogVisible}
                onClose={() => setIsAddDialogVisible(false)}
                onAdd={handleAdd}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
