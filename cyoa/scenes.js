var start = {
//backslashes escape newlines
    text:"Your [bedroom](phone) alarm is ringing."
}

loadScene(start)

var bedroom = {
    onLoad: function() {
        console.log("benis")
    },
    text:"You're lying in bed, staring at your phone again. You're \
    [kitchen](hungry), but you need to [bathroom](pee)."
}

var kitchen = {
    text: "There's nothing in the kitchen. You consider getting back in \
    [bedroom](bed)."
}

var bathroom = {
    text:"The toilet needs cleaning before you can use it. You \
    realize you kinda just want to get back in [bedroom](bed)."
}
