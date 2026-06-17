// =====================================
// CONFIGURATION
// =====================================

const SECRET_PASSWORD = "PRV25";

let galleryData =
JSON.parse(
localStorage.getItem("galleryData")
) || [];

let currentIndex = 0;
let editIndex = null;

// =====================================
// DEFAULT IMAGES
// =====================================

if(galleryData.length === 0){

galleryData = [

{
title:"Mountain",
category:"nature",
image:"assets/images/nature1.jpg",
date:new Date().toLocaleDateString(),
hidden:false
},

{
title:"Forest",
category:"nature",
image:"assets/images/nature2.jpg",
date:new Date().toLocaleDateString(),
hidden:false
},

{
title:"City",
category:"city",
image:"assets/images/city1.jpg",
date:new Date().toLocaleDateString(),
hidden:false
},

{
title:"Lion",
category:"animal",
image:"assets/images/animal1.jpg",
date:new Date().toLocaleDateString(),
hidden:false
}

];

saveGallery();

}

// =====================================
// SAVE GALLERY
// =====================================

function saveGallery(){

localStorage.setItem(
"galleryData",
JSON.stringify(galleryData)
);

}

// =====================================
// TOAST
// =====================================

function showToast(message){

const toast =
document.getElementById("toast");

if(!toast) return;

toast.innerHTML = message;

toast.style.display = "block";

setTimeout(()=>{

toast.style.display = "none";

},3000);

}

// =====================================
// LOADER
// =====================================

window.addEventListener(
"load",
function(){

const loader =
document.getElementById("loader");

if(loader){

loader.style.display = "none";

}

}
);

// =====================================
// DARK MODE
// =====================================

function toggleTheme(){

document.body.classList.toggle("dark");

if(
document.body.classList.contains("dark")
){

localStorage.setItem(
"theme",
"dark"
);

showToast(
"Dark Mode Enabled"
);

}
else{

localStorage.setItem(
"theme",
"light"
);

showToast(
"Light Mode Enabled"
);

}

}

// =====================================
// LOAD SAVED THEME
// =====================================

if(
localStorage.getItem("theme")
===
"dark"
){

document.body.classList.add(
"dark"
);

}

// =====================================
// UPDATE STATS
// =====================================

function updateStats(){

const totalImages =
galleryData.length;

const hiddenImages =
galleryData.filter(
img => img.hidden
).length;

const totalEl =
document.getElementById(
"totalImages"
);

const hiddenEl =
document.getElementById(
"hiddenImages"
);

if(totalEl){

totalEl.innerHTML =
totalImages;

}

if(hiddenEl){

hiddenEl.innerHTML =
hiddenImages;

}

}

// =====================================
// RENDER GALLERY
// =====================================

function renderGallery(){

const gallery =
document.getElementById(
"gallery"
);

const secretContainer =
document.getElementById(
"secretContainer"
);

if(!gallery) return;

gallery.innerHTML = "";

if(secretContainer){

secretContainer.innerHTML = "";

}

galleryData.forEach(
(item,index)=>{

const card =
document.createElement(
"div"
);

card.className =
"image-card";

card.innerHTML =

`
<img
src="${item.image}"
onclick="openLightbox(${index})">

<div class="image-info">

<h3>${item.title}</h3>

<p>${item.category}</p>

<small>${item.date}</small>

<div class="image-actions">

<button onclick="editImage(${index})">
Edit
</button>

<button onclick="deleteImage(${index})">
Delete
</button>

<button onclick="toggleHide(${index})">
${item.hidden ? "Unhide" : "Hide"}
</button>

</div>

</div>
`;

if(item.hidden){

if(secretContainer){

secretContainer.appendChild(
card
);

}

}
else{

gallery.appendChild(card);

}

});

updateStats();

const counter =
document.getElementById(
"counter"
);

if(counter){

counter.innerHTML =
"Total Images : " +
galleryData.length;

}

}

// =====================================
// IMAGE PREVIEW
// =====================================

