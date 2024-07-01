//语言language配置文件的数据接口
interface LanguageConfig {
  navbar: {
    title: string
    settings: string
  }
  addDataDialog: {
    title: string
    formItem: {
      name: string
      description: string
      tags: string
    }
    placeholder: {
      namePlaceholder: string
      descriptionPlaceholder: string
      selectTags: string
    }
  }
  addTagDialog: {
    title: string
    formItem: {
      name: string
    }
    placeholder: {
      namePlaceholder: string
    }
  }
  dataTable: {
    columns: {
      id: string
      name: string
      description: string
      time: string
      tags: string
      action: string
    }
    popover: {
      otherTags: string
    }
    filters: {
      name: string
      enterName: string
      tags: string
      selectTags: string
      startTime: string
      endTime: string
      selectDate: string
    }
    addData: string
  }
  common: {
    edit: string
    delete: string
    search: string
    reset: string
    add: string
    cancel: string
    confirm: string
    save: string
    submit: string
    change: string
    deleteConfirm: string
  }
  editTagDialog: {
    title: string
    formItem: {
      name: string
    }
    placeholder: {
      namePlaceholder: string
    }
  }
  validation: {
    nameRequired: string
    descriptionRequired: string
    tagRequired: string
    tagNameRequired: string
    tagUsed: string
  }
  editDataDialog: {
    title: string
    formItem: {
      name: string
      description: string
      tags: string
    }
    placeholder: {
      namePlaceholder: string
      descriptionPlaceholder: string
      selectTags: string
    }
  }
  tagsTable: {
    columns: {
      tag: string
      action: string
    }
    addTag: string
    deleteTag: string
  }
  settings: {
    checkedLanguage: string
    unCheckedLanguage: string
  }
  sidebar: {
    thoughtsTable: string
    dataTable: string
    tagsTable: string
  }
  pagination: {
    showTotalBefore: string
    showTotalAfter: string
  }
}

type LanguageType = 'en' | 'zh'

type Locale = ConfigProviderProps['locale']
