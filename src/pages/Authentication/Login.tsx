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
  //const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  
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
        `${backendUrl}/auth/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      toast.success('Logged in successfully');
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
    //console.log(formData);
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
      <div className="h-screen bg-gray-50 flex items-center justify-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div className="flex flex-col items-center px-6 py-8 md:w-96 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4 mb-6 mt-2">
            <img
              src="https://trendlyne-media-mumbai-new.s3.amazonaws.com/profilepicture/155461_profilepicture.png"
              alt="Logo"
              className="w-14 h-10"
            />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Leads Management
            </h2>
          </div>
          <div className="w-full">
            {/* <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200 text-center mb-4">
              Sign in to your account
            </h1> */}
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email / Emp. ID
                </label>
                <input
                  type="text"
                  name="empRef"
                  id="empRef"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="Enter your Email ID or Employee ID"
                  onChange={handleFormDataChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="Enter your Password"
                  onChange={handleFormDataChange}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm px-5 py-2.5 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800"
                >
                  Sign in
                </button>
              </div>
              <div className="flex items-center justify-between mt-4 mb-2">
                <a
                  href="#"
                  className="text-sm text-orange-500 hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