window.addEventListener(
"load",
function(){

const upload =
document.getElementById(
"imageUpload"
);

if(upload){

upload.addEventListener(
"change",
function(){

const file =
this.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload =
function(e){

const preview =
document.getElementById(
"preview"
);

if(preview){

preview.src =
e.target.result;

preview.style.display =
"block";

}

};

reader.readAsDataURL(
file
);

});

}

});

// =====================================
// ADD IMAGE
// =====================================

function addImage(){

const title =
document.getElementById(
"imageTitle"
).value.trim();

const category =
document.getElementById(
"imageCategory"
).value.trim();

const file =
document.getElementById(
"imageUpload"
).files[0];

if(
!title ||
!category ||
!file
){

showToast(
"Please fill all fields"
);

return;

}

const reader =
new FileReader();

reader.onload =
function(e){

galleryData.push({

title:title,

category:
category.toLowerCase(),

image:
e.target.result,

date:
new Date()
.toLocaleDateString(),

hidden:false

});

saveGallery();

renderGallery();

showToast(
"Image Added Successfully"
);

document.getElementById(
"imageTitle"
).value = "";

document.getElementById(
"imageCategory"
).value = "";

document.getElementById(
"imageUpload"
).value = "";

const preview =
document.getElementById(
"preview"
);

if(preview){

preview.style.display =
"none";

}

};

reader.readAsDataURL(
file
);

}

// =====================================
// EDIT IMAGE
// =====================================

function editImage(index){

editIndex = index;

document
.getElementById(
"editModal"
)
.style.display =
"flex";

document
.getElementById(
"editTitle"
)
.value =
galleryData[index].title;

document
.getElementById(
"editCategory"
)
.value =
galleryData[index].category;

}

// =====================================
// SAVE EDIT
// =====================================

function saveEdit(){

if(editIndex === null)
return;

galleryData[editIndex].title =

document
.getElementById(
"editTitle"
)
.value;

galleryData[editIndex].category =

document
.getElementById(
"editCategory"
)
.value
.toLowerCase();

saveGallery();

renderGallery();

closeEditModal();

showToast(
"Image Updated"
);

}

// =====================================
// CLOSE EDIT MODAL
// =====================================

function closeEditModal(){

document
.getElementById(
"editModal"
)
.style.display =
"none";

editIndex = null;

}

// =====================================
// DELETE IMAGE
// =====================================

function deleteImage(index){

const confirmDelete =
confirm(
"Delete this image?"
);

if(!confirmDelete)
return;

galleryData.splice(
index,
1
);

saveGallery();

renderGallery();

showToast(
"Image Deleted"
);

}

// =====================================
// HIDE / UNHIDE IMAGE
// =====================================

function toggleHide(index){

galleryData[index].hidden =
!galleryData[index].hidden;

saveGallery();

renderGallery();

if(
galleryData[index].hidden
){

showToast(
"Image Hidden"
);

}
else{

showToast(
"Image Unhidden"
);

}

}

// =====================================
// SEARCH IMAGES
// =====================================

function searchImages(){

const value =

document
.getElementById(
"search"
)
.value
.toLowerCase();

const cards =

document
.querySelectorAll(
".image-card"
);

cards.forEach(card=>{

const text =
card.innerText
.toLowerCase();

if(
text.includes(value)
){

card.style.display =
"block";

}
else{

card.style.display =
"none";

}

});

}

// =====================================
// FILTER IMAGES
// =====================================

function filterImages(category){

const cards =

document
.querySelectorAll(
".image-card"
);

cards.forEach(card=>{

const text =
card.innerText
.toLowerCase();

if(
category === "all"
){

card.style.display =
"block";

}
else if(
text.includes(category)
){

card.style.display =
"block";

}
else{

card.style.display =
"none";

}

});

}

// =====================================
// SECRET GALLERY
// =====================================

function openSecretGallery(){

document
.getElementById(
"passwordModal"
)
.style.display =
"flex";

}

// =====================================
// CHECK PASSWORD
// =====================================

