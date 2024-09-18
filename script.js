// création d'un Puissance 4

//importer ma grille et mon body pour y faire des changement plus tard

let body = document.getElementById('body')
let grille = document.getElementById('grille')

// importer le bouton restart

let restart = document.getElementById('restart')


//crée une variable pour le css

let blanc = false


// importer mes différente colonne et les transformer en liste de boutons

const colone1 = Array.from(document.querySelectorAll('#col1 button'))
const colone2 = Array.from(document.querySelectorAll('#col2 button'))
const colone3 = Array.from(document.querySelectorAll('#col3 button'))
const colone4 = Array.from(document.querySelectorAll('#col4 button'))
const colone5 = Array.from(document.querySelectorAll('#col5 button'))
const colone6 = Array.from(document.querySelectorAll('#col6 button'))
const colone7 = Array.from(document.querySelectorAll('#col7 button'))

//importer la balise et le compteur qui défini a qui est le tour de jouer
let player = document.getElementById('joueur')
let joueur = document.getElementById('color')
joueur.innerText = "Rouge"
let compteur = 0
let vic = 0

//crée une liste de mes colonnes

const jeu = [colone1, colone2, colone3, colone4, colone5, colone6, colone7]

// rendre les bouton inactif pendant un certain temps pour pas pouvoir spamer les clicks

function inactif() {
    jeu.forEach(colone => {
        colone.forEach(bouton => {
            bouton.disabled = true
            setTimeout(() => {
                bouton.disabled = false
            }, 250)
        })
    })
}
// appliquer un effet de gravité sur les boutons

function gravité(colonne, index = 0) {
    if (index >= colonne.length - 1) {
        return
    }

    const colonactu = colonne[index]
    const colonext = colonne[index + 1]

    if (colonactu.innerHTML === "  " && colonext.innerHTML === "") {
        colonactu.innerHTML = ""
        colonext.innerHTML = "  "
        colonactu.classList.remove('rouge', 'jaune')

        colonext.classList.remove('coloneblanche')
        colonext.classList.add('rouge')

        if (blanc) {
            colonactu.classList.add('coloneblanche')
        }
   
        grille.classList.remove('ombrerouge')
        grille.classList.add('ombrejaune')

    } else if (colonactu.innerHTML === "   " && colonext.innerHTML === "") {
        colonactu.innerHTML = ""
        colonext.innerHTML = "   "
        colonactu.classList.remove('rouge', 'jaune')

        if (blanc) {
            colonactu.classList.add('coloneblanche')
        }
        colonext.classList.remove('coloneblanche')
        colonext.classList.add('jaune')
       
        grille.classList.remove('ombrejaune')
        grille.classList.add('ombrerouge')

    }


    // mettre un delais entre chaque changement de position des boutons pour qu'on ai l'impression que les boutons tombe

    setTimeout(() => {
        gravité(colonne, index + 1)
    }, 60)

}

// fonction pour appliquer des choses quand le joueur rouge a gagner

function rougewin() {
    player.innerText = ""
    joueur.innerText = "Rouge a gagné"
    joueur.classList.remove('textjaune')
    joueur.classList.add('textrouge')
    vic = 1
    grille.classList.remove('ombrerouge')
    grille.classList.remove('ombrejaune')
    grille.classList.add('grillerouge')
    jeu.forEach(colone => {
        colone.forEach(bouton => {
            bouton.classList.remove('lignehaut')
            bouton.disabled = true
            bouton.innerHTML = " "
            bouton.classList.remove('coloneblanche')
            if (!bouton.classList.contains('rouge') && !bouton.classList.contains('jaune')) {
                bouton.classList.add('boutonrouge')
            }
        })
    })
}
// fonction pour appliquer des choses quand le joueur jaune a gagner

function jaunewin() {


    player.innerText = ""
    joueur.classList.remove('textrouge')
    joueur.classList.add('textjaune')

    joueur.innerText = "Jaune a gagné"
    vic = 1
    grille.classList.remove('ombrerouge')
    grille.classList.remove('ombrejaune')
    grille.classList.add('grillejaune')
    jeu.forEach(colone => {
        colone.forEach(bouton => {
            bouton.disabled = true
            bouton.innerHTML = " "
            bouton.classList.remove('coloneblanche')
            if (!bouton.classList.contains('rouge') && !bouton.classList.contains('jaune')) {
                bouton.classList.add('boutonjaune')

            }
        })
    })
}

// renitialisé le jeu

restart.addEventListener('click', () => {
    //retirer les classes et les contenu des boutons 
    jeu.forEach(colone => {

        colone.forEach(bouton => {
            bouton.classList.remove('rouge')
            bouton.classList.remove('jaune')

            bouton.innerHTML = ""
            bouton.disabled = false
        })
    })
    player.innerText = "Joueur :"
    vic = 0
    grille.classList.remove('grillerouge')
    grille.classList.remove('grillejaune')
    joueur.innerHTML = "Rouge"
    joueur.classList.add('textrouge')
    joueur.classList.remove('textjaune')
    grille.classList.add('ombrerouge')
    compteur = 0

})






// toute les condition de victoire

