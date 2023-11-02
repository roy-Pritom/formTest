const express = require('express');
const app = express();
const cors = require('cors');
const puppeteer = require('puppeteer');

// Use environment variable for port or default to 3000
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/submit', async (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);

  try {
    const browser = await puppeteer.launch({
      headless: true,
      // Additional args and options for server environments (you may need to adjust based on your server setup)
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.goto('https://acumens.crm.acumensinc.com/webform/view/652d6d2996eaf5.63189600');

    // Fill out the form
    await page.type('#lead_company_name', userInfo.CompanyName);
    await page.type('#lead_firstname', userInfo.userFirstName);
    await page.type('#lead_lastname', userInfo.userLastName);
    await page.type('#lead_email', userInfo.userEmail);
    await page.type('#lead_phone', userInfo.userPhnNo);

    // Submit the form
    await page.click('#submitButton');

    await browser.close();

    res.json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
