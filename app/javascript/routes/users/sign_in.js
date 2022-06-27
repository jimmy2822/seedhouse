import React from 'react';
import { useForm } from 'react-hook-form';

import NavBar from '../../components/layouts/navbar.jsx'

const SignIn = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div>
      <div className='text-lg my-5 text-center'>Sign In</div>
      <form className="flex flex-col px-20 py-5 border-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="font-bold mb-3">Email</div>
          <input className="border-b-2 text-gray-400" {...register("email", { required: true })} />
          {errors.email && <span className="text-red-400">This field is required</span>}
        </div>
        <div className="flex flex-col mt-2">
          <div className="font-bold mb-3">Password</div>
          <input type='password' className="border-b-2 text-gray-400" {...register("password", { required: true })} />
          {errors.password && <span className="text-red-400">This field is required</span>}
        </div>
        <input type="submit" className="mt-5 border-2 border-radious-2 hover:bg-blue-400"/>
      </form>
    </div>
  )
}

export default SignIn;
