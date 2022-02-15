const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
  notes.forEach(note => addNote(note))
}

addBtn.addEventListener('click', () => addNote())

function addNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note')

  note.innerHTML = `
  <div class="tools">
    <i class="fa-solid fa-pen-to-square" id="edit"></i>
    <i class="fa-solid fa-trash" id="delete"></i>
  </div>

  <div class="text ${text ? "" : "hidden"}" id="note-text"></div>
  <textarea class="${text ? "hidden" : ""}" id="textarea" cols="31" rows="14" placeholder="Insert text..."></textarea>
  `

  const editBtn = note.querySelector('#edit')
  const deleteBtn = note.querySelector('#delete')

  const textarea = note.querySelector('#textarea')
  const noteText = note.querySelector('#note-text')

  textarea.value = text
  noteText.innerHTML = marked.parse(text)

  editBtn.addEventListener('click', () => {
    textarea.classList.toggle('hidden')
    noteText.classList.toggle('hidden')
  })

  deleteBtn.addEventListener('click', () => {
    note.remove()

    updateLS()
  })

  textarea.addEventListener('input', (e) => {
    const textValue = e.target.value
    noteText.innerHTML = marked.parse(textValue)

    updateLS()
  })

  document.body.appendChild(note)
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea')

  const notes = []

  notesText.forEach(note => notes.push(note.value))

  localStorage.setItem('notes', JSON.stringify(notes))
}