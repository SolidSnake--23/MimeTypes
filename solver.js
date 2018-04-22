module.exports = function (readline, print) {
    var N = parseInt(readline()); // Number of elements which make up the association table.
    var Q = parseInt(readline()); // Number Q of file names to be analyzed.
    const mimeTypesDictionnary = {};
    for (var i = 0; i < N; i++) {
        var inputs = readline().split(' ');
        var EXT = inputs[0]; // file extension
        var MT = inputs[1]; // MIME type.
        mimeTypesDictionnary[EXT.toUpperCase()] = MT;
    }
    for (var i = 0; i < Q; i++) {
        var FNAME = readline().split('.'); // One file name per line.
        const ext = FNAME[FNAME.length -1].toUpperCase();
        print(FNAME.length > 1 ? mimeTypesDictionnary[ext] || 'UNKNOWN' : 'UNKNOWN');
    }
};
