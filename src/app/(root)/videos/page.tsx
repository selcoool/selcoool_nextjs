// 'use client';

// import React, { useRef, useEffect, useState } from 'react';

// const VideoPlayer = () => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const [views, setViews] = useState(0);

//     useEffect(() => {
//         if (videoRef.current) {
//             videoRef.current.play();
//         }
//     }, []);

//     const handleVideoEnd = () => {
//         console.log('Video ended'); // Kiểm tra trong console
//         setViews((prev) => {
//             const newViews = prev + 1;
//             console.log(`Lượt xem mới: ${newViews}`); // Xác nhận lượt xem mới
//             return newViews;
//         });
//     };

//     return (
//         <div className="relative w-full max-w-lg mx-auto">
//             <video
//                 ref={videoRef}
//                 controls
//                 className="w-full h-auto"
//                 muted
//                 onEnded={handleVideoEnd} // Đảm bảo đã gán sự kiện này
//             >
//                 <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video>

//             <p className="mt-2 text-center">Lượt xem: {views}</p>
//         </div>
//     );
// };

// export default VideoPlayer;


'use client'; // Ensure this line is included at the top

import React, { useRef, useEffect, useState } from 'react';

const VideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [views, setViews] = useState(0);
    const [halfViews, setHalfViews] = useState(0); // Count for half views
    const [fullViews, setFullViews] = useState(0); // Count for full views
    const [hasViewed, setHasViewed] = useState(false); // Track if the video has been counted as viewed
    const [hasHalfViewed, setHasHalfViewed] = useState(false); // Track if half view has been counted

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

  

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };

    const increaseSpeed = () => {
        if (videoRef.current) {
            const newSpeed = playbackSpeed + 0.25;
            videoRef.current.playbackRate = newSpeed;
            setPlaybackSpeed(newSpeed);
        }
    };

    const decreaseSpeed = () => {
        if (videoRef.current) {
            const newSpeed = Math.max(playbackSpeed - 0.25, 0.25);
            videoRef.current.playbackRate = newSpeed;
            setPlaybackSpeed(newSpeed);
        }
    };

    const skipForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10; // Adjusting to skip 10 seconds
            if (videoRef.current.paused) {
                videoRef.current.play();
            }
        }
    };

    const skipBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
        }
    };

    // New event handler for when the video ends
    const handleVideoEnd = () => {
        console.log('Video ended'); // Debugging log
        setViews((prev) => {
            const newViews = prev + 1;
            // updateFavicon(newViews);
            return newViews;
        });
        setFullViews((prev) => prev + 1); // Increment full views
    };

    // Event handler for tracking halfway views
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            const duration = videoRef.current.duration;

            // Increment half views if the viewer reaches halfway
            if (currentTime >= duration / 2 && !hasHalfViewed) {
                setHalfViews((prev) => prev + 1); // Increment half views
                setHasHalfViewed(true); // Mark that half view has been counted
            }
        }
    };

    // Event handler for when the video starts playing
    const handlePlay = () => {
        // Allow to count views again only if it hasn't been viewed before
        if (!hasViewed) {
            setViews((prev) => {
                const newViews = prev + 1;
                // updateFavicon(newViews);
                return newViews;
            });
            setHasViewed(true); // Mark the video as viewed
        }

        // Reset the half view status when the video is played again
        setHasHalfViewed(false);
    };

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <video 
                ref={videoRef} 
                controls 
                className="w-full h-auto"
                muted
                onClick={togglePlay}
                onEnded={handleVideoEnd} // Ensure this is properly set
                onTimeUpdate={handleTimeUpdate} // Track time updates
                onPlay={handlePlay} // Track when the video starts playing
            >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <p className="mt-2 text-center">Lượt xem: {views}</p>
            <p className="mt-2 text-center">Lượt xem phân nửa: {halfViews}</p>
            <p className="mt-2 text-center">Lượt xem hết: {fullViews}</p>

            {/* <button 
                onClick={togglePlay} 
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition duration-300"
            >
                {videoRef.current && !videoRef.current.paused ? 'Pause' : 'Play'}
            </button>

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center space-x-2 space-y-2">
                <button 
                    onClick={decreaseSpeed} 
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Slower
                </button>
                <button 
                    onClick={increaseSpeed} 
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300"
                >
                    Faster
                </button>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center space-x-2 space-y-2">
                <button 
                    onClick={skipBackward} 
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-300"
                >
                    Rewind 10s
                </button>
                <button 
                    onClick={skipForward} 
                    className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition duration-300"
                >
                    Skip 10s
                </button>
            </div>

            {isEditing && (
                <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                    <h2 className="text-lg font-bold">Edit Video Options</h2>
                    <div className="mt-2">
                        <label className="block mb-1">Video Title:</label>
                        <input type="text" className="border rounded p-1 w-full" placeholder="Enter video title" />
                    </div>
                    <div className="mt-2">
                        <label className="block mb-1">Video Description:</label>
                        <textarea className="border rounded p-1 w-full" placeholder="Enter video description"></textarea>
                    </div>
                    <button 
                        onClick={() => alert('Save functionality not implemented yet!')}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Save Changes
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default VideoPlayer;






























