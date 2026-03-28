const reader = new Html5Qrcode("camera");
let scannerOn = false;

function toggleScanner(){
    scannerOn = !scannerOn;
    if (scannerOn){
        startScanner();
        mapContainer.style.display = "none";
        btn.innerText = "CANCEL";

    } else{
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment"},
        {},
        function(text) {
            const place = JSON.parse(text);
            showMarkerAt(place.top, place.left);
            const container = document.getElementById("inventory");
            const p = document.createElement("p");
            p.textContent = 
                "Name: " + place.name +
                " | In store: " + (place.inStock ?
        "Yes" : "No") +
                " | Price: €" + place.price;

            container.appendChild(p);
            toggleScanner();
        }
    ).catch(function(err){
        console.error(err);
    });
}

function stopScanner() {
    reader.stop();
}

function showMarkerAt(top,left){
    marker.style.top = top;
    marker.style.left = left;

}
