var right = document.getElementsByClassName("right");
var si = right.length;
var z = 1;

// Ensure the book is closed on page load
function initializeBook() {
  for (var i = 0; i < right.length; i++) {
    right[i].className = "right"; // Remove any flip classes to reset the book
    right[i].style.zIndex = "auto"; // Reset z-index
  }
}

initializeBook(); // Call this on page load to show the cover

function turnRight() {
  if (si >= 1) {
    si--;
  } else {
    si = right.length - 1;
    function sttmot(i) {
      setTimeout(function () {
        right[i].style.zIndex = "auto";
      }, 300);
    }
    for (var i = 0; i < right.length; i++) {
      right[i].className = "right";
      sttmot(i);
      z = 1;
    }
  }
  right[si].classList.add("flip");
  z++;
  right[si].style.zIndex = z;
}

function turnLeft() {
  if (si < right.length) {
    si++;
  } else {
    si = 1;
    for (var i = right.length - 1; i > 0; i--) {
      right[i].classList.add("flip");
      right[i].style.zIndex = right.length + 1 - i;
    }
  }
  right[si - 1].className = "right";
  setTimeout(function () {
    right[si - 1].style.zIndex = "auto";
  }, 350);
}

// Function to open to the front of the sixth page
function openToSixthPage() {
  var targetPage = 5; // The index of the front of the sixth page (0-based index)
  var currentPage = right.length - si; // Current page index

  while (currentPage < targetPage) {
    turnRight(); // Turn the page right until reaching the front of the sixth page
    currentPage++;
  }
}

// Function to open to the back of the eighth page
function openToEighthPage() {
  var targetPage = 7; // The eighth page (Contributes)
  var currentPage = right.length - si;

  while (currentPage < targetPage) {
    turnRight(); // Turn the page right until reaching the eighth page
    currentPage++;
  }

  // Move forward by one more page
}

// Function to open to the page before the back cover
function openToConclusionPage() {
  var targetPage = 8; // The index of the page before the back cover (0-based index)
  var currentPage = right.length - si; // Current page index

  while (currentPage < targetPage) {
    turnRight(); // Turn the page right until reaching the page before the back cover
    currentPage++;
  }
}

// Function to close the book
function closeBook() {
  si = right.length; // Reset to the last page
  for (var i = 0; i < right.length; i++) {
    right[i].className = "right"; // Reset to original class
    right[i].style.zIndex = "auto"; // Reset z-index
  }
  initializeBook(); // Reset book display
}

// Event listener for Introduction link
document
  .getElementById("open-introduction")
  .addEventListener("click", function (e) {
    e.preventDefault();
    openToSixthPage(); // Go to the front of the sixth page
  });

// Event listener for Home link
document.getElementById("go-home").addEventListener("click", function (e) {
  e.preventDefault();
  closeBook(); // Close the book
});

// Event listener for Contributes link
document
  .getElementById("go-contributes")
  .addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default link behavior
    openToEighthPage(); // Go to the back of the eighth page
  });

// Event listener for Conclusion link
document
  .getElementById("go-conclusion")
  .addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default link behavior
    openToConclusionPage(); // Go to the page before the back cover
  });

// Add event listeners for clicking on the front and back of pages
document.querySelectorAll(".front").forEach((frontPage) => {
  frontPage.addEventListener("click", () => {
    turnRight(); // Turn to the next page on front click
  });
});

document.querySelectorAll(".back").forEach((backPage) => {
  backPage.addEventListener("click", () => {
    turnLeft(); // Turn to the previous page on back click
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const lazyBackgrounds = document.querySelectorAll(".front, .back");

  let lazyBackgroundObserver = new IntersectionObserver(function (
    entries,
    observer
  ) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.backgroundImage = `url('${entry.target.dataset.bg}')`;
        lazyBackgroundObserver.unobserve(entry.target);
      }
    });
  });

  lazyBackgrounds.forEach(function (lazyBackground) {
    lazyBackgroundObserver.observe(lazyBackground);
  });
});
