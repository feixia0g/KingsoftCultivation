import { RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, DatePicker, Input, Select } from 'antd'
import React from 'react'
import style from './filter-bar.module.css'
import { Dayjs } from 'dayjs'
const { RangePicker } = DatePicker

export default function FilterBar({
  texts,
  filterName,
  setFilterName,
  filterTags,
  setFilterTags,
  tags,
  filterDateRange,
  setFilterDateRange,
  setIsFilter,
  fetchData
}: {
  texts: LanguageConfig
  filterName: string
  setFilterName: (value: string) => void
  filterTags: string[]
  setFilterTags: (value: string[]) => void
  tags: DisplayTag[]
  filterDateRange: Dayjs[]
  setFilterDateRange: (value: Dayjs[]) => void
  setIsFilter: (value: boolean) => void
  fetchData: () => void
}) {
  return (
    <Card className={style['filter-card']}>
      <div className={style['filter-bar']}>
        <div className={style['filter-bar-item']}>
          <p>{texts.dataTable.filters.name}</p>
          <Input
            placeholder={texts.dataTable.filters.enterName}
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            showCount
            maxLength={20}
            style={{ width: 180 }}
          ></Input>
        </div>
        <div className={style['filter-bar-item']}>
          <p>{texts.dataTable.filters.tags}</p>
          <Select
            mode="multiple"
            placeholder={texts.dataTable.filters.selectTags}
            value={filterTags}
            onChange={(value) => setFilterTags(value)}
            style={{ width: 180 }}
            maxTagCount="responsive"
          >
            {tags.map((tag) => (
              <Select.Option key={tag.name} value={tag.name}>
                {tag.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className={style['filter-bar-item']}>
          <p>{texts.dataTable.filters.selectDate}</p>
          <RangePicker
            format="YYYY/MM/DD HH:mm:ss"
            placeholder={[
              texts.dataTable.filters.startTime,
              texts.dataTable.filters.endTime
            ]}
            showTime
            value={[
              filterDateRange[0] || undefined,
              filterDateRange[1] || undefined
            ]}
            onCalendarChange={(dates: [Dayjs | null, Dayjs | null]) => {
              setFilterDateRange(
                dates.filter((date) => date !== null) as Dayjs[]
              )
            }}
          />
        </div>
        <div className={style['filter-bar-item']}>
          <Button
            type="primary"
            onClick={() => {
              setIsFilter(true)
            }}
          >
            <SearchOutlined />
            {texts.common.search}
          </Button>
        </div>
        <div className={style['filter-bar-item']}>
          <Button
            onClick={() => {
              setFilterName('')
              setFilterTags([])
              setFilterDateRange([])
              fetchData()
            }}
          >
            <RedoOutlined />
            {texts.common.reset}
          </Button>
        </div>
      </div>
    </Card>
  )
}
