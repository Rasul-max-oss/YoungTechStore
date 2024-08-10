let offset = 0;
const sliderLine = document.querySelector('.slider-line');
const lineOne = document.querySelector('.lineOne');
const lineTwo = document.querySelector('.lineTwo');

let isLineOneActive = true;

document.querySelector('.slider-next').addEventListener('click', function(){
    isLineOneActive = !isLineOneActive;
    
    lineOne.style.background = isLineOneActive ? "#9EB4FF" : "#DBDBDB";
    lineTwo.style.background = isLineOneActive ? "#DBDBDB" : "#9EB4FF";

    offset = offset + 1050;
    if (offset > 1060) {
        offset = 0;
    }
    sliderLine.style.left = -offset + 'px';
});

document.querySelector('.slider-prev').addEventListener('click', function () {
    isLineOneActive = !isLineOneActive;

    lineOne.style.background = isLineOneActive ? "#9EB4FF" : "#DBDBDB";
    lineTwo.style.background = isLineOneActive ? "#DBDBDB" : "#9EB4FF";

    offset = offset - 1050;
    if (offset < 0) {
        offset = 1050;
    }
    sliderLine.style.left = -offset + 'px';
});



