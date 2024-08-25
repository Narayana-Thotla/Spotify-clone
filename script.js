console.log("let's go");

var currentSong = new Audio;
var songLinkOut=[];
var currentSongindi;
var currFolder;


async function getsongs(folder) {
  let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`songs/${folder}/`)[1]);
    }
  }

//--------------------------------------------------
let aL = await fetch(`http://127.0.0.1:3000/songs/${folder}/`);
let responseL = await aL.text();
let divL = document.createElement("div");
divL.innerHTML = responseL;
let asL = div.getElementsByTagName("a");

let songLink= [];

for (let index = 0; index < asL.length; index++) {
  const element = asL[index];
  if (element.href.endsWith(".mp3")) {
    songLink.push(element.href)
  }
}
songLinkOut=songLink;

//--------------------------------------------------
  let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
  songul.innerHTML = "";

  for (const sg of songs) {
    songul.innerHTML = songul.innerHTML + `<li>  <img class="invert" src="svgs/music.svg" alt="" />
                  <div class="songname">${sg.replaceAll("%20", " ")}</div>
                  <div><img class="invert" src="svgs/play.svg" alt="" /></div>
                  </li>`;
  }


  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    
    e.addEventListener("click", element=>{
      
      playMusic(e.querySelector(".songname").innerHTML,songLink,`${folder}`);
      currentSongindi = getMusicIndex(e.querySelector(".songname").innerHTML,songLink,`${folder}`);
      
 
    })

  });
  


}


//----------------------------------------------

function getOtherNumbers(array, selectedNumber) {
  return  array
  .map((number, index) => (number !== selectedNumber ? index : null))
  .filter(index => index !== null);
}

//--------------------------------------------------

const playMusic =(trackname,songLink,currFolder)=>{

  let musicindi = getMusicIndex(trackname,songLink,currFolder)
  let songinfo = document.querySelector(".songinfo");
  songinfo.innerHTML=trackname;
  
  currentSong.src = songLink[musicindi];
  currentSong.play();
  play.src = "svgs/pause.svg";

let y =[] 
Array.from(document.querySelector(".songlist").getElementsByTagName('li')).forEach(e=>{ 
  y.push(e.innerText)
})
let g=getOtherNumbers(y,y[musicindi])

  document.querySelector(".songlist").getElementsByTagName('li')[musicindi].style.transform = "scale(1.1)"


for (const iterator of g) {

    document.querySelector(".songlist").getElementsByTagName('li')[iterator].style.transform="scale(1)"
  
  }
 
 
}
//---------------------------------------------

const playMusicNext =(songLinkOut,currentSongindi,currFolder)=>{

  let link = songLinkOut[currentSongindi].split(`/songs/${currFolder}/`)[1].replaceAll("%20", " ");  
  let songinfo = document.querySelector(".songinfo");
  songinfo.innerHTML=link;
  
  currentSong.src = songLinkOut[currentSongindi];
  currentSong.play();
  play.src = "svgs/pause.svg";
 
// console.log(currentSongindi);

let y =[] 
Array.from(document.querySelector(".songlist").getElementsByTagName('li')).forEach(e=>{ 
  y.push(e.innerText)
})
let g=getOtherNumbers(y,y[currentSongindi])

  document.querySelector(".songlist").getElementsByTagName('li')[currentSongindi].style.transform = "scale(1.1)"


for (const iterator of g) {
 
    document.querySelector(".songlist").getElementsByTagName('li')[iterator].style.transform="scale(1)"
  
  }

  
}
//----------------------------------------------

