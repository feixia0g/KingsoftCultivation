import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Skeleton, Table, TableColumnsType } from 'antd'
import React from 'react'
import style from './data-table-content.module.css'

export default function DataTableContent({
  setIsAddDialogVisible,
  texts,
  loading,
  columns,
  displayData,
  pagination,
  handleTableChange
}: {
  setIsAddDialogVisible: (value: boolean) => void
  texts: LanguageConfig
  loading: boolean
  columns: TableColumnsType<TableData>
  displayData: TableData[]
  pagination: PageInfo
  handleTableChange: (page: number, pageSize?: number) => void
}) {
  return (
    <Card className={style['data-card']}>
      <div className={style['data-bar']}>
        <div className={style['data-bar-item']}>
          <div className={style['add-data']}>
            <Button type="primary" onClick={() => setIsAddDialogVisible(true)}>
              <PlusOutlined /> {texts.dataTable.addData}
            </Button>
          </div>
        </div>
        <div className={style['data-bar-item']}>
          {loading ? (
            <Skeleton
              active
              paragraph={{ rows: 6 }}
              className={style['table-skeleton']}
            />
          ) : (
            <Table
              columns={columns}
              dataSource={displayData}
              rowKey="continuousId"
              pagination={{
                current: pagination.pageNo,
                pageSize: pagination.pageSize,
                total: pagination.total,
                onChange: handleTableChange,
                showSizeChanger: true,
                onShowSizeChange: handleTableChange,
                pageSizeOptions: ['5', '10', '15', '20'],
                showQuickJumper: true,
                showTotal: (total) =>
                  `${texts.pagination.showTotalBefore} ${total} ${texts.pagination.showTotalAfter}`
              }}
            />
          )}
        </div>
      </div>
    </Card>
  )
}
