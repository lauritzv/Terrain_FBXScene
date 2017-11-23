/*
this class loops trough and returns a number of colours.

Right now it only changes between these two:

pink-ish:
efa3a5
239, 163, 165

yellow-ish:
e8b78f
232, 183, 143

cyan-ish:
82a3a5
*/
class ColorLooper{

    constructor(clock){
        this.color_r = 239;
        this.color_g = 163;
        this.color_b = 165;

        //time in seconds before it changes
        this.TIME_BEFORE_CHANGE = 0.2;

        this.color_mode = 0;

        this.clock = clock;
        this.elapsed = 0;
    }

    /**
     * gets the next colour for the fog
     * @returns {Color|*}
     */
    getNextColor()
    {
        "use strict";

        switch (this.color_mode){
            case 0:
                if(this.hasEnoughTimePassed()){
                    this.color_g++;
                    this.color_b--;
                }
                if(this.color_g > 179){
                    this.color_mode = 1;
                }
                break;

            case 1:
                if(this.hasEnoughTimePassed()){
                    this.color_g--;
                    this.color_b++;
                }
                if(this.color_g < 149){
                    this.color_mode = 0;
                }
                break;

            default:
                this.color_mode = 0;
                break;
        }

        let asString = "#" + this.color_r.toString(16) + this.color_g.toString(16) + this.color_b.toString(16);
        let color = new THREE.Color(asString);
        return color;
    }

    /**
     * @returns whether enough time has passed for a change or not
     */
    hasEnoughTimePassed()
    {
        if (this.clock.elapsedTime > (this.elapsed + this.TIME_BEFORE_CHANGE)){
            this.elapsed = clock.elapsedTime;
            return true;
        }else{
            return false;
        }
    }



    /**
     * sets the time before it changes the colour in pixels
     * @param seconds
     */
    setChangeSpeed(seconds)
    {
        this.TIME_BEFORE_CHANGE = seconds;
    }
}