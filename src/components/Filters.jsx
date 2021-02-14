import React from 'react';
import { YEAR_FILTERS } from '../constants';

function Filters({ filters, onFilterChage }) {
  return (
    <aside>
      <h3>Filters</h3>
      <h4>Launch Year</h4>
      <div className="filters">
        {YEAR_FILTERS.map(year => (
          <button
            key={year}
            onClick={() => onFilterChage('launch_year', year)}
            className={`filter-text ${filters.launch_year === year ? 'active' : ''}`}>
            {year}
          </button>
        ))}

      </div>
      <h4>Successful launch</h4>
      <div className="filters">
        <div>
          <button className={filters.launch_success === 'true' ? 'active' : ''} onClick={() => onFilterChage('launch_success', 'true')}>True</button>
          <button className={filters.launch_success === 'false' ? 'active' : ''} onClick={() => onFilterChage('launch_success', 'false')}>False</button>
        </div>
      </div>
      <h4>Successful landing</h4>
      <div className="filters">
        <div>
          <button className={filters.land_success === 'true' ? 'active' : ''} onClick={() => onFilterChage('land_success', 'true')}>True</button>
          <button className={filters.land_success === 'false' ? 'active' : ''} onClick={() => onFilterChage('land_success', 'false')}>False</button>
        </div>
      </div>
    </aside>
  )
}

export default Filters;
