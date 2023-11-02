
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const puppeteer = require('puppeteer');

// midleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/submit', async (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);
  
    try {
      // const browser = await puppeteer.launch();
    
      const browser = await puppeteer.launch({ headless: 'new' });
  
      const page = await browser.newPage();
  
      await page.goto('https://acumens.crm.acumensinc.com/webform/view/652d6d2996eaf5.63189600');
  
      // Fill out the form
      // NOTE: You'll have to replace the selectors with actual ones from the webpage.
      await page.type('#lead_company_name', userInfo.CompanyName); // Replace '#firstNameInput' with actual selector from the CRM form
      await page.type('#lead_firstname', userInfo.userFirstName);
      await page.type('#lead_lastname', userInfo.userLastName);
      await page.type('#lead_email', userInfo.userEmail);
      await page.type('#lead_phone', userInfo.userPhnNo)
  
      // Submit the form
      await page.click('#submitButton');
  
      await browser.close();
  
      res.json({ message: 'Form submitted successfully!' });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})