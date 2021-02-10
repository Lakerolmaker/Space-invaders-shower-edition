//: Detta är en javascript fil som innehåller bra och användbara functioner.


//: En funktion som ritar fyrkanter med rundade hörn
//: skapad av : Juan Mendes (Jul 30 kl: (1:14) )
function roundRect(ctx, x, y, width, height, radius, fill, stroke, R, G, B, A) {
    if (typeof stroke == 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {
            tl: radius,
            tr: radius,
            br: radius,
            bl: radius
        };
    } else {
        var defaultRadius = {
            tl: 0,
            tr: 0,
            br: 0,
            bl: 0
        };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    } 
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {

        ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + A + ")";

        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}

var fadeoutobjects = []

function Fade(name, oppacity, blink, time) {


    this.name = name;
    this.oppacity = oppacity;
    this.blink = blink;
    this.time = time;


}


//: En funktion som gör en fadeout effekt
function fadeOut(text, X, Y, Size, R, G, B, fadeout, time, startfade) {

    if (fadeoutobjects.length == 0) {

        //: Om startfade inte är definerad definaras den
        if (startfade == undefined) {
            startfade = 0
        }

        fadeoutobjects.push(new Fade(text, startfade, 0, time))

    }


    //: En varibel som håller vilken position som fadeoBjektetet ligger i.
    var arrayPosition = 0


    for (var i = 0; i < fadeoutobjects.length; i++) {


        //: Kollar om texten redan har använts av funktionens
        if (fadeoutobjects[i].name == text) {

            arrayPosition = i
            i = fadeoutobjects.length
          

        }

            //:Kollar om det är sista objektet i arrajn och om det sista objetet har samma namn som parametern.
        if ((i + 1 == fadeoutobjects.length) && (fadeoutobjects[i].name !== text)) {

            //: Om startfade inte är definerad definaras den
            if (startfade == undefined) {
                startfade = 0
            }

            fadeoutobjects.push(new Fade(text, startfade, 0, time))

            arrayPosition = (fadeoutobjects.length - 1)

        }
        
        

    }




    //: definerar tiden mellan fade om tiden mellan fade är odefinerad
    if (time == undefined) {

        fadeoutobjects[arrayPosition].time = 0.004

    } else {

        fadeoutobjects[arrayPosition].time = time

    }



    //: Om ingen färg har definerats bestämms en standard färg.
    if (R == undefined) {

        ctx.fillStyle = "rgba(81, 176,239, " + fadeoutobjects[arrayPosition].oppacity + ")";
    } else {

        ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + fadeoutobjects[arrayPosition].oppacity + ")";
    }


    //: ställer in storleken på texten
    ctx.font = " bold " + Size + "pt bleedfont";

    //: Ritar ut texten
    ctx.fillText(text, X, Y);

    //: Sänker oppaciteten med 0.005 så att textem blir genomskilig sedan ökas den med 0.005 så att den blir synlig osså vidare.
    if (fadeout == true || fadeout == undefined) {

        if (fadeoutobjects[arrayPosition].oppacity <= 0) {
            fadeoutobjects[arrayPosition].blink = 2
        }

        if (fadeoutobjects[arrayPosition].oppacity >= 1) {
            fadeoutobjects[arrayPosition].blink = 1
        }

        if (fadeoutobjects[arrayPosition].blink == 1) {
            fadeoutobjects[arrayPosition].oppacity = fadeoutobjects[arrayPosition].oppacity - fadeoutobjects[arrayPosition].time
        }

        if (fadeoutobjects[arrayPosition].blink == 2) {
            fadeoutobjects[arrayPosition].oppacity += fadeoutobjects[arrayPosition].time
        }

    }

    if ((fadeout == false)) {
        fadeoutobjects[arrayPosition].oppacity += fadeoutobjects[arrayPosition].time

    }


}

//: en function som kollar om något är en string eller ett number
function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

//: Crahsar chrome
function crash() {

    txt = "a";
    while (true) {
        txt = txt += "a"; //lägger til så mycket som webläsaren kan hantera
    }

}

//: Ritar ut bilder med runda hörn
function roundedImage(ctx, x, y, width, height, radius, img) {

    ctx.save()

    //: Ritar en rektangel som bilden kommer ritas innom
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    //: Gör så att den kommade bilden  ritas innanför rektangeln 
    ctx.clip();

    //: Ritar ut bilden
    ctx.drawImage(img, x, y, width, height);
    ctx.restore();


}