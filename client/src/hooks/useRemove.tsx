import axios from 'axios'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { client } from '../App'
import { Updater } from 'react-query/types/core/utils'

const useRemove = ({
  id,
  category,
  mutationKey,
  queryKey,
  options
}: {
  id: string
  category: string
  mutationKey: string[]
  queryKey: string[]
  options?: { objectKey: string }
}) => {
  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: async () => {
      try {
        const { data } = await axios.delete(
          `/api/${category}/${id}`,
          { withCredentials: true }
        )
        return toast.success(data.message)
      } catch (err) {
        if (err instanceof Error) {
          return toast.error(err.message)
        }
      }
    },
    onMutate: async () => {
      await client.cancelQueries({ queryKey: queryKey })
      const previousData = (await client.getQueryData(queryKey)) as any
      if (options?.objectKey) {
        const newData: Record<string, unknown[]> = {
          ...previousData,
          [options.objectKey]: previousData[options.objectKey].filter(
            (t: any) => t.id !== id
          )
        }
        client.setQueryData(queryKey, newData)
        return previousData
      }
      client.setQueryData(queryKey, (old: Updater<any[], any>) =>
        old.filter((m: { id: string }) => m.id !== id)
      )
      return previousData
    }
  })

  return { removeItem: mutate }
}

export default useRemove
