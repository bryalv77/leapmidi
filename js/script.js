var stars = {};
Leap.loop(function(frame) {
    frame.hands.forEach(function(hand, index) {
        var star = ( stars[index] || (stars[index] = new Star()) );    
        star.setTransform(hand.screenPosition(), hand.roll());    
    });
}).use('screenPosition', {scale: 0.25});
var Star = function() {
    var star = this;
    var img = document.createElement('img');
    img.src = 'img/star.jpg';
    img.style.position = 'absolute';
    img.onload = function () {
        star.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
        document.body.appendChild(img);
    }
    star.setTransform = function(position, rotation) {
        img.style.left = position[0] - img.width  / 2 + 'px';
        img.style.top  = position[1] - img.height / 2 + 'px';
        img.style.transform = 'rotate(' + -rotation + 'rad)';
        img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
        img.style.OTransform = img.style.transform;
    };
};
stars[0] = new Star();
// This allows us to move the star even whilst in an iFrame.
Leap.loopController.setBackground(true)