/**
 * all moving Object Attribute
 */

define(function(){
    var allMovingObject = {};

    allMovingObject = {

        /** player default Attribute **/
        player : {
            Size :　108,
            move : true,
            Speed : 2000/this.Size,
            Direction : "TOP",
            x : "center",
            y : "center",
            Score : {
                Enterprising_Spirit : 0,
                Dance_Skills : 0,
                Extra_Bonus : 0,
            },
            UseTime : 0,
        },

        /** enemy default Attribute **/
        enemy : {
            score : 10,
            Size : 50,
            Speed : 0,
            Move: false,
            Direction : "TOP"
        },

        /** computer default Attribute  **/
        computer : {
            Size :　108,
            move : true,
            Speed : 2000/this.Size,
            Direction : "TOP",
            x : "center",
            y : "center",
            Score : {
                Enterprising_Spirit : 0,
                Dance_Skills : 0,
                Extra_Bonus : 0,
            },
            UseTime : 0,
        }
    }

    return allMovingObject;
});