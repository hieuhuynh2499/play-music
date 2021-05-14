const listsong = [
    {
        id:1,
        name:"hoa nở không màu",
        singer:"hoài lâm",
        path:"./mp3/HoaNoKhongMau.mp3",
        image:"https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg"
    },
    {   
        id:2,
        name:"3107-2",
        singer:"dương",
        path:"./mp3/31072.mp3",
        image:"http://vanhienblog.info/wp-content/uploads/2019/02/anh-gai-xinh-dep-hot-girl-1-00.jpg"
    },
    {
        id:3,
        name:"kẹo bông gòn",
        singer:"rap việt",
        path:"./mp3/KeoBongGon.mp3",
        image:"https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i-ng%E1%BA%A7u.jpg"
    },
    {
        id:4,
        name:"laylalalay",
        singer:"j97",
        path:"./mp3/Laylalay-JackG5R.mp3",
        image:"https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg"
    },
    {
        id:5,
        name:"tình anh",
        singer:"đình dũng",
        path:"./mp3/TinhAnh-DinhDung.mp3",
        image:"https://img2.thuthuatphanmem.vn/uploads/2018/12/25/nhung-hinh-anh-gai-xinh-cuc-dep_012909400.jpg"
    },
    {
        id:6,
        name:"tình yêu màu hồng",
        singer:"sám",
        path:"./mp3/TinhYeuMauHong.mp3",
        image:"http://tapchianhdep.com/wp-content/uploads/2016/07/ngam-anh-hot-girl-xinh-dep-tren-facebook-1.jpg"
    },
];
const playlist = document.querySelector(".playlist");
const audioSong = document.getElementById("audio");
const player = document.getElementsByClassName("player")[0];
const btnPlay = document.getElementsByClassName("btn-toggle-play")[0]
const btnNext = document.getElementsByClassName("btn-next")[0]
const btnPrev = document.getElementsByClassName("btn-prev")[0]
const btnRandom = document.getElementsByClassName("btn-random")[0]
const progress = document.getElementById("progress");
const cdThumd = document.getElementsByClassName("cd-thumb")[0];
const btnRepeat = document.getElementsByClassName("btn-repeat")[0];
let indexCurrentSong = 0;
let randomSong = false;
let repeatSong = false;
function showListSong (listsong) {
    const RenderListSong =  listsong.map((song) => ` 
    <div class="song">
        <div class="thumb" style="background-image: url(${song.image})">
        </div>
        <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
        </div>
        <div class="option">
        <i class="fas fa-ellipsis-h"></i>
        </div>
    </div>`)
    playlist.innerHTML = RenderListSong.join('');
}
function handleEventScrollY (){
    const cd = document.getElementsByClassName("cd")[0];
    const cdwidth = cd.offsetWidth;
    document.onscroll = () =>{
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newWidth = cdwidth - scrollTop;
        cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
        cd.style.opacity = newWidth / cdwidth;
    }    
}
function getCurrentSong (){
    return listsong[indexCurrentSong];
}
function handleEvent () {
    handleEventScrollY();
}
function loadCurrentSong () {
    const songCurrent = getCurrentSong();
    const header = document.getElementsByTagName("header")[0];
    const imageSong = document.getElementsByClassName("cd-thumb")[0];
    header.getElementsByTagName("h2")[0].innerText = `${songCurrent.name}`
    header.getElementsByTagName("h5")[0].innerText = `${songCurrent.singer}`
    imageSong.style.backgroundImage = `url(${songCurrent.image})`;
    audioSong.src = songCurrent.path;

}
function start (){
    handleEvent ();
    loadCurrentSong ();
    showListSong(listsong);
    const songs = playlist.querySelectorAll(".song");
    console.log(songs);
    songs.forEach(song => {
        song.addEventListener("click",()=>{
            const nameSong =  song.getElementsByTagName("h3")[0].innerText
            const songClick =  listsong.filter((item) => item.name === nameSong);
            indexCurrentSong = songClick[0].id - 1;
            loadCurrentSong ();
            audioSong.play();
            player.classList.add("playing");
        })
    });
}
function randomIndexSong (){
    let indexRandomSong
    do{
        indexRandomSong = Math.floor(Math.random()*listsong.length);
    }while (indexRandomSong === indexCurrentSong)
    indexCurrentSong = indexRandomSong
    loadCurrentSong ();
    audioSong.play();
}
btnPlay.addEventListener("click", ()=>{
    if(player.classList.contains("playing")){
        audioSong.pause();
    }
    else{
        audioSong.play();
    }
})
audioSong.onplay = function () {
    player.classList.add("playing");
    cdrotate.play();
}
audioSong.onpause = function () {
    player.classList.remove("playing");
    cdrotate.pause();
}
btnNext.addEventListener("click", ()=>{
    if(randomSong){
        randomIndexSong();
    }else{
        indexCurrentSong ++;
        if(indexCurrentSong > listsong.length - 1){
            indexCurrentSong = 0;
        }
        loadCurrentSong ();
        audioSong.play();
        player.classList.add("playing");
    }
})
btnPrev.addEventListener("click", ()=>{
    indexCurrentSong --;
    if(indexCurrentSong < 0){
        indexCurrentSong = listsong.length - 1;
    }
    loadCurrentSong ();
    audioSong.play();
    player.classList.add("playing");
})
audioSong.ontimeupdate = function () {
    if(audioSong.duration) {
        const progressPercent = Math.floor(audioSong.currentTime / audioSong.duration * 100)
        progress.value = progressPercent;
    }
}
progress.onchange = function (e) {
    const timeCurrentSong = audioSong.duration / 100 * e.target.value ;
    audioSong.currentTime = timeCurrentSong;
}
const cdrotate = cdThumd.animate([
    {transform: 'rotate(360deg)'}
],{
    duration:10000,
    iterations:Infinity
})
cdrotate.pause();

btnRandom.onclick = function () {
    btnRandom.classList.toggle("active");
    randomSong = !randomSong;
}
btnRepeat.onclick = function () {
    repeatSong = !repeatSong;
    btnRepeat.classList.toggle("active");
}
audioSong.onended = function () {
    if(repeatSong){
        loadCurrentSong ();
        audioSong.play();
        player.classList.add("playing");
    }else{
        btnNext.click();
    }
}
start();