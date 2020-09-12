import { Input, Button, notification } from "antd"
import React, { useState } from "react"
import { useGetTransactions } from "./api"
import "./App.css"
import { MakeTransaction } from "./components/MakeTransaction"
import { TransactionsList } from "./components/TransactionsList"

const { Search } = Input

function App() {
   const [accountId, setAccountId] = useState<string>("andrios")
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [{ data: transactions, loading, error }, refetch] = useGetTransactions(
      accountId
   )
   return (
      <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
         <Search
            placeholder="Search for account"
            enterButton="Get Transactions"
            onSearch={(value) => setAccountId(value)}
         />

         <div
            style={{
               display: "flex",
               justifyContent: "flex-end",
               marginTop: 10,
            }}
         >
            <Button onClick={() => setIsModalOpen(true)}>
               New Transaction
            </Button>
         </div>

         <MakeTransaction
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCompleted={() => {
               setIsModalOpen(false)
               notification.success({
                  message: "Transaction completed!",
               })
               refetch()
            }}
            onError={(error) => {
               notification.error({
                  message: error.message,
               })
            }}
         />

         <div style={{ marginTop: 10 }}>
            {accountId && (
               <TransactionsList data={transactions} loading={loading} />
            )}
         </div>
      </div>
   )
}

export default App
