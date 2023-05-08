const frm = document.querySelector("form")
const dvPalco = document.querySelector("#divPalco")

const quantidadePoltronas = 240

const quantidadeReservadas = []

window.addEventListener("load", () => {
  const ocupadas = localStorage.getItem("cinemaOcupadas") ? localStorage.getItem("cinemaOcupadas").split(";") : []

  for (let i = 1; i <= quantidadePoltronas; i++) {
    const figure = document.createElement("figure")
    const imgStatus = document.createElement("img")

    imgStatus.src = ocupadas.includes(i.toString()) ? "img/ocupada.jpg" : "img/disponivel.jpg"
    imgStatus.className = "poltrona"
    const figureCap = document.createElement("figcaption")

    const zeros = i < 10 ? "00" : i < 100 ? "0" : ""

    const num = document.createTextNode(`[${zeros}${i}]`)

    figureCap.appendChild(num)
    figure.appendChild(imgStatus)
    figure.appendChild(figureCap)

    if (i % 24 == 12) figure.style.marginRight = "60px"
    dvPalco.appendChild(figure)
    if (i % 24 == 0) dvPalco.appendChild(document.createElement("br"))
  }
})

frm.addEventListener("submit", (e) => {
  e.preventDefault()

  const poltrona = Number(frm.inPoltrona.value)

  if (poltrona > quantidadePoltronas) {
    alert(`O número da poltrona solicitada é inválido. Tente outro número.`)
    frm.inPoltrona.focus()
    return
  }

  const ocupadas = localStorage.getItem("cinemaOcupadas") ? localStorage.getItem("cinemaOcupadas").split(";") : []

  if (ocupadas.includes(poltrona.toString())) {
    alert(`A poltrona ${poltrona} já está ocupada. Por favor, selecione outra.`)
    frm.inPoltrona.value = ""
    frm.inPoltrona.focus()
    return
  }

  const imgPoltrona = dvPalco.querySelectorAll("img")[poltrona - 1]
  imgPoltrona.src = "img/reservada.jpg"

  quantidadeReservadas.push(poltrona)
  frm.inPoltrona.value = ""
  frm.inPoltrona.focus()
})

frm.btConfirmar.addEventListener("click", () => {
  if (quantidadeReservadas.length == 0) {
    alert("Não há poltronas reservadas")
    frm.inPoltrona.focus()
    return
  }

  const ocupadas = localStorage.getItem("cinemaOcupadas") ? localStorage.getItem("cinemaOcupadas").split(";") : []

  for (let i = quantidadeReservadas.length; i >= 0; i--) {
    ocupadas.push(quantidadeReservadas[i])

    const imgPoltrona = dvPalco.querySelectorAll("img")[quantidadeReservadas[1] - 1]

    imgPoltrona.src = "img/ocupada.jpg"

    quantidadeReservadas.pop()
  }

  localStorage.setItem("cinemaOcupadas", ocupadas.join(";"))
})