function checkPassword(){

const password =

document
.getElementById(
"passwordInput"
)
.value;

if(
password ===
SECRET_PASSWORD
){

document
.getElementById(
"passwordModal"
)
.style.display =
"none";

document
.getElementById(
"secretGallery"
)
.style.display =
"block";

showToast(
"Secret Gallery Unlocked"
);

}
else{

document
.getElementById(
"passwordError"
)
.innerHTML =
"Incorrect Password";

showToast(
"Wrong Password"
);

}

}

// =====================================
// CLOSE MODALS
// =====================================

window.onclick =
function(event){

const editModal =
document.getElementById(
"editModal"
);

const passwordModal =
document.getElementById(
"passwordModal"
);

if(
event.target ===
editModal
){

closeEditModal();

}

if(
event.target ===
passwordModal
){

passwordModal.style.display =
"none";

}

};

// =====================================
// LIGHTBOX OPEN
// =====================================

function openLightbox(index){

currentIndex = index;

const lightbox =
document.getElementById(
"lightbox"
);

const image =
document.getElementById(
"lightbox-img"
);

if(lightbox && image){

lightbox.style.display =
"flex";

image.src =
galleryData[currentIndex].image;

}

}

// =====================================
// CLOSE LIGHTBOX
// =====================================

function closeLightbox(){

const lightbox =
document.getElementById(
"lightbox"
);

if(lightbox){

lightbox.style.display =
"none";

}

}

// =====================================
// NEXT / PREVIOUS IMAGE
// =====================================

function changeImage(direction){

currentIndex += direction;

if(currentIndex < 0){

currentIndex =
galleryData.length - 1;

}

if(
currentIndex >=
galleryData.length
){

currentIndex = 0;

}

document
.getElementById(
"lightbox-img"
)
.src =
galleryData[currentIndex].image;

}

// =====================================
// DOWNLOAD IMAGE
// =====================================

function downloadImage(){

const a =
document.createElement(
"a"
);

a.href =
galleryData[currentIndex].image;

a.download =
galleryData[currentIndex].title;

document.body.appendChild(a);

a.click();

document.body.removeChild(a);

showToast(
"Download Started"
);

}

// =====================================
// SHARE IMAGE
// =====================================

async function shareImage(){

const image =
galleryData[currentIndex];

if(navigator.share){

try{

await navigator.share({

title:image.title,

text:
"Check this image: " +
image.title,

url:
window.location.href

});

showToast(
"Shared Successfully"
);

}
catch(error){

console.log(error);

}

}
else{

navigator.clipboard
.writeText(
window.location.href
);

showToast(
"Link Copied"
);

}

}

// =====================================
// FULLSCREEN
// =====================================

function fullscreen(){

const img =
document.getElementById(
"lightbox-img"
);

if(
img &&
img.requestFullscreen
){

img.requestFullscreen();

}

}

// =====================================
// KEYBOARD SUPPORT
// =====================================

document.addEventListener(
"keydown",
function(e){

const lightbox =
document.getElementById(
"lightbox"
);

if(
lightbox &&
lightbox.style.display ===
"flex"
){

if(
e.key ===
"ArrowRight"
){

changeImage(1);

}

if(
e.key ===
"ArrowLeft"
){

changeImage(-1);

}

if(
e.key ===
"Escape"
){

closeLightbox();

}

}

}
);

// =====================================
// DOUBLE CLICK CLOSE
// =====================================

window.addEventListener(
"load",
function(){

const lightbox =
document.getElementById(
"lightbox"
);

if(lightbox){

lightbox.addEventListener(
"dblclick",
closeLightbox
);

}

}
);

// =====================================
// AUTO SAVE
// =====================================

window.addEventListener(
"beforeunload",
function(){

saveGallery();

}
);

// =====================================
// INITIALIZE APP
// =====================================

window.addEventListener(
"DOMContentLoaded",
function(){

renderGallery();

updateStats();

showToast(
"Gallery Loaded Successfully"
);

}
);

