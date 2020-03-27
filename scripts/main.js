$(document).ready(function() {
  //define click handler for search buttons
  $('#searchBtn').click(getAndShowData);
});

function getAndShowData(event) {
  event.preventDefault();
  //get the offense type from the drop-down
  let offenseType = $('#offType :selected').val();
  //get the location data
  let locationType = $("input[name='locationType']:radio:checked").val();
  //get the locationName
  let locationName = getLocationName(locationType);
  //get the offender property
  let offenderProp = $("input[name='offProp']:radio:checked").val();
  //fire off the query to get data
  crimeApi.getOffenseCountByLocation(
    offenseType,
    getCountByLocationObject(locationType, locationName)
  );
  //fire off another query to get offender prop data
  crimeApi.getOffenderCountByProperty(
    offenderProp,
    offenseType,
    getCountByLocationObject(locationType, locationName)
  );
}

function getLocationName(locationType) {
  let locationName = null;
  switch (locationType) {
    case 'national':
      break;
    case 'regional':
      locationName = $('#regionType :selected').val();
      break;
    case 'state':
      locationName = $('#stateType :selected').val();
      break;
    default:
      break;
  }
  return locationName;
}

function getCountByLocationObject(locationType, locationName) {
  let countByLocation;
  switch (locationType) {
    case 'national':
      countByLocation = new CountByLocation(true, false, null, null);
      break;
    case 'regional':
      countByLocation = new CountByLocation(false, true, locationName, null);
      break;
    case 'state':
      countByLocation = new CountByLocation(false, false, null, locationName);
      break;
    default:
      //default is national
      countByLocation = new CountByLocation(true, false, null, null);
      break;
  }
  return countByLocation;
}