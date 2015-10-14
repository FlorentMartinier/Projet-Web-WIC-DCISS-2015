//// comparaison d'array
//Array.prototype.equals = function (array) {
//
//    if (this.length != array.length)
//        return false;
//
//    for (var i = 0, l=this.length; i < l; i++) {
//
//        // Check if we have nested arrays
//        if ((this[i] instanceof Array && array[i] instanceof Array) || (this[i] instanceof Track && array[i] instanceof Track))  {
//            // recurse into the nested arrays
//            if (!this[i].equals(array[i]))
//                return false;
//        }
//        else if (this[i] != array[i]) {
//            // Warning - two different object instances will never be equal: {x:20} != {x:20}
//            return false;
//        }
//
//    }
//
//    return true;
//
//}

function arePropTracksEqual(propTrack1, propTrack2) {

    var areEqual = true;

    if (propTrack1 == null || propTrack2 == null) return false;
    if (propTrack1.length != propTrack2.length) return false;

    for (var i = 0; i < propTrack1.length && areEqual; i++) {

        areEqual = (propTrack1[i].id == propTrack2[i].id && propTrack1[i].nbVotes == propTrack2[i].nbVotes);

    }

    return areEqual;

}