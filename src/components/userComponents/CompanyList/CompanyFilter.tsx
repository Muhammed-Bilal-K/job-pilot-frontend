import React from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

interface Props {
  onSearchTitle: (title: string) => void;
  onSearchLocation: (location: string) => void;
}

const CompanyFilter: React.FC<Props> = ({ onSearchTitle, onSearchLocation }) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTitle(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchLocation(e.target.value);
  };

  return (
    <div className="job-filter">
      <IoIosSearch className='inline text-3xl mr-3 text-blue-500' />
      <input className='input1' type="text" placeholder="Search by: Job tittle, Position, Keyword..." onChange={handleTitleChange} />
      <IoLocationOutline className='inline text-2xl mr-3 text-blue-500'/>
      <input type="text" placeholder="City, state or zip code" onChange={handleLocationChange} />
    </div>
  );
};

export default CompanyFilter;