import toast from 'react-hot-toast'
import { IErrorResponse } from '@/types'

const useSubmitForm = () => {
  const submitHandler = async (
    url: string,
    data: FormData | Record<string, unknown>,
    method: 'POST' | 'PATCH'
  ) => {
    const isFormData = data instanceof FormData

    const body = isFormData ? data : JSON.stringify(data)

    const response = await fetch(`/api${url}`, {
      method: method,
      credentials: 'include',
      headers: !isFormData
        ? {
            'Content-Type': 'application/json'
          }
        : undefined,
      body
    })


    if (!response.ok) {
      const res = (await response.json()) as IErrorResponse
      return toast.error(res.message)
    }

    toast.success('Submission successful')
  }

  return submitHandler
}

export default useSubmitForm
