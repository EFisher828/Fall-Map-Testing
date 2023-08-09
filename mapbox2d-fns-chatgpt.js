// Replace with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhwbG9yZWZhbGwiLCJhIjoiY2xsMnluNmlsMmwwMzNxcGRrOXFpaXRjYSJ9.1CysSOnixhO2ndvCPmb7-Q';

// Create a Mapbox map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11', // Replace with your map style
  center: [-96, 38], // Replace with your initial center coordinates
  zoom: 3.6 // Replace with your initial zoom level
});

// Function to get image URL based on date
function getImageUrl(date) {
  return 'https://raw.githubusercontent.com/EFisher828/Explore-Fall/main/Maps/Interactive%20Maps/2022/' + date + '.png'; // Replace with your image file path
}

const dates = [
  '20220901', '20220902', '20220903', '20220904', '20220905', '20220906', '20220907', '20220908', '20220909', '20220910',
  '20220911', '20220912', '20220913', '20220914', '20220915', '20220916', '20220917', '20220918', '20220919', '20220920',
  '20220921', '20220922', '20220923', '20220924', '20220925', '20220926', '20220927', '20220928', '20220929', '20220930',
  '20221001', '20221002', '20221003', '20221004', '20221005', '20221006', '20221007', '20221008', '20221009', '20221010',
  '20221011', '20221012', '20221013', '20221014', '20221015', '20221016', '20221017', '20221018', '20221019', '20221020',
  '20221021', '20221022', '20221023', '20221024', '20221025', '20221026', '20221027', '20221028', '20221029', '20221030',
  '20221031', '20221101', '20221102', '20221103', '20221104', '20221105', '20221106', '20221107', '20221108', '20221109',
  '20221110', '20221111', '20221112', '20221113', '20221114', '20221115', '20221116', '20221117', '20221118', '20221119',
  '20221120', '20221121', '20221122', '20221123', '20221124', '20221125', '20221126', '20221127', '20221128', '20221129',
  '20221130'
];

map.on('load', function() {
  let firstSymbolId = 'waterway'
  // Initialize the image source
  map.addSource('image-source', {
    'type': 'image',
    'url': getImageUrl(dates[0]), // Initial date
    'coordinates': [
        [-126, 52],
        [-65, 52],
        [-65, 23],
        [-126, 23]
    ], // Replace with your image overlay coordinates
  });

  // Add a RasterLayer to display the image source
  map.addLayer({
    'id': 'image-layer',
    'type': 'raster',
    'source': 'image-source',
    'paint': {
      'raster-opacity': 1,
      'raster-fade-duration': 0
    }
  },firstSymbolId);

  // Add event listener to update image source based on slider value
  document.getElementById('dateSlider').addEventListener('input', function(event) {
    const selectedDate = event.target.value;
    const currentDate = document.getElementById('currentDate');
    map.getSource('image-source').updateImage({ url: getImageUrl(dates[selectedDate]) });
    currentDate.textContent = formatDate(dates[selectedDate]);
  });

  // Function to format the date as 'Oct 20, 2022'
  function formatDate(date) {
    if (date) {
      const year = date.slice(0, 4);
      const month = new Date(date.slice(4, 6) + '/01/2000').toLocaleString('default', { month: 'long' });
      const day = date.slice(6);
      return `${month} ${day}, ${year}`;
    }
    return '';
  }
});
