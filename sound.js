var sound = new Howl({
    urls: ['scale-tone.wav'],
    sprite: {
        0: [0,250],
        1: [250,250],
        2: [500,250],
        3: [750,250],
        4: [1000,250],
        5: [1250,250],
        6: [1500,250],
        7: [1750,250]
    },
    buffer: true,
    onloaderror: function() { alert("Failed to load audio file 'scale.wav'");}
});

// Extra junk, delete me
var sound2 = new Howl({
    urls: ['scale-voice.wav'],
    sprite: {
        0: [0,250],
        1: [250,250],
        2: [750,250],
        3: [1250,250],
        4: [1750,250]
    },
    buffer: false,
    onloaderror: function() { alert("Failed to load audio file 'scale.wav'");}
});


