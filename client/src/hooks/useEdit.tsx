import { useState } from 'react'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters
} from 'react-query'

const useEdit = (
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>
) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const enterEditMode = () => {
    setEditMode(true)
  }

  const submitAndExitEditMode = () => {
    setEditMode(false)
    refetch()
  }

  const cancel = () => {
    setEditMode(false)
  }

  return { enterEditMode, submitAndExitEditMode, cancel, editMode }
}

export default useEdit
