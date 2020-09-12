import { Table } from "antd"
import React from "react"
import { useGetTransactions } from "../api"

export function TransactionsList({
   data,
   loading,
}: {
   data: any
   loading: boolean
}) {
   if (loading) return <div>Loading</div>

   return (
      <Table
         dataSource={data}
         pagination={false}
         columns={[
            {
               title: "From",
               dataIndex: "from",
            },
            {
               title: "To",
               dataIndex: "to",
            },
            {
               title: "Amount",
               dataIndex: "amount",
            },
            {
               title: "Currency",
               dataIndex: "currency",
            },
            {
               title: "Balance",
               dataIndex: "balance",
            },
            {
               title: "Date",
               dataIndex: "date",
            },
         ]}
      />
   )
}
