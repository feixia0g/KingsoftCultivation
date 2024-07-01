import { Button, Form, Input, Modal } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import React, { useEffect } from 'react'

export default function TagDialog({
  action,
  visible,
  onClose,
  onAdd,
  onEdit,
  tag
}: TagsDialogProps) {
  const [form] = Form.useForm()
  const texts = useSelector((state: RootState) => state.language.texts)

  //编辑预先填充表单数据
  useEffect(() => {
    if (visible && action === 'edit' && tag)
      form.setFieldsValue({ name: tag.name })
  }, [visible, action, tag, form])

  const handleAction = async () => {
    const values = await form.validateFields()
    if (action === 'add') {
      if (onAdd) onAdd(values.name)
    } else {
      if (onEdit) if (tag) onEdit(tag.id, { id: tag.id, name: values.name })
    }
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title={
        action === 'add' ? texts.addTagDialog.title : texts.editTagDialog.title
      }
      open={visible}
      onCancel={() => {
        form.resetFields()
        onClose()
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            form.resetFields()
            onClose()
          }}
        >
          {texts.common.cancel}
        </Button>,
        <Button key="submit" type="primary" onClick={handleAction}>
          {texts.common.confirm}
        </Button>
      ]}
    >
      <Form form={form}>
        <Form.Item
          label={
            action === 'add'
              ? texts.addTagDialog.formItem.name
              : texts.editTagDialog.formItem.name
          }
          name="name"
          rules={[{ required: true, message: texts.validation.nameRequired }]}
        >
          <Input
            placeholder={
              action === 'add'
                ? texts.addTagDialog.placeholder.namePlaceholder
                : texts.editTagDialog.placeholder.namePlaceholder
            }
            onPressEnter={handleAction} // 允许按回车键提交
            showCount
            maxLength={10}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
