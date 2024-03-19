const audio = new Audio("../sounds/sound.mp3"),
  buttonF = document.querySelectorAll(".fire_button");

buttonF.forEach(btn => {
  btn.addEventListener("click", () => {
    audio.play();
    document.querySelector(".block").classList.add("transparent");
    document.querySelector(".legend").classList.add("active");
    document.querySelector(".text_frt").classList.add("text_add");
    document.querySelector(".text_bf").classList.add("text_an");
    document.querySelector(".blur").classList.add("blur_bg");
    document.querySelector(".link").classList.add("rest");
    document.querySelector(".here").classList.add("deleted");
  });
});


function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('element-show');
    }
  });
}

let options = {
  threshold: [0.5]
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for (let elm of elements) {
  observer.observe(elm);
}


