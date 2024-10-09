function displayMemes(images) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  images.forEach((image) => {
    const container = document.createElement("div");
    container.className = "meme-container";

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = "Meme";
    img.className = "meme-image";
    img.addEventListener("click", () => {
      window.location.href = `/editor?image=${encodeURIComponent(image.src)}`;
    });
    container.appendChild(img);

    const infoDiv = document.createElement("div");
    infoDiv.className = "meme-info";

    const memeName = document.createElement("div");
    memeName.className = "meme-memeName";
    memeName.textContent = image.memeName || getmemeNameFromPath(image.src);
    infoDiv.appendChild(memeName);

    const tags = document.createElement("div");
    tags.className = "meme-tags";
    tags.textContent = image.tags.join(", ");
    infoDiv.appendChild(tags);

    container.appendChild(infoDiv);

    gallery.appendChild(container);
  });
}

function getmemeNameFromPath(path) {
  return path.split("/").pop().split("?")[0];
}

function openMemeEditor(image) {
  const queryParams = new URLSearchParams({
    img: image.src,
    memeName: image.memeName || getmemeNameFromPath(image.src),
    tags: image.tags.join(","),
  });
  window.open(`editor.html?${queryParams.toString()}`, "_blank");
}

function searchMemes() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filteredMemes = memeImages.filter((image) =>
    image.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
  displayMemes(filteredMemes);
}

function openNewMemePopup() {
  document.getElementById("newMemePopup").style.display = "flex";
}

function closeNewMemePopup() {
  document.getElementById("newMemePopup").style.display = "none";
  document.getElementById("memeImageUpload").value = "";
  document.getElementById("memeTags").value = "";
}

function submitNewMeme() {
  const fileInput = document.getElementById("memeImageUpload");
  const tagsInput = document.getElementById("memeTags");

  if (fileInput.files.length > 0 && tagsInput.value.trim() !== "") {
    const file = fileInput.files[0];
    const tags = tagsInput.value.split(",").map((tag) => tag.trim());

    const reader = new FileReader();
    reader.onload = function (e) {
      const newMeme = {
        src: e.target.result,
        tags: tags,
        memeName: file.name, // Store the original memeName
      };
      memeImages.unshift(newMeme);
      displayMemes(memeImages);
      closeNewMemePopup();
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please select an image and enter at least one tag.");
  }
}

function toggleDarkMode() {
  const body = document.body;
  if (body.getAttribute("data-theme") === "dark") {
    body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    document.getElementById("darkModeToggle").textContent = "Dark Mode";
  } else {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    document.getElementById("darkModeToggle").textContent = "Light Mode";
  }
}

function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    document.getElementById("darkModeToggle").textContent = "Light Mode";
  } else {
    document.body.removeAttribute("data-theme");
    document.getElementById("darkModeToggle").textContent = "Dark Mode";
  }
}

document.getElementById("searchSubmit").addEventListener("click", searchMemes);

document
  .getElementById("searchInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchMemes();
    }
  });

document.getElementById("homeBtn").addEventListener("click", () => {
  displayMemes(memeImages);
  document.getElementById("searchBar").style.display = "none";
});

window.addEventListener("load", () => {
  displayMemes(memeImages);
});

// Event listeners
document.getElementById("newBtn").addEventListener("click", openNewMemePopup);
document
  .getElementById("cancelNewMeme")
  .addEventListener("click", closeNewMemePopup);
document
  .getElementById("submitNewMeme")
  .addEventListener("click", submitNewMeme);

document
  .getElementById("darkModeToggle")
  .addEventListener("click", toggleDarkMode);

// Apply saved theme on page load
document.addEventListener("DOMContentLoaded", applyTheme);
