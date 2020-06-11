var methods = {
    shuffle : function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },

    getFibonnaciNumber: function(num){
        if(num == 1 || num == 2) return 1;
        var a = 0;
        var b = 1;
        c = a + b;
        for(var i=0; i<(num-2); i++){
            a = b;
            b = c;
            c = a + b;
        }
        return c;
    }
}

exports.data = methods;