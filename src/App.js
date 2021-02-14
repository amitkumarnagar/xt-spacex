import React, { useEffect, useState } from 'react';
import './App.scss';
import { useHistory, useLocation } from 'react-router-dom';
import Loadable from 'react-loadable';
import { getLaunchListing } from './services';

const defaultFilters = {
  limit: 100
}

const AsyncFilters = Loadable({
  loader: () => import('./components/Filters'),
  loading: () => <div>Loading Filters...</div>,
});

const AsyncListing = Loadable({
  loader: () => import('./components/Listing'),
  loading: () => <div>Getting Launches...</div>,
});

function App() {
  const history = useHistory();
  const { search } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState([]);
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(search);
    const initialParams = {};
    searchParams.forEach((value, key) => {
      initialParams[key] = value;
    });
    return { ...initialParams, ...defaultFilters }
  });

  useEffect(() => {
    const params = new URLSearchParams();
    filters && Object.entries(filters).forEach(([key, value]) => params.set(key, value));
    const paramsStr = params.toString();
    history.replace({ search: paramsStr });
    setIsLoading(true);
    getLaunchListing(paramsStr).then(response => {
      if (response) setListing(response);
      setIsLoading(false);
    });
  }, [filters, history]);

  function handleFilterChange(filterType, value) {
    if (filters[filterType] === value) {
      setFilters(prev => {
        const resetFilters = { ...prev };
        delete resetFilters[filterType];
        return resetFilters;
      });
    }
    else {
      setFilters(prev => ({ ...prev, [filterType]: value }));
    }
  }

  function renderListing() {
    return (
      listing.length
        ? (
          <div className="grid-container">
            <AsyncListing listing={listing} />
          </div>
        )
        : (
          <div className="launch-program-no-results">
            <h1> No Records Found </h1>
          </div>
        )
    )
  }

  return (
    <div className="container">
      <h1>SpaceX Launch Programs</h1>
      <AsyncFilters filters={filters} onFilterChage={handleFilterChange} />
      {isLoading
        ? (
          <div className="launch-program-no-results">
            <h1>Getting Launches...</h1>
          </div>
        )
        : renderListing()}
      <div className="footer">
        <strong>Developed By: </strong>
        AMIT KUMAR
      </div>
    </div>
  );
}

export default App;
