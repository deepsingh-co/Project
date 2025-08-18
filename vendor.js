// document.querySelectorAll(".accept").forEach(btn => {
//   btn.addEventListener("click", () => {
//     alert("✅ Order Accepted");
//     btn.parentElement.parentElement.style.border = "2px solid #10b981";
//   });
// });

// document.querySelectorAll(".reject").forEach(btn => {
//   btn.addEventListener("click", () => {
//     alert("❌ Order Rejected");
//     btn.parentElement.parentElement.style.border = "2px solid #ef4444";
//   });
// });
// function showSection(sectionId) {
//       // Hide all sections
// document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
//       // Remove active class from navbar items
// document.querySelectorAll('.navbar ul li').forEach(li => li.classList.remove('active'));

//       // Show selected section
// document.getElementById(sectionId).classList.add('active');
// event.target.classList.add('active');
// }



document.addEventListener('DOMContentLoaded', () => {
  const historyGrid = document.querySelector('#history .orders-grid');

  // Event delegation: works for any current/future order cards
  document.addEventListener('click', (e) => {
    const acceptBtn = e.target.closest('.accept');
    const rejectBtn = e.target.closest('.reject');

    if (acceptBtn) {
      const card = acceptBtn.closest('.order-card');
      handleDecision(card, 'accepted');
    }

    if (rejectBtn) {
      const card = rejectBtn.closest('.order-card');
      handleDecision(card, 'rejected');
    }
  });

  function handleDecision(card, type) {
    if (!card) return;

    // Remove action buttons
    const actions = card.querySelector('.actions');
    if (actions) actions.remove();

    // Add / update status line
    let statusLine = card.querySelector('.status-line');
    if (!statusLine) {
      statusLine = document.createElement('p');
      statusLine.className = 'status-line';
      statusLine.innerHTML = '<b>Status:</b> ';
      card.appendChild(statusLine);
    }

    // Create status badge
    let badge = card.querySelector('.status');
    if (!badge) {
      badge = document.createElement('span');
      badge.classList.add('status');
      statusLine.appendChild(badge);
    }
    if (type === 'accepted') {
      badge.className = 'status accepted';
      badge.textContent = '✅ Accepted';
      card.style.borderLeft = '4px solid #10b981';
    } else {
      badge.className = 'status rejected';
      badge.textContent = '❌ Rejected';
      card.style.borderLeft = '4px solid #ef4444';
    }

    // Move card to Order History
    if (historyGrid) {
      historyGrid.prepend(card);
    }
  }
});


// for api call

let map, vendorMarker;

function initMap() {
  // Center map at Delhi (default)
  const defaultLocation = { lat: 28.6139, lng: 77.2090 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: defaultLocation,
  });

  vendorMarker = new google.maps.Marker({
    position: defaultLocation,
    map,
    title: "Vendor Current Location",
    icon: {
      url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    }
  });

  // Get live location
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        vendorMarker.setPosition(pos);
        map.setCenter(pos);
      },
      () => {
        alert("Unable to fetch live location!");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
