import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  useQuery,
  useQueryClient,
  useMutation,
} from 'react-query';

import NavBar from '../../components/layouts/navbar.jsx'

const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation(getAuthToken, {
    onSuccess: (data) => {
      queryClient.setQueryData(['accessToken'], data.access_token);
      if (data.error === undefined) navigate('/');
    }
  });

  return (
    <div>
      <div className='text-lg my-5 text-center'>Sign In</div>
      <form className="flex flex-col px-20 py-5 border-2" onSubmit={handleSubmit(mutation.mutate)}>
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
        <input type="submit" className="mt-5 border-2 border-radious-2 bg-blue-400 hover:bg-blue-600"/>
        {mutation.status === 'success' ? <span className='text-red-600'>Login failed</span> : ''}
      </form>
    </div>
  )
}

const getAuthToken = async (data) => {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('email', data.email);
  formData.append('password', data.password);

  return await fetch('/oauth/token', {
    method: 'POST',
    body: formData
  }).then(data => data.json());
};

export default SignIn;
