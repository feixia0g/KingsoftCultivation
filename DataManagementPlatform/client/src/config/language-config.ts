export const getLanguageConfig = (language: string) => {
  return language === 'zh'
    ? //中文设置
      {
        navbar: {
          title: '数据管理平台',
          settings: '设置'
        },
        addDataDialog: {
          title: '添加记录',
          formItem: {
            name: '名称：',
            description: '描述：',
            tags: '标签：'
          },
          placeholder: {
            namePlaceholder: '请输入名称',
            descriptionPlaceholder: '请输入描述',
            selectTags: '请输入标签'
          }
        },
        addTagDialog: {
          title: '添加标签',
          formItem: {
            name: '名称：'
          },
          placeholder: {
            namePlaceholder: '请输入名称'
          }
        },
        dataTable: {
          columns: {
            id: '编号',
            name: '名称',
            description: '描述',
            time: '添加时间',
            tags: '标签',
            action: '操作'
          },
          popover: {
            otherTags: '其他标签'
          },
          filters: {
            name: '名称：',
            enterName: '请输入搜索名称',
            tags: '标签：',
            selectTags: '请选择标签',
            startTime: '开始日期',
            endTime: '结束日期',
            selectDate: '添加日期：'
          },
          addData: '添加数据'
        },
        common: {
          edit: '编辑',
          delete: '删除',
          search: '搜索',
          reset: '重置',
          add: '添加',
          cancel: '取消',
          confirm: '确定',
          save: '保存',
          submit: '提交',
          change: '更改',
          deleteConfirm: '确定删除？'
        },
        editTagDialog: {
          title: '编辑标签',
          formItem: {
            name: '名称：'
          },
          placeholder: {
            namePlaceholder: '请输入名称'
          }
        },
        validation: {
          nameRequired: '名称不能为空',
          descriptionRequired: '描述不能为空',
          tagRequired: '请至少选择一个标签',
          tagNameRequired: '标签名称不能为空',
          tagUsed: '标签已被使用'
        },
        editDataDialog: {
          title: '编辑数据',
          formItem: {
            name: '名称：',
            description: '描述：',
            tags: '标签：'
          },
          placeholder: {
            namePlaceholder: '请输入名称',
            descriptionPlaceholder: '请输入描述',
            selectTags: '请输入标签'
          }
        },
        tagsTable: {
          columns: {
            tag: '标签',
            action: '操作'
          },
          addTag: '添加标签',
          deleteTag: '确认删除'
        },
        settings: {
          checkedLanguage: '中文',
          unCheckedLanguage: '英文'
        },
        sidebar: {
          thoughtsTable: '学习心得',
          dataTable: '数据表格',
          tagsTable: '标签表格'
        },
        pagination: {
          showTotalBefore: '共',
          showTotalAfter: '条数据'
        }
      }
    : //英文设置
      {
        navbar: {
          title: 'Data Management Platform',
          settings: 'Settings'
        },
        addDataDialog: {
          title: 'Add Data',
          formItem: {
            name: 'name:',
            description: 'description:',
            tags: 'tags:'
          },
          placeholder: {
            namePlaceholder: 'please enter name',
            descriptionPlaceholder: 'please enter description',
            selectTags: 'please select tag'
          }
        },
        addTagDialog: {
          title: 'Add Tag',
          formItem: {
            name: 'name:'
          },
          placeholder: {
            namePlaceholder: 'description'
          }
        },
        dataTable: {
          columns: {
            id: 'ID',
            name: 'Name',
            description: 'Description',
            time: 'Time',
            tags: 'Tags',
            action: 'Action'
          },
          popover: {
            otherTags: 'Other Tags'
          },
          filters: {
            name: 'Name:',
            enterName: 'Enter name for search',
            tags: 'Tags:',
            selectTags: 'Select tags',
            startTime: 'start time',
            endTime: 'end time',
            selectDate: 'Add date:'
          },
          addData: 'Add data'
        },
        common: {
          edit: 'Edit',
          delete: 'Delete',
          search: 'Search',
          reset: 'Reset',
          add: 'Add',
          cancel: 'Cancel',
          confirm: 'Confirm',
          save: 'Save',
          submit: 'Submit',
          change: 'Change',
          deleteConfirm: 'Are you sure to delete?'
        },
        editTagDialog: {
          title: 'Edit Tag',
          formItem: {
            name: 'name:'
          },
          placeholder: {
            namePlaceholder: 'description'
          }
        },
        validation: {
          nameRequired: 'Name cannot be empty',
          descriptionRequired: 'Description cannot be empty',
          tagRequired: 'Please select at least one tag',
          tagNameRequired: 'Tag name cannot be empty',
          tagUsed: 'Tag is used by data, cannot be deleted'
        },
        editDataDialog: {
          title: 'Edit Data',
          formItem: {
            name: 'name:',
            description: 'description:',
            tags: 'tags:'
          },
          placeholder: {
            namePlaceholder: 'please enter name',
            descriptionPlaceholder: 'please enter description',
            selectTags: 'please select tag'
          }
        },
        settings: {
          checkedLanguage: 'Chinese',
          unCheckedLanguage: 'English'
        },
        tagsTable: {
          columns: {
            tag: 'Tag',
            action: 'Action'
          },
          addTag: 'Add Tag',
          deleteTag: 'Delete Tag'
        },
        sidebar: {
          thoughtsTable: 'Study Thoughts Table ',
          dataTable: 'Data Table',
          tagsTable: 'Tags Table'
        },
        pagination: {
          showTotalBefore: 'Total',
          showTotalAfter: 'items'
        }
      }
}
