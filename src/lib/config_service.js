import axios from 'axios';
// import Cookies from 'universal-cookie';

// // Initialize cookies
// const cookies = new Cookies();

// Create Axios instance
export const http = axios.create({
  baseURL: 'http://localhost:9000/api', // Update this to your API base URL
  withCredentials: true, // Include cookies in requests
  timeout: 5000,
});

// Add a request interceptor
// http.interceptors.request.use(
//   (config) => {
//     // Get the access_token from cookies
//     const token = cookies.get('access_token');
//     console.log('Access Token from Cookies:', token); // Debugging: Check if the token is fetched correctly
    
//     if (token) {
//       // Attach the token to the Authorization header
//       config.headers['Authorization'] = `${token}`; // Use Bearer scheme if required by your backend
//     }
    
//     return config;
//   },
//   (error) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// http.interceptors.response.use(
//   (response) => {
//     // Any status code within the range of 2xx will trigger this function
//     return response;
//   },
//   (error) => {
//     // Any status codes outside of 2xx will trigger this function
//     if (error.response?.status === 401) {
//       // Handle unauthorized access (e.g., token expired)
//       console.warn('Unauthorized! Redirecting to login.');
//       // Optionally redirect the user to the login page
//       window.location.href = '/works'; // Adjust this path to your actual login or error page
//     }
//     return Promise.reject(error);
//   }
// );





// import axios from "axios"
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();



//     // let token ='';


//     // if(localStorage?.getItem('USER')){
//     //     token =JSON.parse(localStorage?.getItem('USER'))?.token
    
//     // }
   

//     // export const http = axios.create({
//     //     baseURL: "http://localhost:9000/api",
//     //     withCredentials: true, // Include cookies in requests
//     //     timeout: 5000,
//     //   });


// //     const accessToken = Cookies.get('accesaccess_tokensToken');

// // console.log('Access Token:', accessToken);

// const accessToken = cookies.get('access_token');
// console.log('Access Token:', accessToken);


// const refresh_token = cookies.get('refresh_token');
// console.log('Refresh_token:', refresh_token);


// export const http = axios.create({
//     baseURL: "http://localhost:9000/api",
//     // headers: {
//     //     authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMCIsIkhldEhhblN0cmluZyI6IjAxLzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNTE0ODgwMDAwMCIsIm5iZiI6MTY5ODY4NTIwMCwiZXhwIjoxNzI1Mjk2NDAwfQ.CPY1b9IiMcklQZ9hjqIzrdiOlQ5YnV4VpzGu_yZr7G0",
//     //     token:`${token}`
        
//     // },
//     withCredentials: true,
//     timeout: 5000
// });


// http.interceptors.request.use(
//     (config) => {
//       // Get the access_token from cookies
//       const token = cookies.get('access_token');
//       console.log('token:', token);
      
//       if (token) {
//         // Attach the token to the Authorization header
//         config.headers['Authorization'] = `${token}`;
//       }
      
//       return config;
//     },
//     (error) => {
//       // Handle request errors
//       return Promise.reject(error);
//     }
//   );
  
//   // Add a response interceptor
//   http.interceptors.response.use(
//     (response) => {
//       // Any status code within the range of 2xx will trigger this function
//       return response;
//     },
//     (error) => {
//       // Any status codes outside of 2xx will trigger this function
//       if (error.response?.status === 401) {
//         // Handle unauthorized access (e.g., token expired)
//         console.warn('Unauthorized! Redirect to login.');
//         // Optionally redirect the user to the login page
//         window.location.href = '/works';
//       }
//       return Promise.reject(error);
//     }
//   );


