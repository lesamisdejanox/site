
//##############################################################################################################################################

 // #############################################################################################################
 let zoomLevel = 1; // Initial zoom level
let isDragging = false; // Flag for drag state
let startX, startY; // Starting cursor position for mouse and touch
let transformMatrix = [1, 0, 0, 1, 0, 0]; // Initial transform matrix

// Open Modal
function openImageModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalSection=document.getElementsByClassName("modal-section")[0];
    modal.style.display = "flex";
    modalSection.style.display="initial";
    modalImage.src = imageSrc;
    modalImage.style.transform = `matrix(${transformMatrix.join(",")})`;
    zoomLevel = 1; // Reset zoom level
    document.getElementById("zoomRange").value = zoomLevel;
}

// Close Modal
function closeModal() {
    // document.getElementsByClassName("modal-section")[0].style.display="none";
    // document.getElementById("imageModal").style.display = "none";
    const modalImage = document.getElementById("modalImage");
    
    // Reset transform matrix to initial state
    transformMatrix = [1, 0, 0, 1, 0, 0];
    zoomLevel = 1; // Reset zoom level

    // Reset image transformation
    modalImage.style.transform = `matrix(${transformMatrix.join(",")})`;

    // Hide the modal
    document.getElementsByClassName("modal-section")[0].style.display = "none";
    document.getElementById("imageModal").style.display = "none";

    // Reset zoom range slider if it exists
    const zoomRange = document.getElementById("zoomRange");
    if (zoomRange) {
        zoomRange.value = zoomLevel;
    }
}

// Zoom In
function zoomIn() {
    zoomLevel = Math.min(zoomLevel + 1, 10); // Max zoom level: 3
    applyZoom();
}

// Zoom Out
function zoomOut() {
    zoomLevel = Math.max(zoomLevel - 1, 0.1); // Min zoom level: 1
    applyZoom();
}

// Zoom via Range Input
function zoomImage(value) {
    zoomLevel = parseFloat(value);
    applyZoom();
}


// Apply Zoom to Image
function applyZoom() {
    const modalImage = document.getElementById("modalImage");
    modalImage.style.transform = `matrix(${zoomLevel}, 0, 0, ${zoomLevel}, ${transformMatrix[4]}, ${transformMatrix[5]})`;

    // Sync the slider value with zoom level
    const zoomRange = document.getElementById("zoomRange");
    if (zoomRange) {
        zoomRange.value = zoomLevel; // Update the slider value
    }
}

// Enable dragging of the image (Mouse)
function startDrag(event) {
    event.preventDefault(); // Prevent image from being selected
    if (event.button === 2) return; // Prevent dragging on right-click

    isDragging = true;
    startX = event.clientX - transformMatrix[4];
    startY = event.clientY - transformMatrix[5];
}

// Enable dragging of the image (Touch)
function startTouchDrag(event) {
    event.preventDefault(); // Prevent image from being selected
    if (event.touches.length > 1) return; // Only allow single touch to move the image

    isDragging = true;
    startX = event.touches[0].clientX - transformMatrix[4];
    startY = event.touches[0].clientY - transformMatrix[5];
}

// Stop dragging the image
function stopDrag() {
    isDragging = false;
}

// Drag the image while dragging is enabled (Mouse)
function dragImage(event) {
    if (!isDragging) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    transformMatrix[4] = deltaX;
    transformMatrix[5] = deltaY;

    const modalImage = document.getElementById("modalImage");
    modalImage.style.transform = `matrix(${zoomLevel}, 0, 0, ${zoomLevel}, ${transformMatrix[4]}, ${transformMatrix[5]})`;
}

// Drag the image while dragging is enabled (Touch)
function dragTouchImage(event) {
    if (!isDragging) return;

    const deltaX = event.touches[0].clientX - startX;
    const deltaY = event.touches[0].clientY - startY;

    transformMatrix[4] = deltaX;
    transformMatrix[5] = deltaY;

    const modalImage = document.getElementById("modalImage");
    modalImage.style.transform = `matrix(${zoomLevel}, 0, 0, ${zoomLevel}, ${transformMatrix[4]}, ${transformMatrix[5]})`;
}

// Reset dragging behavior on right-click
function resetDrag() {
    document.removeEventListener("contextmenu", (e) => e.preventDefault(), false);
}

// Attach events for dragging (Mouse)
const modalImage = document.getElementById("modalImage");
modalImage.addEventListener("mousedown", startDrag); // Start drag on mouse down
document.addEventListener("mouseup", stopDrag); // Stop dragging on mouse up
document.addEventListener("mousemove", dragImage); // Drag image on mouse move

// Attach events for dragging (Touch)
modalImage.addEventListener("touchstart", startTouchDrag); // Start drag on touch start
document.addEventListener("touchend", stopDrag); // Stop dragging on touch end
document.addEventListener("touchmove", dragTouchImage); // Drag image on touch move

// Disable right-click context menu
document.addEventListener("contextmenu", (e) => e.preventDefault(), false);

//###################################################################################################################
//###################################################################################################################
