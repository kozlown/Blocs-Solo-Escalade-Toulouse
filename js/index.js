var secteurs;
var localisationSVG = "";
var nbSecteurs;
$(document).ready(function(){
    // inclusion svg map
    $.get({
        url:"./dist/salle.svg",
        async: false
    },function (data){
        document.getElementById("svgContainer").appendChild(data.documentElement);
    })

    // récupération svg localisation
    $.get({
        url: "./dist/images/localisation.svg",
        async: false
    },function(data){
        localisationSVG = data.documentElement;
    });

    // json des secteurs
    secteurs = {
        1 : {
            nom: "La rame",
            blocs: [
                {
                    color: "red",
                    description: "Talon et contrepointe au départ",
                    start: "left",
                    end: "middle",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "purple",
                    description: "",
                    start: "right",
                    end: "left",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "green",
                    description: "",
                    start: "middle",
                    end: "left",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "blue",
                    description: "Départ tête en bas",
                    start: "left",
                    end: "right",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "orange",
                    description: "",
                    start: "right",
                    end: "middle",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "blue",
                    description: "",
                    start: "middle",
                    end: "middle",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                }
            ]
        },
        2 : {
            nom: "",
            blocs: [
                {
                    color: "orange",
                    description: "",
                    start: "right",
                    end: "middle",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "black",
                    description: "",
                    start: "left",
                    end: "middle",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "blue",
                    description: "",
                    start: "middle",
                    end: "middle",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                }
            ]
        },
        3 : {
            nom: "",
            blocs: [
                {
                    color: "red",
                    description: "",
                    start: "left",
                    end: "middle",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "green",
                    description: "",
                    start: "middle",
                    end: "left",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "blue",
                    description: "Départ tête en bas",
                    start: "left",
                    end: "right",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "green",
                    description: "",
                    start: "middle",
                    end: "left",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
            ]
        },
        4 : {
            nom: "",
            blocs: [
                {
                    color: "green",
                    description: "",
                    start: "middle",
                    end: "left",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "blue",
                    description: "Départ tête en bas",
                    start: "left",
                    end: "right",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "orange",
                    description: "",
                    start: "right",
                    end: "middle",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                },
                {
                    color: "black",
                    description: "",
                    start: "left",
                    end: "middle",
                    video: "https://www.youtube.com/watch?v=lIXK_753icg"
                }
            ]
        }
    };
    nbSecteurs = Object.keys(secteurs).length;
    for(var x = 1;x<=nbSecteurs; x++) {
        (function(n){
            $("#detectorSecteur"+n).addClass("detector");
            $("#detectorSecteur"+n).css("cursor","pointer");
            $("#secteur"+n).css("opacity","0");
            $("#legendSecteur"+n).css("opacity","0");

            // gestion des évênements
            $("#detectorSecteur"+n).on("mouseover", function (event) {
                $("#secteur"+n).fadeTo("fast", 1);
                $("#legendSecteur"+n).fadeTo("fast", 1);
            })
            $("#detectorSecteur"+n).on("mouseout", function (event) {
                if (!$(this).hasClass("selected")) {
                    $("#legendSecteur"+n).fadeTo("fast", 0);
                    $("#secteur"+n).fadeTo("fast", 0);
                }
            })
            var secteur =  jQuery.extend(true, {}, secteurs[n]);
            $("#detectorSecteur"+n).on("click", function () {
                console.log(secteur.blocs.length);
                $(".selected").removeClass("selected"); // L'ancien selectionné n'a plus la classe "selected"
                $(this).addClass("selected"); // Le nouveau selectionné a la classe "selected"
                $(".detector").trigger("mouseout"); // Tout les secteurs deviennent invisibles sauf celui qui est selectionné
                $(this).trigger("mouseover"); // Le secteur sélectionné devient visible
                var html = "";
                var localLocalisationSVG = localisationSVG;
                for (var i = 0; i < secteurs[n].blocs.length; i++) {
                    localLocalisationSVG.setAttribute("id", `localisation${i}`);
                    html += `<tr>`;
                    html += `<td><img src="./dist/images/cercles/cercle${secteurs[n].blocs[i].color}.svg" alt=""></td>`;
                    html += `<td>${localLocalisationSVG.outerHTML}</td>`;
                    html += `<td>${secteurs[n].blocs[i].description}</td>`;
                    html += `<td><a class="youtube" href="${secteurs[n].blocs[i].video}"><img class="play-button" height="100px" src="./dist/images/video-play-button.png" alt="play-button"></a></td>`;
                    html += `</tr>`;
                }
                $(`#blocs tbody`).html(html);
                $(function () {
                    $(".youtube").YouTubeModal({autoplay: 1, width: 640, height: 480});
                });

                // Set localisation
                for (var i = 0; i < secteurs[n].blocs.length; i++) {
                    switch (secteurs[n].blocs[i].start) {
                        case "left":
                            $(`#localisation${i} #startLeft`).css("display", "block");
                            break;
                        case "middle":
                            $(`#localisation${i} #startMiddle`).css("display", "block");
                            break;
                        case "right":
                            $(`#localisation${i} #startRight`).css("display", "block");
                            break;
                    }
                    switch (secteurs[n].blocs[i].end) {
                        case "left":
                            $(`#localisation${i} #endLeft`).css("display", "block");
                            break;
                        case "middle":
                            $(`#localisation${i} #endMiddle`).css("display", "block");
                            break;
                        case "right":
                            $(`#localisation${i} #endRight`).css("display", "block");
                            break;
                    }
                }
            })
        })(x);
    }
    $(`#detectorSecteur1`).click();
})