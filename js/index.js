
let encriptacion = {
    vocal: ["a", "e", "i", "o", "u"],
    cript: ["ai", "enter", "imes", "ober", "ufat"]
}
   

function esLetraMinuscula(texto) {
    if (texto.length !== 1) {
        return false;
    }
    let c = texto.charAt(0);
    if (c === " ") {
        return true;
    }
    if (!/[a-zA-Z]/.test(c)) {
        return false;
    }
    let unicode = c.charCodeAt(0);
    if (unicode < 97 || unicode > 122) {
        return false;
    }
    return c.toLowerCase() === c;
}

let encriptar = () => {
    let texto = document.getElementById('textarea').value
    let arrayEncriptado = [];
    let cortarEjecucion = false
    for (let i = 0; i < texto.length; i ++) {
        let letraEncriptada =  false
        if (esLetraMinuscula(texto[i])) {
            for (let j = 0; j < 5; j++) {
                if (texto[i] === encriptacion.vocal[j]) {
                    arrayEncriptado.push(encriptacion.cript[j]) 
                    letraEncriptada = true
                    break
                }
            }
            if (!letraEncriptada) arrayEncriptado.push(texto[i])
        } else {
            cortarEjecucion = true
            break
        }
    }
    if (!cortarEjecucion) {
        let textoEncriptado = arrayEncriptado.join("")
        return textoEncriptado
    } else {
        return alert('Ingresó una letra mayúscula, un acento o un caracter especial')
    }
}

let desencriptar = () => {
    let texto = document.getElementById('textarea').value
    let arrayDesencriptado = [];
    let cortarEjecucion = false
    for (let i = 0; i < texto.length; i++) {
        let letraEncriptada = false;
        if (esLetraMinuscula(texto[i])) {
            for (let j = 0; j < 5; j++) {
                if (texto[i] === encriptacion.vocal[j]) {
                    let letra = texto[i]
                    let textoRecortado = texto.slice(i,texto.length)
                    if (textoRecortado.startsWith(encriptacion.cript[j])) {
                        arrayDesencriptado.push(texto[i])
                        i += encriptacion.cript[j].length-1
                        letraEncriptada = true
                        break
                    } else {
                        arrayDesencriptado.push(texto[i])
                        letraEncriptada = true
                    }
                }
            }
            if (!letraEncriptada) arrayDesencriptado.push(texto[i])
        } else {
            cortarEjecucion = true
            break
        }
    }
    if (!cortarEjecucion) {
        let textoEncriptado = arrayDesencriptado.join("")
        return textoEncriptado
    } else {
        return alert('Ingresó una letra mayúscula, un acento o un caracter especial')
    }
}
    
let encriptarButton = document.getElementById('button-encriptar')
let outputContainer = document.getElementById('output-container')

encriptarButton.addEventListener("click", () => {
    let result = encriptar()
    if (result !== undefined) {
        outputContainer.innerHTML = `<p id="output-text">${result}</p><div id="copy-container"><div id="copy-button">Copiar</div></div>`
    }
    copiarTexto()
})

let desencriptarButton = document.getElementById('button-desencriptar')

desencriptarButton.addEventListener('click', () => {
    let result = desencriptar()
    if (result !== undefined) {
        outputContainer.innerHTML = `<p id="output-text">${result}</p><div id="copy-container"><div id="copy-button">Copiar</div></div>`
    }
    copiarTexto()
})


function copiarTexto() {
    let copyButton = document.getElementById('copy-button')
let copyText = document.getElementById('output-text')
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(copyText.innerText)
    .then(() => {
        Toastify({
            text: "Copied!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                color: "black",
                background: "linear-gradient(to bottom, #F3F5FC, #D8DFE8)",
            },
            onClick: function () {} // Callback after click
        }).showToast();
    })
    .catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
})
}

