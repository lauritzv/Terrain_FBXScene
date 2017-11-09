/*
this class loops trough and returns a number of colours.

Right now it only changes between these two:

pink-ish:
efa3a5

cyan-ish:
82a3a5
*/
class ColorLooper{

    constructor(clock){
        this.color_r = 239;
        this.color_g = 163;
        this.color_b = 165;

        //time in seconds before it changes
        this.TIME_BEFORE_CHANGE = 0.1;

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
                    this.color_r++;
                }
                if(this.color_r > 240){
                    this.color_mode = 1;
                }
                break;

            case 1:
                if(this.hasEnoughTimePassed()){
                    this.color_r--;
                }
                if(this.color_r < 130){
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