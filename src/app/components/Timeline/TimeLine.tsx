"use client"

const TimeLine = () => {
  const timelineData = [
    {
      date: '2023-01-01',
      title: 'NODEJS',
      description: 'Learned nodejs online by myself',
    },
    {
      date: '2023-05-01',
      title: 'REACTJS',
      description: 'Learned it by myself and joined a tutored class',
    },
    {
      date: '2024-03-01',
      title: 'NEXTJS',
      description: 'Learned it by myself on Youtube after I had learned Reactjs',
    },
    {
      date: '2024-04-01',
      title: 'NESTJS',
      description: 'Joined a tutored class + learned it on Youtube',
    },

   
  ];

  return (
    <div className='w-full h-auto flex items-center justify-center flex-col mt-[4rem] mb-[4rem]'>
      <div className='w-[90%] md:w-[80%] flex flex-col justify-center items-center mx-auto relative'>
        {/* Vertical line */}
        <div className='absolute w-1 bg-blue-500 h-full left-1/2 transform -translate-x-1/2'></div>

        {timelineData.map((event, index) => (
          <div key={index} className='flex flex-col md:flex-row items-center mb-12 relative w-full'>
            {/* Event content */}
            <div data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'} data-aos-delay={600*index} data-aos-anchor-placement={index % 2 === 0 ? 'fade-middle' : 'fade-middle'} className={`w-full md:w-[40%] bg-white p-4 rounded-md shadow-md ${index % 2 === 0 ? 'mr-auto text-left' : 'ml-auto text-right'} max-w-[95%] md:max-w-none`}>
              <h3 className='text-[1rem] md:text-[1.5rem] font-semibold text-blue-500 pt-[1rem] pb-[1rem]'>{event.title}</h3>
              <p className='text-[0.8rem] md:text-[1rem] text-pink-500'>{event.date}</p>
              <p className='mt-2 text-[0.8rem] md:text-[0.9rem] text-gray-700'>{event.description}</p>
            </div>

            {/* Circle for the timeline */}
            <div className='absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-red-500 flex justify-center items-center text-white'>
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
