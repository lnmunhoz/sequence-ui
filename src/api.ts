import axios, { AxiosError, AxiosResponse } from "axios"
import useAxios, { configure } from "axios-hooks"

configure({
   axios: axios.create({
      baseURL: "http://localhost:8910/v1",
      headers: {
         Authorization: "Bearer MTIzCg==", // echo '123' | base64
         "Content-Type": "application/json",
      },
   }),
})

type CreateTransactionPayload = {
   from: string
   to: string
   amount: number
   currency: string
   metadata?: string
}

export const useCreateTransactions = (): [
   (payload: CreateTransactionPayload) => Promise<AxiosResponse>,
   { data: any; loading: boolean; error: AxiosError | undefined }
] => {
   const [response, call] = useAxios(
      {
         method: "POST",
         url: "/transactions",
      },
      {
         manual: true,
         useCache: false,
      }
   )

   const post = (payload: CreateTransactionPayload) => call({ data: payload })

   return [
      post,
      {
         data: response.data,
         loading: response.loading,
         error: response.error,
      },
   ]
}

export const useGetTransactions = (account: string) =>
   useAxios({
      method: "GET",
      url: "/transactions",
      params: {
         account,
      },
   })
