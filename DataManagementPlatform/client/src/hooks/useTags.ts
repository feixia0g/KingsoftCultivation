import { useCallback, useState } from 'react'
import { queryTags } from '../api/service/tag-service'

const useTags = () => {
  const [tags, setTags] = useState<DisplayTag[]>([])

  const fetchTags = useCallback(async () => {
    try {
      const response = await queryTags()
      setTags(response.data)
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }, [])

  return { tags, fetchTags }
}

export default useTags
