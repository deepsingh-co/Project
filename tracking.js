// ✅ Get Customer Location from localStorage
const customerLat = parseFloat(localStorage.getItem("customerLat")) || 28.7041;
const customerLng = parseFloat(localStorage.getItem("customerLng")) || 77.1025;

// ✅ Map Init
const map = L.map('map').setView([customerLat, customerLng], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 🟢 Customer Marker
const customerMarker = L.marker([customerLat, customerLng])
  .addTo(map)
  .bindPopup("📦 Customer Pickup Location")
  .openPopup();

// 🔵 Vendor Live Tracking
let vendorMarker;
let routingControl;

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      if (!vendorMarker) {
        vendorMarker = L.marker([lat, lng], {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            iconSize: [40, 40]
          })
        }).addTo(map).bindPopup("🚚 Vendor Live Location").openPopup();
      } else {
        vendorMarker.setLatLng([lat, lng]);
      }

      // ✅ Update Route
      if (routingControl) {
        map.removeControl(routingControl);
      }

      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(lat, lng),
          L.latLng(customerLat, customerLng)
        ],
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        createMarker: () => null
      }).addTo(map);

    },
    (error) => {
      alert("Error getting location: " + error.message);
    },
    { enableHighAccuracy: true }
  );
} else {
  alert("Geolocation not supported.");
}
