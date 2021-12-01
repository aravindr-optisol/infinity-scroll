const imageContainer = document.getElementById("image-container")
const loader = document.getElementById('loader')

let ready=false;
let imagesLoaded=0;
let totalImages=0;
// unspalsh API
const count = 5;
const apiKey = "PCJYcybuuf1DeZFldM3SAmdICfCBK6rtFmqsxtPxqfM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// check if all images where loaded
function imageLoaded(){    
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        console.log('ready=',ready)
        loader.hidden=true
        count = 5;
    }
}

// helper function to set attributes on DOM Elements
const setAttribute=(element,attribute)=>{
    for(const key in attribute){
        element.setAttribute(key,attribute[key]);
    }
}

function displayPhotos(photoArray){
    imagesLoaded = 0;
    totalImages=photoArray.length
    photoArray.forEach((photo) => {
        const item = document.createElement('a')
        const img = document.createElement('img')
        // Create <a> to link to Unsplash
        setAttribute(item,{
            href:photo.links.html,
            target:'_blank'
        })
        // Create <img> for phot
        setAttribute(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })
        // event Listner, check when each is finished 
        img.addEventListener('load',imageLoaded)
        // put <img> inside <a>, then put both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        let photoArray = await response.json();
        displayPhotos(photoArray);
    } catch (error) {
        // Catch Error Here
    }
}
// add event listner on scroll
window.addEventListener('scroll',()=>{
    // if(window.innerHeight)
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos()
        // console.log("window.innerHeight",window.innerHeight);
        // console.log("window.scrollY",window.scrollY);
        // console.log("document.body.offsetHeight - 1000)",document.body.offsetHeight - 1000);

    }
})
// On Load
getPhotos();