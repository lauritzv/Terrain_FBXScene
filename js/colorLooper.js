/*
pink-ish:
efa3a5
*/
let color_r = 239;
let color_g = 163;
let color_b = 165;

const PROBABILITY_OF_CHANGE = 0.15;

let color_mode = 0;

function getNextColor()
{
    switch (color_mode){
        case 0:
            if(Math.random() < PROBABILITY_OF_CHANGE){
                color_r++;
            }
            if(color_r > 240){
                color_mode = 1;
            }
            break;

        case 1:
            if(Math.random() < PROBABILITY_OF_CHANGE){
                color_r--;
            }
            if(color_r < 130){
                color_mode = 0;
            }
            break;

        default:
            color_mode = 0;
            break;
    }

    let asString = "#" + color_r.toString(16) + color_g.toString(16) + color_b.toString(16);
    let color = new THREE.Color(asString);
    return color;
}