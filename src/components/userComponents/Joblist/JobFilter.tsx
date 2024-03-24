import React from 'react';

interface Props {
  onSearchTitle: (title: string) => void;
  onSearchLocation: (location: string) => void;
}

const JobFilter: React.FC<Props> = ({ onSearchTitle, onSearchLocation }) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTitle(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchLocation(e.target.value);
  };

  return (
    <div className="job-filter">
      <input className='input1' type="text" placeholder="Search Job Title" onChange={handleTitleChange} />
      <input type="text" placeholder="Search Location" onChange={handleLocationChange} />
    </div>
  );
};

export default JobFilter;
