import { Modal, Input } from "antd"
import React from "react"
import { useCreateTransactions } from "../api"
import { useForm, Controller } from "react-hook-form"

interface IProps {
   isOpen: boolean
   onClose: () => void
   onCompleted: () => void
   onError: (error: Error) => void
}

export function MakeTransaction(props: IProps) {
   const { isOpen, onClose, onCompleted, onError } = props
   const [create, response] = useCreateTransactions()
   const { register, handleSubmit, watch, errors, control } = useForm({
      defaultValues: {
         from: "andrios",
         to: "lucas",
         currency: "BRL",
         amount: 0,
      },
   })

   const onSubmit = async (data: any) => {
      try {
         await create({
            ...data,
            amount: parseInt(data.amount),
         })

         onCompleted()
      } catch (err) {
         onError(err)
      }
   }

   return (
      <Modal
         title="Make Transaction"
         visible={isOpen}
         onOk={handleSubmit(onSubmit)}
         onCancel={onClose}
      >
         from: <Controller as={Input} name="from" control={control} />
         to: <Controller as={Input} name="to" control={control} />
         currency:{" "}
         <Controller
            as={Input}
            name="currency"
            control={control}
            defaultValue="BRL"
         />
         amount: <Controller as={Input} name="amount" control={control} />
      </Modal>
   )
}
