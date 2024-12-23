import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { jwtState } from '../../atom';

import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import DarkModeSwitcher from '../../components/Header/DarkModeSwitcher';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [jwt, setJwt] = useRecoilState(jwtState);
  const [formData, setFormData] = useState({
    empRef: '',
    password: '',
  });

  //   useEffect(() => {
  //     if (localStorage.getItem("ACCESS_TOKEN")) {
  //       navigate("/leads-dashboard", { state: { from: location } });
  //     }
  //   }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //checks on input fields

    //
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      toast.success('logged in successfull');
      console.log(response.data.token);
      setJwt(response.data.token);
      localStorage.setItem('ACCESS_TOKEN', response.data.token);
      const decodedToken = jwtDecode(response.data.token);
      //console.log(decodedToken);
      localStorage.setItem('userName', decodedToken.emp_name);
      localStorage.setItem('emp_id', decodedToken.emp_id);
      navigate(from);
    } catch (error: any) {
      if (error.response) {
        toast.error(`${error.response.status}: ${error.response.data.message}`);
        console.error('Error Status:', error.response.status);
        console.error('Error Details:', error.response.data);
      } else {
        toast.error(`${error.message}`);
        console.error('Unexpected Error:', error.message);
      }
    }
    console.log(formData);
  };

  const handleFormDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      {/* <div className=''><DarkModeSwitcher /></div> */}
      <div className="h-screen ">
        <div className="bg-white dark:bg-gray-900  flex items-center justify-end px-6">
          <DarkModeSwitcher />
        </div>
        <div className="flex flex-col bg-gray-50 dark:bg-gray-900 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center space-x-4 py-4">
            <img
              src="https://trendlyne-media-mumbai-new.s3.amazonaws.com/profilepicture/155461_profilepicture.png"
              alt="Logo"
              className="w-14 h-10"
            />
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Leads Management
            </h2>
          </div>
          <div className="w-full rounded-lg bg-gray-100 dark:bg-gray-800 shadow-xl md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleFormSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email / Emp. ID
                  </label>
                  <input
                    type="text"
                    name="empRef"
                    id="empRef"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400"
                    placeholder="xyz@spandanasphoorty.com / SFXXXXXXXXX"
                    onChange={handleFormDataChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400"
                    onChange={handleFormDataChange}
                    required
                  />
                </div>
                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="items-center text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800"
                  >
                    Sign in
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm font-medium text-orange-400 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
