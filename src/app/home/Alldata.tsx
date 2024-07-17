// import React from 'react';
// import briefcase from '../../assets/briefcase-duotone 1.png';
// import buildcase from '../../assets/buildings 2.png';
// import people from '../../assets/users-duotone 1.png';

// const BoxSection: React.FC = () => {
//   return (
//     <div className='contain-all-box'>
//         <div className="box-section">
//       <div className="box">
//         <div className="box-left">
//           <img className='image-of-alldata' src={briefcase} alt="Image 1" />
//         </div>
//         <div className="box-right">
//           <div className="top-section">135433</div>
//           <div className="bottom-section">Live Job</div>
//         </div>
//       </div>
//       <div className="box">
//         <div className="box-left">
//           <img className='image-of-alldata' src={buildcase} alt="Image 2" />
//         </div>
//         <div className="box-right">
//           <div className="top-section">135433</div>
//           <div className="bottom-section">Companies</div>
//         </div>
//       </div>
//       <div className="box">
//         <div className="box-left">
//           <img className='image-of-alldata' src={people} alt="Image 3" />
//         </div>
//         <div className="box-right">
//           <div className="top-section">135433</div>
//           <div className="bottom-section">Candidates</div>
//         </div>
//       </div>
//       <div className="box">
//         <div className="box-left">
//           <img className='image-of-alldata' src={briefcase} alt="Image 4" />
//         </div>
//         <div className="box-right">
//           <div className="top-section">135433</div>
//           <div className="bottom-section">New JObs</div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default BoxSection;

import React from 'react';
import briefcase from '../../assets/briefcase-duotone 1.png';
import buildcase from '../../assets/buildings 2.png';
import people from '../../assets/users-duotone 1.png';

const BoxSection: React.FC = () => {
  return (
    <div className='flex flex-wrap justify-center gap-4 px-28 py-10'>
      <div className='flex-1 min-w-[200px] max-w-[calc(25%-1rem)] p-2'>
        <div className='bg-white shadow-lg rounded-lg flex items-center p-4'>
          <div className='flex-shrink-0'>
            <img className='w-12 h-12' src={briefcase} alt="Image 1" />
          </div>
          <div className='ml-4'>
            <div className='text-xl font-bold'>135433</div>
            <div className='text-gray-600'>Live Job</div>
          </div>
        </div>
      </div>
      <div className='flex-1 min-w-[200px] max-w-[calc(25%-1rem)] p-2'>
        <div className='bg-white shadow-lg rounded-lg flex items-center p-4'>
          <div className='flex-shrink-0'>
            <img className='w-12 h-12' src={buildcase} alt="Image 2" />
          </div>
          <div className='ml-4'>
            <div className='text-xl font-bold'>135433</div>
            <div className='text-gray-600'>Companies</div>
          </div>
        </div>
      </div>
      <div className='flex-1 min-w-[200px] max-w-[calc(25%-1rem)] p-2'>
        <div className='bg-white shadow-lg rounded-lg flex items-center p-4'>
          <div className='flex-shrink-0'>
            <img className='w-12 h-12' src={people} alt="Image 3" />
          </div>
          <div className='ml-4'>
            <div className='text-xl font-bold'>135433</div>
            <div className='text-gray-600'>Candidates</div>
          </div>
        </div>
      </div>
      <div className='flex-1 min-w-[200px] max-w-[calc(25%-1rem)] p-2'>
        <div className='bg-white shadow-lg rounded-lg flex items-center p-4'>
          <div className='flex-shrink-0'>
            <img className='w-12 h-12' src={briefcase} alt="Image 4" />
          </div>
          <div className='ml-4'>
            <div className='text-xl font-bold'>135433</div>
            <div className='text-gray-600'>New Jobs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxSection;
