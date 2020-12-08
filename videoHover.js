var videos = document.getElementsByClassName('mediaContainer');

window.onload = function(e) {

    console.log(videos);

    for (var i = 0; i < videos.length; i++) {
        function playClip() {
            this.getElementsByTagName('video')[0].play();
        }
        
        function stopClip() {
            this.getElementsByTagName('video')[0].pause();
            this.getElementsByTagName('video')[0].currentTime = 0;
        }

        videos[i].addEventListener('mouseover', playClip, false);
        videos[i].addEventListener('mouseout', stopClip, false);
    }
};
