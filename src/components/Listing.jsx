import React from 'react';
import defaultImage from '../assets/images/default.png';

function Listing({ listing }) {
  function onImageError(event) {
    event.target.onerror = null;
    event.target.src = defaultImage;
  }
  return listing.map((launch) =>
    <div className="card-container" key={launch.flight_number}>
      <div className="card">
        <figure>
          <img
            src={launch?.links?.mission_patch_small}
            alt={`launch-img-${launch.flight_number}`}
            width="256px"
            height="256px"
            onError={onImageError}
          />
        </figure>
        <div className="card-content">
          <h3>{launch?.mission_name} #{launch?.flight_number}</h3>
          <p>Mission Ids:</p>
          {launch?.mission_id?.length ? launch?.mission_id?.map((missionId) => <li key={missionId}>{missionId || '-'}</li>) : <p>-</p>}
          <p>Launch year: <span>{launch?.launch_year}</span></p>
          <p>Successful launch <span>{String(launch?.launch_success)}</span></p>
          <p>Successful landing <span>{launch.rocket.first_stage.cores[0].land_success ? 'true' : 'false'}</span></p>
        </div>
      </div>
    </div>
  )
}

export default Listing;