function victoire() {

    //test de vérification de colonnes

    for (let i = 0; i <= 6; i++) {
        for (let j = 0; j <= 2; j++) {
            if (jeu[i][j].innerHTML == "  ") {
                if (jeu[i][j].innerHTML == jeu[i][j + 1].innerHTML &&
                    jeu[i][j].innerHTML == jeu[i][j + 2].innerHTML &&
                    jeu[i][j].innerHTML == jeu[i][j + 3].innerHTML) {
                    rougewin()
                }


            } else if (jeu[i][j].innerHTML == "   ") {
                if (jeu[i][j].innerHTML == jeu[i][j + 1].innerHTML &&
                    jeu[i][j].innerHTML == jeu[i][j + 2].innerHTML &&
                    jeu[i][j].innerHTML == jeu[i][j + 3].innerHTML) {

                    jaunewin()
                }
            }
        }
    }

    //test de verification de lignes

    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 5; j++) {
            if (jeu[i][j].innerHTML != "") {
                if (jeu[i][j].innerHTML == jeu[i + 1][j].innerHTML &&
                    jeu[i][j].innerHTML == jeu[i + 2][j].innerHTML &&
                    jeu[i][j].innerHTML == jeu[i + 3][j].innerHTML) {
                    if (jeu[i][j].innerHTML == "  ") {
                        rougewin()
                    } else if (jeu[i][j].innerHTML === "   "){
                        jaunewin()
                    }
                }
            }
        }
    }
    // test de verification des diagonales

    // diagonale montante

    for (let i = 0; i <= 3; i++) {
        for (let j = 5; j >= 3; j--) {
            if (jeu[i][j].innerHTML !== "") {
                if (jeu[i][j].innerHTML === jeu[i + 1][j - 1].innerHTML &&
                    jeu[i][j].innerHTML === jeu[i + 2][j - 2].innerHTML &&
                    jeu[i][j].innerHTML === jeu[i + 3][j - 3].innerHTML) {
                    if (jeu[i][j].innerHTML === "  ") {
                        rougewin()

                    } else if (jeu[i][j].innerHTML === "   ") {
                        jaunewin()
                    }
                }
            }
        }
    }
    //diagonale descendante

    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 2; j++) {
            if (jeu[i][j].innerHTML === jeu[i + 1][j + 1].innerHTML &&
                jeu[i][j].innerHTML === jeu[i + 2][j + 2].innerHTML &&
                jeu[i][j].innerHTML === jeu[i + 3][j + 3].innerHTML) {
                if (jeu[i][j].innerHTML === "  ") {
                    rougewin()

                } else if (jeu[i][j].innerHTML === "   ") {
                    jaunewin()
                }
            }
        }
    }
}

function entrerbouton() {

    jeu.forEach(colone => {
        colone.forEach(bouton => {
            bouton.addEventListener('mouseenter', () => {
                colone.forEach(bouton => {
                    if (bouton.innerHTML == "") {
                        bouton.classList.remove('coloneblanche')
                        bouton.classList.add('coloneblanche')

                    }
                })

            })
        })
    })

}
function sortibouton() {

    jeu.forEach(colone => {
        colone.forEach(bouton => {
            bouton.addEventListener('mouseleave', () => {
                colone.forEach(bouton => {

                    bouton.classList.remove('coloneblanche')
                    blanc = false

                })

            })
        })
    })


}
// fonction de tout le jeu

function game() {

    // faire en sorte que la colonne appartenant au bouton auquel la souris passe devienne blanche
    entrerbouton()
    sortibouton()

    // appliquer un effet au click a tout les boutons en meme temps

    jeu.forEach(colone => {
        colone.forEach(bouton => {



            // crée l'effet du bouton

            bouton.addEventListener('click', () => {

// retirer la classe coloneblanche a tout les bouton lorsque qu'un d'entre eux est appuyer pour eviter les bugs visuel.
                jeu.forEach(colone => {
                    colone.forEach(bouton => {
                        bouton.classList.remove('coloneblanche')
                    })
                })
                blanc = true




                // faire en sorte que le jeu fonctionne uniquement si les condition de victoire ne sont pas respecté

                if (vic === 0) {

                    // faire en sorte que les bouton n'ai pas d'effet si la colonne est remplie

                    if (colone[0].innerHTML === "") {

                        //définir qu'elle jeton doit etre poser a chaque click

                        if (compteur === 0) {
                            colone[0].innerHTML = "  "
                            colone[0].classList.add('rouge')
                            joueur.innerText = "Jaune"
                            joueur.classList.remove('textrouge')
                            joueur.classList.add('textjaune')

                        } else {
                            colone[0].classList.add("jaune")
                            colone[0].innerHTML = "   "
                            joueur.innerText = "Rouge"
                            joueur.classList.remove('textjaune')
                            joueur.classList.add('textrouge')
                        }
                    compteur = 1 - compteur
                    }

                 
                    // appliquer les fonction de gravité de victoire et de delais au boutons

                    gravité(colone)
                    setTimeout(() => {
                        victoire()
                    }, 300)
                    inactif()

                 
                }
            })
        })
    })
}


// lancer le jeu

game()
