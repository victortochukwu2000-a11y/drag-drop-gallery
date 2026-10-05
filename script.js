// Select all the small images, the display box and the large image
const thumbs = document.querySelectorAll(".thumb");
const display = document.querySelector("#display");
const largeImage = document.querySelector("#largeImage");
const placeholder = document.querySelector("#placeholder");

let draggedImage = null;

// Show the chosen image in the large box (DOM manipulation)
function showImage(img) {
  largeImage.src = img.src;
  largeImage.alt = img.alt;
  largeImage.hidden = false;
  placeholder.hidden = true;

  thumbs.forEach(function (t) {
    t.classList.remove("active");
  });
  img.classList.add("active");
}

thumbs.forEach(function (thumb) {
  // Make sure every small image can be dragged
  thumb.setAttribute("draggable", "true");

  thumb.addEventListener("dragstart", function (event) {
    draggedImage = thumb;
    event.dataTransfer.setData("text/plain", thumb.src);
  });

  // drag event: fires repeatedly while the image is being dragged
  thumb.addEventListener("drag", function () {
    thumb.classList.add("dragging");
  });

  // dragend event: fires when the drag is released
  thumb.addEventListener("dragend", function () {
    thumb.classList.remove("dragging");
    showImage(thumb);
  });

  // Tap or click also works, useful on phones
  thumb.addEventListener("click", function () {
    showImage(thumb);
  });
});

// Let the large box accept a dropped image
display.addEventListener("dragover", function (event) {
  event.preventDefault();
  display.classList.add("over");
});

display.addEventListener("dragleave", function () {
  display.classList.remove("over");
});

display.addEventListener("drop", function (event) {
  event.preventDefault();
  display.classList.remove("over");
  if (draggedImage) {
    showImage(draggedImage);
  }
});
