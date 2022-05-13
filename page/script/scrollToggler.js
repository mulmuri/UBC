function scrollToCard(num) {
    console.log(num);
    setTimeout(function() {
        window.scrollTo({
            left: 0,
            top: 84 + num * 82,
            behavior: "smooth"
        })
    }, 100);
}







// 버튼을 클릭했을 때, 창을 로드했을 때 동작하는 함수
