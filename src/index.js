document.addEventListener('DOMContentLoaded', function() {
  const baseURL = 'http://localhost:3000/toys'
  const toyCollectionEl = document.querySelector('#toy-collection')
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  function api(){
    return fetch(baseURL)
    .then(response => response.json())
  }


  function getData(){
    api().then(toys => {
      toyCollectionEl.innerHTML = ""
      toys.forEach(toyhash => printToyCard(toyhash))
    })
  }

  function printToyCard(toyhash){
    const toyCard = document.createElement('div')
    toyCard.classList.add(`card`)

    //create elements for the card and append to toyCard
    const toyName = document.createElement('h2')
    toyName.innerText = toyhash.name

    const toyImg = document.createElement('img')
    toyImg.classList.add('toy-avatar')
    toyImg.src = toyhash.image

    const toyLikes = document.createElement('p')
    toyLikes.innerText = toyhash.likes

    const toyLikeButton = document.createElement('button')
    toyLikeButton.classList.add(`like-btn`)
    toyLikeButton.innerText = "Like"

    toyCard.append(toyName, toyImg, toyLikes, toyLikeButton)
    toyCollectionEl.append(toyCard)
    toyLikeButton.addEventListener('click', e => likeToy(toyhash))
  }

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
      toyForm.firstElementChild.addEventListener('submit', createANewToy)
    }
    else {
      toyForm.style.display = 'none'
    }
  })

  function createANewToy(event){
    event.preventDefault()
    const toyName = event.target.elements[0].value
    const toyImage = event.target.elements[1].value
    if (toyName.length > 0 && toyImage.length > 0){
      fetch(`http://localhost:3000/toys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: toyName,
          image: toyImage,
          likes: 0
        })
      })
    }
  }

  function likeToy(toyhash){
    fetch(`http://localhost:3000/toys/${toyhash.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ likes: parseInt(`${toyhash.likes}`) + 1 })
    }).then(getData)
  }



getData()

})
