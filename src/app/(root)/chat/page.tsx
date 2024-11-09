"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

type Message = {
  username: string;
  message: string;
  roomId: string;
};

const socket = io("http://localhost:9000/real_time_api");

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("User1");
  const [roomId, setRoomId] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(false);

  useEffect(() => {
    // Listen for new messages
    socket.on("newMessage1", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Confirmation for joining or leaving a room
    socket.on("joinedRoom", (room: string) => {
      // console.log(`Successfully joined room: ${room}`);
      setJoinedRoom(true);
      setMessages([]); // Clear previous messages when joining a new room
    });


    socket.on("allMessges", (allMessges: Message[]) => {
      setMessages(allMessges)
      console.log('sssssssssssssssss',allMessges)
      // console.log(`Successfully joined room: ${room}`);
      // setJoinedRoom(true);
      // setMessages([]); // Clear previous messages when joining a new room
    });

    socket.on("leftRoom", (room: string) => {
      console.log(`Successfully left room: ${room}`);
      setJoinedRoom(false);
      setMessages([]);
    });

    return () => {
      socket.off("newMessage1");
      socket.off("joinedRoom");
      socket.off("leftRoom");
    };
  }, []);

  const joinRoom = () => {
    if (roomId.trim()) {
      if (joinedRoom) {
        socket.emit("leaveRoom", { roomId });
      }
      socket.emit("joinRoom", { roomId });
    } else {
      alert("Please enter a valid room ID.");
    }
  };

  const sendMessage = () => {
    if (joinedRoom && message.trim()) {
      const newMessage: Message = { username, message, roomId };
      socket.emit("newMessage", newMessage);
      setMessage("");
    } else {
      alert("Please join a room and enter a message to send.");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Room ID"
        />
        <button onClick={joinRoom}>
          {joinedRoom ? "Switch Room" : "Join Room"}
        </button>
        {joinedRoom && <span>Joined Room: {roomId}</span>}
      </div>

      {joinedRoom ? (
        <>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
          <button onClick={sendMessage}>Send</button>
        </>
      ) : (
        <p>Please join a room to start chatting.</p>
      )}

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}</strong>: {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;












// "use client"
// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:9000/real_time_api'); // Connect to the specific namespace

// // Define the shape of a message
// type Message = {
//   username: string;
//   message: string;
// };

// const ChatComponent = () => {
//   const [messages, setMessages] = useState<Message[]>([]); // Set type of messages state
//   const [message, setMessage] = useState('');
//   const [username, setUsername] = useState('User1');
//   const [roomId, setRoomId] = useState('');

//   useEffect(() => {
//     socket.on('newMessage', (message: Message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('newMessage');
//     };
//   }, []);

//   const sendMessage = () => {
//     socket.emit('newMessage', { username, message, roomId });
//     setMessage('');
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//       />
//        <input
//         type="text"
//         value={roomId}
//         onChange={(e) => setRoomId(e.target.value)}
//         placeholder="Room ID"
//       />
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Message"
//       />
//       <button onClick={sendMessage}>Send</button>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.username}</strong>: {msg.message}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;




// "use client";
// import { useState, useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';

// let socket: Socket;

// const Chat = () => {
//   const [username, setUsername] = useState<string>(''); 
//   const [roomId, setRoomId] = useState<string>(''); 
//   const [message, setMessage] = useState<string>(''); 
//   const [messages, setMessages] = useState<{ id: string; sender: string; content: string }[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

//   useEffect(() => {
//     if (username) {

//       socket = io("http://localhost:9000/real_time_api", { query: { username } });

//       socket.on('message', (payload) => {
//         setMessages(prevMessages => [...prevMessages, payload]);
//       });

//       socket.on('load_messages', (loadedMessages) => {
//         setMessages(loadedMessages);
//       });

//       socket.on('message_updated', (updatedMessage) => {
//         setMessages(prevMessages =>
//           prevMessages.map(msg => (msg.id === updatedMessage.id ? updatedMessage : msg))
//         );
//       });

//       socket.on('message_deleted', ({ id }) => {
//         setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
//       });

//       socket.on('update_online', (users) => setOnlineUsers(users));

//       return () => {
//         socket.disconnect();
//       };
//     }
//   }, [username]);

//   const joinRoom = () => {
//     if (roomId) {
//       socket.emit('join_room', { roomId, username });
//       socket.emit('get_messages', { roomId });
//     }
//   };

//   const sendMessage = () => {
//     if (message && roomId) {
//       socket.emit('create_message', { roomId, content: message });
//       setMessage('');
//     }
//   };

//   const updateMessage = (messageId: string, newContent: string) => {
//     socket.emit('update_message', { messageId, newContent });
//   };

//   const deleteMessage = (messageId: string) => {
//     socket.emit('delete_message', { messageId });
//   };

//   return (
//     <div>
//       <div>
//         <h2>Online Users</h2>
//         <ul>
//           {onlineUsers.map((user, index) => (
//             <li key={index}>{user}</li>
//           ))}
//         </ul>
//       </div>
//       <h1>Chat Room</h1>
//       <input
//         type="text"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <div>
//         <input
//           type="text"
//           placeholder="Enter room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//         />
//         <button onClick={joinRoom}>Join Room</button>
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div>
//         <h2>Messages</h2>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <p>
//               <strong>{msg.sender}</strong>: {msg.content}
//             </p>
//             <button onClick={() => updateMessage(msg.id, 'Updated content')}>Edit</button>
//             <button onClick={() => deleteMessage(msg.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;




// "use client";
// import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";

// export default function FormComponent() {
//   const formRef = useRef<HTMLFormElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   const [socket, setSocket] = useState<any>(null); // State to manage WebSocket connection

//   useEffect(() => {
//     // Connect to the WebSocket server
//     const socketConnection = io("http://localhost:9000/real_time_api");
//     //   , {
//     //   transports: ["websocket"], // Use WebSocket transport (avoid polling)
//     // });

//     setSocket(socketConnection);

//     // Handle upload success
//     socketConnection.on("upload_success", (message: string) => {
//       setUploadMessage(message);
//       setFile(null); // Reset the file state
     

//       // Manually reset the file input field
//       // if (fileInputRef.current) {
//       //   fileInputRef.current.value = ""; // Clear the input file field
//       // }
//     });

//     // Handle upload error
//     socketConnection.on("upload_error", (error: string) => {
//       setUploadMessage(error);
//     });

//     // Cleanup on unmount
//     return () => {
//       socketConnection.disconnect();
//     };
//   }, []);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log('sssssssssssssss',file)
//     // Type guard to ensure that `file` is a File object
//     if (file && file instanceof File) {
//       console.log("File submitted:", file.name);
//       setFile(file); // Update the state with the selected file
//       socket.emit("upload_image", file);
//       // Emit the file upload event via WebSocket (example)
//       // socket?.emit("upload_file", file); // Replace with your upload event and server handling
//     } else {
//       console.log("No file selected or invalid file type");
//     }

//     // Set state to indicate successful submission
//     setFormSubmitted(true);

//     // Reset the form and file input after successful submission
//     formRef.current?.reset();
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""; // Clear the file input manually
//     }
//   };

//   return (
//     <div>
//       <form ref={formRef} onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="file">Choose a file:</label>
//           <input
//             type="file"
//             id="file"
//             name="file"
//             ref={fileInputRef}
//             onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>

//       {formSubmitted && (
//         <p>Form submitted successfully! The file input has been cleared.</p>
//       )}

//       {uploadMessage && (
//         <p>{uploadMessage}</p>
//       )}

  
//     </div>
//   );
// }


// "use client"

// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const HomePage = () => {
//   const [connected, setConnected] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Ensure that the WebSocket client is connecting to the correct URL
//     const socket = io("http://localhost:9000/real_time_api");  // Port should be 9000 if NestJS is on port 9000
    
//     socket.on("connect", () => {
//       console.log("Connected to WebSocket server");
//       setConnected(true);
//     });
  
//     socket.on("message", (data) => {
//       console.log("Received message from server:", data);
//       setMessage(data);
//     });
  
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     const socket = io("http://localhost:9000"); // Ensure the correct port
//     socket.emit("message", "Hello from Next.js client!");
//   };

//   return (
//     <div>
//       <h1>WebSocket Test</h1>
//       {connected ? (
//         <p>Connected to WebSocket server</p>
//       ) : (
//         <p>Attempting to connect...</p>
//       )}
//       <button onClick={sendMessage}>Send Message</button>
//       {message && <p>Message from server: {message}</p>}
//     </div>
//   );
// };

// export default HomePage;




// // src/components/Chat.tsx
// "use client";
// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// let socket: Socket; // Explicitly type 'socket' as Socket

// interface Message {
//   sender: string;
//   message: string;
// }

// const Chat = () => {
//   const [username, setUsername] = useState<string>('');
//   const [message, setMessage] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     // Connect to the WebSocket server at http://localhost:9000
//     socket = io('http://localhost:3002', {
//       transports: ['websocket'], // Only use WebSocket transport
//     });

//     // Listen for 'message' events from the server
//     socket.on('message', (payload: Message) => {
//       setMessages((prevMessages) => [...prevMessages, payload]); // Add the new message to the state
//     });

//     // Emit 'user_connected' event when the username is set
//     if (username) {
//       socket.emit('user_connected', { username });
//     }

//     return () => {
//       socket.disconnect(); // Cleanup and disconnect socket when component unmounts
//     };
//   }, [username]);

//   const sendMessage = () => {
//     if (message) {
//       const payload: Message = { sender: username, message };
//       socket.emit('message', payload); // Send message to the server
//       setMessage(''); // Clear the input field
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Room</h1>
//       <input
//         type="text"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div>
//         <h2>Messages</h2>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}</strong>: {msg.message}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;




// "use client";
// import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";

// export default function FormComponent() {
//   const formRef = useRef<HTMLFormElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   const [socket, setSocket] = useState<any>(null); // State to manage WebSocket connection

//   useEffect(() => {
//     // Connect to the WebSocket server
//     const socketConnection = io("http://localhost:3002")
//     //   , {
//     //   transports: ["websocket"], // Use WebSocket transport (avoid polling)
//     // });

//     setSocket(socketConnection);

//     // Handle upload success
//     socketConnection.on("upload_success", (message: string) => {
//       setUploadMessage(message);
//       setFile(null); // Reset the file state
     

//       // Manually reset the file input field
//       // if (fileInputRef.current) {
//       //   fileInputRef.current.value = ""; // Clear the input file field
//       // }
//     });

//     // Handle upload error
//     socketConnection.on("upload_error", (error: string) => {
//       setUploadMessage(error);
//     });

//     // Cleanup on unmount
//     return () => {
//       socketConnection.disconnect();
//     };
//   }, []);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     // Perform your form submission logic (e.g., API call)
//     // const formData = new FormData(formRef.current!);
//     // const file = formData.get("file");

//     // console.log('sssssssssssssss',formData.get("file"))
//     console.log('sssssssssssssss',file)
//     // Type guard to ensure that `file` is a File object
//     if (file && file instanceof File) {
//       console.log("File submitted:", file.name);
//       setFile(file); // Update the state with the selected file
//       socket.emit("upload_image", file);
//       // Emit the file upload event via WebSocket (example)
//       // socket?.emit("upload_file", file); // Replace with your upload event and server handling
//     } else {
//       console.log("No file selected or invalid file type");
//     }

//     // Set state to indicate successful submission
//     setFormSubmitted(true);

//     // Reset the form and file input after successful submission
//     formRef.current?.reset();
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""; // Clear the file input manually
//     }
//   };

//   return (
//     <div>
//       <form ref={formRef} onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="file">Choose a file:</label>
//           <input
//             type="file"
//             id="file"
//             name="file"
//             ref={fileInputRef}
//             onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>

//       {formSubmitted && (
//         <p>Form submitted successfully! The file input has been cleared.</p>
//       )}

//       {uploadMessage && (
//         <p>{uploadMessage}</p>
//       )}

  
//     </div>
//   );
// }


























// "use client";
// import { useState, useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';

// let socket: Socket;

// const Chat = () => {
//   const [username, setUsername] = useState<string>(''); 
//   const [roomId, setRoomId] = useState<string>(''); 
//   const [message, setMessage] = useState<string>(''); 
//   const [messages, setMessages] = useState<{ id: string; sender: string; content: string }[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

//   useEffect(() => {
//     if (username) {
//       socket = io('http://localhost:9000', { query: { username } });

//       socket.on('message', (payload) => {
//         setMessages(prevMessages => [...prevMessages, payload]);
//       });

//       socket.on('load_messages', (loadedMessages) => {
//         setMessages(loadedMessages);
//       });

//       socket.on('message_updated', (updatedMessage) => {
//         setMessages(prevMessages =>
//           prevMessages.map(msg => (msg.id === updatedMessage.id ? updatedMessage : msg))
//         );
//       });

//       socket.on('message_deleted', ({ id }) => {
//         setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
//       });

//       socket.on('update_online', (users) => setOnlineUsers(users));

//       return () => {
//         socket.disconnect();
//       };
//     }
//   }, [username]);

//   const joinRoom = () => {
//     if (roomId) {
//       socket.emit('join_room', { roomId, username });
//       socket.emit('get_messages', { roomId });
//     }
//   };

//   const sendMessage = () => {
//     if (message && roomId) {
//       socket.emit('create_message', { roomId, content: message });
//       setMessage('');
//     }
//   };

//   const updateMessage = (messageId: string, newContent: string) => {
//     socket.emit('update_message', { messageId, newContent });
//   };

//   const deleteMessage = (messageId: string) => {
//     socket.emit('delete_message', { messageId });
//   };

//   return (
//     <div>
//       <div>
//         <h2>Online Users</h2>
//         <ul>
//           {onlineUsers.map((user, index) => (
//             <li key={index}>{user}</li>
//           ))}
//         </ul>
//       </div>
//       <h1>Chat Room</h1>
//       <input
//         type="text"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <div>
//         <input
//           type="text"
//           placeholder="Enter room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//         />
//         <button onClick={joinRoom}>Join Room</button>
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div>
//         <h2>Messages</h2>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <p>
//               <strong>{msg.sender}</strong>: {msg.content}
//             </p>
//             <button onClick={() => updateMessage(msg.id, 'Updated content')}>Edit</button>
//             <button onClick={() => deleteMessage(msg.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;






// "use client";
// import { useState, useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';

// let socket: Socket;

// const Chat = () => {
//   const [username, setUsername] = useState<string>(''); // Username input state
//   const [roomId, setRoomId] = useState<string>(''); // Room ID state
//   const [message, setMessage] = useState<string>(''); // Message input state
//   const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]); // Message history
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // List of online users (usernames)

//   useEffect(() => {
//     if (username) {
      
//       // Connect to server with username
//       socket = io('http://localhost:3002', {
//         query: { username }, // Pass the username on connection
//       });

//       socket.on('message', (payload: { sender: string; message: string }) => {
//         setMessages(prevMessages => [...prevMessages, payload]); // Append new messages to state
//       });

//       socket.on('update_online', (users: string[]) => {
//         setOnlineUsers(users); // Update the list of online users (usernames)
//       });

//       return () => {
//         socket.disconnect(); // Clean up on unmount
//       };
//     }
//   }, [username]);

//   const joinRoom = () => {
//     if (roomId) {
//       socket.emit('join_room', { roomId, username });
//     }
//   };

//   const sendMessage = () => {
//     if (message && roomId) {
//       socket.emit('message', { message, roomId });
//       setMessage(''); // Clear the input field
//     }
//   };

//   return (
//     <div>
//         <div>
//         <h2>Online Users</h2>
//         <ul>
//           {onlineUsers.map((user, index) => (
//             <li key={index}>{user}</li>
//           ))}
//         </ul>
//       </div>
//       <h1>Chat Room</h1>
//       <input
//         type="text"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <div>
//         <input
//           type="text"
//           placeholder="Enter room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//         />
//         <button onClick={joinRoom}>Join Room</button>
//       </div>

//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//       <div>
//         <h2>Messages</h2>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}</strong>: {msg.message}
//           </p>
//         ))}
//       </div>

    
//     </div>
//   );
// };

// export default Chat;



// "use client";
// import { useState, useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';

// let socket: Socket;

// const Chat = () => {
//   const [username, setUsername] = useState<string>(''); // Username input state
//   const [roomId, setRoomId] = useState<string>(''); // Room ID state
//   const [message, setMessage] = useState<string>(''); // Message input state
//   const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]); // Message history
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // List of online users

//   useEffect(() => {
//     if (username) {
//       // Connect to server with username
//       socket = io('http://localhost:3002', {
//         query: { username }, // Pass the username on connection
//       });

//       socket.on('message', (payload: { sender: string; message: string }) => {
//         setMessages(prevMessages => [...prevMessages, payload]); // Append new messages to state
//       });

//       socket.on('update_online', (users: string[]) => {
//         setOnlineUsers(users); // Update the list of online users
//       });

//       return () => {
//         socket.disconnect(); // Clean up on unmount
//       };
//     }
//   }, [username]);

//   const joinRoom = () => {
//     if (roomId) {
//       socket.emit('join_room', { roomId, username });
//     }
//   };

//   const sendMessage = () => {
//     if (message && roomId) {
//       socket.emit('message', { message, roomId });
//       setMessage(''); // Clear the input field
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Room</h1>
//       <input
//         type="text"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <div>
//         <input
//           type="text"
//           placeholder="Enter room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//         />
//         <button onClick={joinRoom}>Join Room</button>
//       </div>

//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//       <div>
//         <h2>Messages</h2>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}</strong>: {msg.message}
//           </p>
//         ))}
//       </div>

//       <div>
//         <h2>Online Users</h2>
//         <ul>
//           {onlineUsers.map((user, index) => (
//             <li key={index}>{user}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Chat;



// "use client"
// import { useState, useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';

// let socket: Socket;

// const Chat = () => {
//   const [username, setUsername] = useState<string>(''); // Username input state
//   const [roomId, setRoomId] = useState<string>(''); // Room ID state
//   const [message, setMessage] = useState<string>(''); // Message input state
//   const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]); // Message history

//   useEffect(() => {
//     if (username) {
//       // Connect to server with username
//       socket = io('http://localhost:3002', {
//         query: { username }, // Pass the username on connection
//       });

//       socket.on('message', (payload: { sender: string; message: string }) => {
//         setMessages(prevMessages => [...prevMessages, payload]); // Append new messages to state
//       });

//       return () => {
//         socket.disconnect(); // Clean up on unmount
//       };
//     }
//   }, [username]);

//   const joinRoom = () => {
//     if (roomId) {
//       socket.emit('join_room', { roomId, username });
//     }
//   };

//   const sendMessage = () => {
//     if (message && roomId) {
//       socket.emit('message', { message, roomId });
//       setMessage(''); // Clear the input field
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Room</h1>
//       <input
//         type="text"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <div>
//         <input
//           type="text"
//           placeholder="Enter room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//         />
//         <button onClick={joinRoom}>Join Room</button>
//       </div>

//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//       <div>
//         <h2>Messages</h2>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}</strong>: {msg.message}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;












// "use client";
// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// let socket: Socket; // Explicitly type 'socket' as Socket

// interface Message {
//   sender: string;
//   message: string;
// }

// const Chat = () => {
//   const [username, setUsername] = useState<string>(''); // Store the username
//   const [message, setMessage] = useState<string>(''); // Message input state
//   const [recipientId, setRecipientId] = useState<string>(''); // Store recipient socket ID
//   const [clientId, setClientId] = useState<string>(''); // Default to empty string
//   const [messages, setMessages] = useState<Message[]>([]); // List of messages in the chat

//   useEffect(() => {
//     socket = io('http://localhost:3002'); // Connect to the Socket.IO server

//     socket.on('message', (payload: Message) => {
//       setMessages((prevMessages) => [...prevMessages, payload]); // Add new message to the state
//     });

//         // Handle successful connection and set clientId
//     socket.on('connect', () => {
//       setClientId(socket.id || ''); // Ensure clientId is never undefined
//     });

//     return () => {
//       socket.disconnect(); // Clean up on unmount
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message) {
//       const payload: { sender: string; message: string; recipientId: string } = {
//         sender: username,
//         message,
//         recipientId, // Include recipientId in the payload
//       };
//       socket.emit('message', payload); // Send message to server
//       setMessage(''); // Clear the message input
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Room</h1>
//              {/* Client ID display */}
//        <div>
//          {clientId && <p><strong>Client ID:</strong> {clientId}</p>}
//        </div>

//       {/* Username input */}
//       <input
//         type="text"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       {/* Recipient ID input for private message */}
//       <div>
//         <input
//           type="text"
//           placeholder="Enter recipient's socket ID"
//           value={recipientId}
//           onChange={(e) => setRecipientId(e.target.value)}
//         />
//       </div>

//       {/* Message input */}
//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//       {/* Display messages */}
//       <div>
//         <h2>Messages</h2>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}</strong>: {msg.message}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;


// "use client";
// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// let socket: Socket; // Explicitly type 'socket' as Socket

// interface Message {
//   sender: string;
//   message: string;
// }

// const Chat = () => {
//   const [username, setUsername] = useState<string>(''); // Default to empty string
//   const [clientId, setClientId] = useState<string>(''); // Default to empty string
//   const [message, setMessage] = useState<string>(''); // Message input
//   const [messages, setMessages] = useState<Message[]>([]); // Store messages

//   useEffect(() => {
//     socket = io('http://localhost:3002', {
//       query: { username }, // Send username as query parameter when connecting
//     });

//     // Listen for messages from the server
//     socket.on('message', (payload: Message) => {
//       setMessages((prevMessages) => [...prevMessages, payload]); // Add new message to the state
//     });

//     // Handle successful connection and set clientId
//     socket.on('connect', () => {
//       setClientId(socket.id || ''); // Ensure clientId is never undefined
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.disconnect(); // Disconnect the socket when component unmounts
//     };
//   }, [username]); // Reconnect only when username changes

//   // Send a message to the server
//   const sendMessage = () => {
//     if (message) {
//       const payload: Message = { sender: username, message };
//       socket.emit('message', payload); // Send message to server
//       setMessage(''); // Clear message input after sending
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Room</h1>

//       {/* Username input */}
//       <input
//         type="text"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       {/* Client ID display */}
//       <div>
//         {clientId && <p><strong>Client ID:</strong> {clientId}</p>}
//       </div>

//       {/* Message input */}
//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//       {/* Displaying messages */}
//       <div>
//         <h2>Messages</h2>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}</strong>: {msg.message}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;




// "use client";
// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// let socket: Socket; // Explicitly type 'socket' as Socket

// interface Message {
//   sender: string;
//   message: string;
// }

// const Chat = () => {
//   const [username, setUsername] = useState<string>(''); // Store the username
//   const [message, setMessage] = useState<string>(''); // Message input state
//   const [recipientId, setRecipientId] = useState<string>(''); // Store recipient socket ID
//   const [messages, setMessages] = useState<Message[]>([]); // List of messages in the chat

//   useEffect(() => {
//     socket = io('http://localhost:3002'); // Connect to the Socket.IO server

//     socket.on('message', (payload: Message) => {
//       setMessages((prevMessages) => [...prevMessages, payload]); // Add new message to the state
//     });

//     return () => {
//       socket.disconnect(); // Clean up on unmount
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message) {
//       const payload: { sender: string; message: string; recipientId: string } = {
//         sender: username,
//         message,
//         recipientId, // Include recipientId in the payload
//       };
//       socket.emit('message', payload); // Send message to server
//       setMessage(''); // Clear the message input
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Room</h1>

//       {/* Username input */}
//       <input
//         type="text"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       {/* Recipient ID input for private message */}
//       <div>
//         <input
//           type="text"
//           placeholder="Enter recipient's socket ID"
//           value={recipientId}
//           onChange={(e) => setRecipientId(e.target.value)}
//         />
//       </div>

//       {/* Message input */}
//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//       {/* Display messages */}
//       <div>
//         <h2>Messages</h2>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}</strong>: {msg.message}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;



// "use client";
// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// let socket: Socket; // Explicitly type 'socket' as Socket

// interface Message {
//   sender: string;
//   message: string;
//   roomId: string;
// }

// const Chat = () => {
//   const [username, setUsername] = useState<string>('');
//   const [roomId, setRoomId] = useState<string>('');  // Store the selected room ID
//   const [message, setMessage] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     socket = io('http://localhost:3002'); // Connect to the Socket.IO server

//     socket.on('message', (payload: Message) => {
//       if (payload.roomId === roomId) { // Check if the message belongs to the current room
//         setMessages((prevMessages) => [...prevMessages, payload]); // Add new message to the state
//       }
//     });

//     socket.on('joined_room', (roomId: string) => {
//       console.log(`Joined room: ${roomId}`);
//     });

//     return () => {
//       socket.disconnect(); // Clean up on unmount
//     };
//   }, [roomId]);

//   const joinRoom = () => {
//     if (roomId) {
//       socket.emit('join_room', roomId); // Join the specified room
//     }
//   };

//   const sendMessage = () => {
//     if (message && roomId) {
//       const payload: Message = { sender: username, message, roomId };
//       socket.emit('message', payload); // Send message to server with roomId
//       setMessage(''); // Clear input
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Room  {roomId}</h1>
//       <input
//         type="text"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <div>
//         <input
//           type="text"
//           placeholder="Enter room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//         />
//         <button onClick={joinRoom}>Join Room</button>
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div>
//         <h2>Messages</h2>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}</strong>: {msg.message}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;






// "use client";
// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// let socket: Socket; // Explicitly type 'socket' as Socket

// interface Message {
//   sender: string;
//   message: string;
// }

// const Chat = () => {
//   const [username, setUsername] = useState<string>('');
//   const [message, setMessage] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     socket = io('http://localhost:3002'); // Connect to the Socket.IO server

//     socket.on('message', (payload: Message) => {
//       setMessages((prevMessages) => [...prevMessages, payload]); // Add new message to the state
//     });

//     return () => {
//       socket.disconnect(); // Clean up on unmount
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message) {
//       const payload: Message = { sender: username, message };
//       socket.emit('message', payload); // Send message to server
//       setMessage(''); // Clear input
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Room</h1>
//       <input
//         type="text"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <div>
//         <input
//           type="text"
//           placeholder="Enter your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div>
//         <h2>Messages</h2>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}</strong>: {msg.message}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat;







