// import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import './App.css'

type Inputs = {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  age: number;
  tel: number;
  gender: string;
};


function App() {

  /* useFormから関数をimport */
  const {register,handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: 'onChange',
    criteriaMode: 'all'
  });
/* onSubmitハンドラ専用の型 submitHandlerをreact-hook-formからimportして使用し、ジェネリクスで定義した型(Inputs)を渡す*/
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log('onSubmit:', data);

  const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/

  return (
    <>
    <p>handleSubmitはフォームの入力内容を検証したうえで、引数に渡した関数(onSubmit)を実行</p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register("firstName",{
        required: true,
        maxLength : { value: 10,
                      message: '最大10文字となります'
                      }
        })} placeholder='firstNameを入力してください' />
      {/* {errors.firstName && <p className='error'>15文字以内で入力してください。</p>} */}
      {errors.firstName?.type === "required" && <p className='error'>何も入力されていません firstNameを入力してください</p>}
      {errors.firstName?.type === "maxLength" && <p className='error'>{errors.firstName.message}</p>}

      <label>Last Name</label>
      <input {...register("lastName", {
        required: true,
        maxLength : { value: 10,
                      message: '最大10文字となります'
                      }
        })} placeholder='lastNameを入力してください' />
      {/* {errors.lastName && <p className='error'>15文字以内で入力してください。</p>} */}
      {errors.lastName?.type === "required" && <p className='error'>何も入力されていません lastNameを入力してください</p>}
      {errors.lastName?.type === "maxLength" && <p className='error'>{errors.lastName.message}</p>}


      <label>Nick Name</label>
      <input {...register("nickname")} placeholder='nickNameを入力してください' />
      <label>E-mailアドレス</label>
      <input {...register("email", {
        required: true,
        maxLength: {value: 50,
        message: '最大50文字です'
      },
      pattern
      })} type='email' placeholder='emailアドレスを入力してください' />
      {errors.email?.type === "required" && <p className='error'>何も入力されていません メールアドレスを入力してください</p>}
      {errors.email?.type === "maxLength" && <p className='error'>{errors.email.message}</p>}
      {errors.email?.type === "pattern" && <p className='error'>メールアドレスの形式が正しくありません</p>}

      <label>Age</label>
      <input {...register("age")} placeholder='ageを入力してください' />

      <label>Tel</label>
      <input {...register("tel", {
        required: true,
        maxLength: {value: 11,
        message: '電話番号は11桁以上入力できません'
      },
      pattern: /^0\d{9,10}$/
      })} type='tel' placeholder='Tel Numberをハイフンなしで入力してください' />
      {errors.tel?.type === "required" && <p className='error'>何も入力されていません 電話番号をハイフンなしで入力してください</p>}
      {errors.tel?.type === "maxLength" && <p className='error'>{errors.tel.message}</p>}
      {errors.tel?.type === "pattern" && <p className='error'>電話番号の形式が正しくありません</p>}
 
      <label>Gender</label>
      <select {...register("gender", { required: true })}>
        <option value="woman">Woman</option>
        <option value="man">Man</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <p className='error'>選択必須です</p>}

      <input type="submit" value="送信" />
    </form>


    </>
  )
}

export default App
