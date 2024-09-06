
 function sendMail(event) {

        event.preventDefault(); // Prevent the default form submission

        const params = {
            from_name: document.getElementById("from_name").value,
            email_id: document.getElementById("email_id").value,
            message: document.getElementById("message").value
        }

        emailjs.send('service_baxasbn', 'template_inepzd8', params).then(
            (response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert("Il messaggio è stato inviato correttamente!");
          }).catch((error) => {
            console.log('FAILED...', error);
            alert("Qualcosa è andato storto...", error, error.text);
          });
        };