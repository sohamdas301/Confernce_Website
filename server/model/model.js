const mongoose = require('mongoose');
var gallerySchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    caption: {
        type: String
    }
});
const gallery = mongoose.model('gallery', gallerySchema);

var speakerSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    speakername: {
        type: String
    },
    speakerdesc: {
        type: String
    }
});
const speaker = mongoose.model('speaker', speakerSchema);

var sponsorSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    sponsorname: {
        type: String
    }
});
const sponsor = mongoose.model('sponsor', sponsorSchema);


var cheifpatronSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const cheifpatron = mongoose.model('cheifpatron', cheifpatronSchema);

var patronSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const patron = mongoose.model('patron', patronSchema);

var internatadSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const internatad = mongoose.model('internatad', internatadSchema);


var naadcomSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const naadcom = mongoose.model('naadcom', naadcomSchema);

var genchaSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const gencha = mongoose.model('gencha', genchaSchema);

var gencochairSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const gencochair = mongoose.model('gencochair', gencochairSchema);

var conchairSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const conchair = mongoose.model('conchair', conchairSchema);

var fichaSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const ficha = mongoose.model('ficha', fichaSchema);

var teprochSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const teproch = mongoose.model('teproch', teprochSchema);

var orgchSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const orgch = mongoose.model('orgch', orgchSchema);

var pubchSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const pubch = mongoose.model('pubch', pubchSchema);

var publichSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const publich = mongoose.model('publich', publichSchema);



var sponchSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String
    }
});
const sponch = mongoose.model('sponch', sponchSchema);



var confschema = new mongoose.Schema({
    landingpage: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    fromdate: {
        type: String,
        required: true
    },
    todate: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    days: {
        day: [Number],
        time: [String],
        eventname: [String],
        eventdesc: [String],
        paperlink: [String]
    },
    speaker: [speakerSchema],
    sponsor: [sponsorSchema],
    url: String,
    gallery: [gallerySchema],
    cheifpatron: [cheifpatronSchema],
    patron: [patronSchema],
    internatad: [internatadSchema],
    naadcom: [naadcomSchema],
    gencha: [genchaSchema],
    gencochair: [gencochairSchema],
    conchair: [conchairSchema],
    ficha: [fichaSchema],
    teproch: [teprochSchema],
    orgch: [orgchSchema],
    pubch: [pubchSchema],
    publich: [publichSchema],
    sponch: [sponchSchema],
    tracks: {
        trackno: [Number],
        trackname: [String],
        sessionname: [String]
    },
    announce:[String]
});



const conferencedb = mongoose.model('conferencedb', confschema);


module.exports = {conferencedb,gallery,speaker,sponsor,cheifpatron,patron,internatad,naadcom,gencha,gencochair,conchair,ficha,teproch,orgch,pubch,publich,sponch};