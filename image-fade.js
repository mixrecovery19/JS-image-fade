let fps = 20;

function fade(img, time, dir) {
    img = document.getElementById(img);
    let steps = time * fps;   

    let otype;
    if (typeof img.style.opacity != 'undefined') {
        otype = 'w3c';
    } else if (typeof img.style.MozOpacity != 'undefined') {
        otype = 'moz';
    } else if (typeof img.style.KhtmlOpacity != 'undefined') {
        otype = 'khtml';
    } else if (typeof img.filters == 'object') {
        otype = (img.filters.length > 0 && typeof img.filters.alpha == 'object'
        && typeof img.filters.alpha.opacity == 'number') ? 'ie' : 'none';
    } else { 
        otype = 'none'; 
    }

    if (otype != 'none') { 
        if (dir == 'out') { 
            dofade(steps, img, 1, false, otype); 
        } else { 
            dofade(steps, img, 0, true, otype); 
        }
    }
}
function dofade(steps, img, value, targetvisibility, otype) {
    value += (targetvisibility ? 1 : -1) / steps;
    if (targetvisibility ? value > 1 : value < 0) {
        value = targetvisibility ? 1 : 0;
    }

    setfade(img,value, otype);

        if (targetvisibility ? value < 1 : value > 0) {
        setTimeout(function() {
        dofade(steps, img, value, targetvisibility, otype);
        }, 1000 / fps);
    }

}
function setfade(img, value, otype) {
    switch(otype) {
        case 'ie': 
            img.filters.alpha.opacity = value * 100;
        break;

        case 'khtml':
            img.style.KhtmlOpacity = value;
            break;

        case 'moz':
            img.style.MozOpacity = (value == 1 ? 0.9999999 : value);
            break;

        default:
            img.style.opacity = (value == 1 ? 0.9999999 : value);
    }
};
function addLoadListener(fn) {
    if (window.addEventListener) {
        window.addEventListener('load', fn, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', fn);
    } else {
        window.onload = fn;
    }
}
addLoadListener(function() {
    fade('before', 5, 'out');
    fade('after', 5, 'in');
});