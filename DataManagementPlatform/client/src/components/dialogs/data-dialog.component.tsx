import React, { useEffect } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import useTags from '../../hooks/useTags'

export default function DataDialog({
  action,
  visible,
  onClose,
  onAdd,
  onEdit,
  data
}: DataDialogProps) {
  const { tags, fetchTags } = useTags()
  const [form] = Form.useForm()
  const texts = useSelector((state: RootState) => state.language.texts)

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  //编辑预先填充表单数据
  useEffect(() => {
    if (visible) {
      form.resetFields()
      console.log(data)
      if (action === 'edit' && data) {
        form.setFieldsValue({
          name: data.name,
          description: data.description,
          tags: data.tags
        })
      }
    }
  }, [visible, action, data, form])

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  const handleAction = async () => {
    const values = await form.validateFields()

    // 将tags数组转换成一个Map以便快速查找
    const tagMap: Map<string, string> = new Map(
      tags.map((tag) => [tag.name, tag.id])
    )

    const updatedData = {
      ...values,
      id: data?.id,
      tags: values.tags.map((tagName: string) => tagMap.get(tagName) || tagName)
    }
    if (action === 'add') {
      if (onAdd) onAdd(updatedData)
    } else {
      if (data) if (onEdit) onEdit(updatedData)
    }
    handleClose()
  }

  return (
    <Modal
      title={
        action === 'add'
          ? texts.addDataDialog.title
          : texts.editDataDialog.title
      }
      open={visible}
      maskClosable={false}
      onCancel={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          {texts.common.cancel}
        </Button>,
        <Button key="submit" type="primary" onClick={handleAction}>
          {texts.common.confirm}
        </Button>
      ]}
    >
      <Form
        form={form}
        labelCol={{ span: 3 }} // 调整标签的宽度
        wrapperCol={{ span: 19 }} // 调整输入框的宽度
      >
        <Form.Item
          label={
            action === 'add'
              ? texts.addDataDialog.formItem.name
              : texts.editDataDialog.formItem.name
          }
          name="name"
          rules={[{ required: true, message: texts.validation.nameRequired }]}
        >
          <Input
            placeholder={
              action === 'add'
                ? texts.addDataDialog.placeholder.namePlaceholder
                : texts.editDataDialog.placeholder.namePlaceholder
            }
            style={{ marginBottom: 8 }}
            showCount
            maxLength={20}
          />
        </Form.Item>
        <Form.Item
          label={
            action === 'add'
              ? texts.addDataDialog.formItem.description
              : texts.editDataDialog.formItem.description
          }
          name="description"
          rules={[
            { required: true, message: texts.validation.descriptionRequired }
          ]}
        >
          <Input.TextArea
            placeholder={
              action === 'add'
                ? texts.addDataDialog.formItem.description
                : texts.editDataDialog.formItem.description
            }
            style={{ marginBottom: 8 }}
            showCount
            maxLength={50}
          />
        </Form.Item>
        <Form.Item
          label={
            action === 'add'
              ? texts.addDataDialog.formItem.tags
              : texts.editDataDialog.formItem.tags
          }
          name="tags"
        >
          <Select
            mode="multiple"
            placeholder={
              action === 'add'
                ? texts.addDataDialog.placeholder.selectTags
                : texts.editDataDialog.placeholder.selectTags
            }
            style={{ width: '100%', marginBottom: 8 }}
          >
            {tags.map((tag) => (
              <Select.Option key={tag.name} value={tag.name}>
                {tag.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
