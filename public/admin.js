//My code
//get all the books
//book, title, input, button
//add eventListener to save button to make request to update book
// fetch request

async function main(){
    // Obtain a list of books from the server
    const response = await fetch('http://localhost:3001/listBooks')
    // Parse the obtained list of books
    const books = await response.json()
    // Iterate over the list of books and display each book
    books.forEach(renderBook)
}

function renderBook(book){
    console.log(book)
    const root = document.getElementById('root')
    const li = document.createElement('li')
    li.textContent = book.title
    const input = document.createElement('input')
    // Set the value of the element to the book quantity
    input.value = book.quantity
    // Add an event listener to the element, to update the book quantity 
    input.addEventListener('change', (event) => {
        book.quantity = event.target.value;
  });
  // Create an element to save the book quantity
  const saveButton = document.createElement('button')
  saveButton.textContent = 'Save'
  // Add an event listener to the element, to save the book quantity to the server when clicked
  saveButton.addEventListener('click', () => {
      // Create a request body with the book id and updated quantity
      const body = {
          id: book.id,
          quantity: input.value
       }
      // Send a request to update the book on the server
      fetch('http://localhost:3001/updateBook', {
          method: 'PATCH',
          headers: {
              'content-type' : 'application/json'
          },
          body: JSON.stringify(body)
        })
   })
  li.appendChild(input)
  li.appendChild(saveButton)
  root.appendChild(li) 
}

// Call the main function to start the application
main()
