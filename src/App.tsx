import { useState } from 'react'
import { useForm } from 'react-hook-form';
import './App.css'

function App() {

  /* useFormから関数をimport */
  const {register,handleSubmit} = useForm();
  const onSubmit = (data) => console.log('onSubmit:', data);

  return (
    <>
    <p>handleSubmitはフォームの入力内容を検証したうえで、引数に渡した関数(onSubmit)を実行</p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder='firstNameを入力してください' />
      <input {...register("lastName")} placeholder='lastNameを入力してください' />
      <input {...register("nickname")} placeholder='nickNameを入力してください' />
      <input {...register("email")} placeholder='emailを入力してください' />
      <input {...register("age")} placeholder='ageを入力してください' />

      <input type="submit" />
    </form>


    </>
  )
}

export default App
