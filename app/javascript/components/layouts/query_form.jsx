import React from 'react';
import {
  useSearchParams,
  Link
} from 'react-router-dom';

const QueryForm = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = event => {
    event.preventDefault();

    let params = serializeFromQuery(event.target);
    props.onChangeSearchParams(params);
  };

  const serializeFromQuery = (target) => {
    const {title, city} = target.elements;

    return {title: title.value, city: city.value}
  };

  return (
    <div className="flex my-3">
      <form className="flex" onSubmit={handleSubmit}>
        <label className="block text-gray-500 font-bold mr-2">Title</label>
        <input className="w-1/3 bg-gray-200" name='title' type="text"/>
        <label className="block text-gray-500 font-bold mr-2">City</label>
        <select className="w-1/3 bg-gray-200" name='city'>
          <option value="台北市">台北市</option>
          <option value="新北市">新北市</option>
        </select>
        <button
          type="submit"
          className="ml-4 px-2 hover:bg-blue-500 bg-blue-300 hover:text-white text-gray-600 rounded bold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default QueryForm;