const playMusicprev =(songLink,currentSongindi,currFolder)=>{
  
  let link = songLink[currentSongindi].split(`/songs/${currFolder}/`)[1].replaceAll("%20", " ");  
  let songinfo = document.querySelector(".songinfo");
  // console.log(songinfo);
  songinfo.innerHTML=link;

  currentSong.src = songLink[currentSongindi];
  currentSong.play();
  play.src = "svgs/pause.svg";

  let y =[] 
Array.from(document.querySelector(".songlist").getElementsByTagName('li')).forEach(e=>{ 
  y.push(e.innerText)
})
let g=getOtherNumbers(y,y[currentSongindi])

  document.querySelector(".songlist").getElementsByTagName('li')[currentSongindi].style.transform = "scale(1.1)"


for (const iterator of g) {
 
    document.querySelector(".songlist").getElementsByTagName('li')[iterator].style.transform="scale(1)"
  
  }
  
}

//--------------------------------------------

const getMusicIndex = (musicName,songLink,currFolder)=>{
 let indi;

  for (let index = 0; index < songLink.length; index++) {
    const element = songLink[index];
    if (musicName == element.split(`songs/${currFolder}/`)[1].replaceAll("%20", " ")) {
       indi = index
    }
    
  }

  return indi;
}

//----------------------------------------------

function formatTime(seconds) {
  seconds = Math.floor(seconds);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}


//------------------------------------------------

async function main() {

  let currFolder = "ncr"

  play.addEventListener("click",()=>{
    if(currentSong.paused){
      currentSong.play();
      play.src = "svgs/pause.svg";
      
    }
    else{
      currentSong.pause()
      play.src="svgs/play.svg"
      
    }
  })

  next.addEventListener("click",()=>{
    
    currentSongindi = currentSongindi+1;

    if (currentSongindi>=songLinkOut.length) {
      currentSongindi = 0;
      
    }
    
    playMusicNext(songLinkOut,currentSongindi,currFolder);
  })

  prev.addEventListener("click",()=>{

    currentSongindi = currentSongindi-1;

    if (currentSongindi < 0) {
      currentSongindi = songLinkOut.length-1;
      
    }
    playMusicprev(songLinkOut,currentSongindi,currFolder);
  })


  currentSong.addEventListener("timeupdate",()=>{

    document.querySelector(".songtime").innerHTML=`${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) *100 +"%";
  })
  
  document.querySelector(".seekbar").addEventListener("click",(e)=>{
    let percent = e.offsetX/e.target.getBoundingClientRect().width *100;
    document.querySelector(".circle").style.left = percent  +"%";
    currentSong.currentTime = currentSong.duration * percent /100;
    
  })


  document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left = "0%";
  })

  document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left = "-110%";
  })
 

//------------------------------------------

Array.from(document.getElementsByClassName("card")).forEach(element => {
  element.addEventListener("click",async (e)=>{
    let songs = await getsongs(`${e.currentTarget.dataset.folder}`);
    
  })

});
Array.from(document.getElementsByClassName("card")).forEach(element => {
  element.addEventListener("click",async (e)=>{
    currFolder=e.currentTarget.dataset.folder
    // console.log(currFolder);
    if (!songLinkOut.includes(currentSong)) {
      currentSong.pause();
      
    }
    if (window.innerWidth < 500) {
      document.querySelector(".left").style.left = '0%'; // Change to desired color
  } else {
      // document.body.style.backgroundColor = ''; 
  }

    
  })

});

document.querySelector(".volume").getElementsByTagName('input')[0].addEventListener("change",(e)=>{

  currentSong.volume = parseInt(e.target.value)/100;
  
})

document.querySelector(".vol").addEventListener("click",(e)=>{
if(e.target.src.includes("svgs/vol.svg")){

  e.target.src=e.target.src.replace("svgs/vol.svg","svgs/mute.svg")
  currentSong.volume=0;
  document.querySelector(".volume").getElementsByTagName('input')[0].value=0;
}
else{
  
  e.target.src=e.target.src.replace("svgs/mute.svg","svgs/vol.svg")
  currentSong.volume=20/100;
  document.querySelector(".volume").getElementsByTagName('input')[0].value=20;
}
  
})

Array.from(document.querySelector(".songlist").getElementsByClassName("songname"))  // do work here
 

}


main();
