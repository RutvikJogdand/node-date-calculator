const moment = require('moment');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const chrono = require('chrono-node');

const app = require('express')();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
          <title>Date Calculator</title>
        </head>
        <body style="padding:20px">
          <h1>Date Calculator</h1>
          <form  class="form-control" action="/calculate" method="post">
            <label for="question">Enter your question:</label>
            <input class="form-control" style="width:50%" type="text" name="question" id="question" required>
            <button class="btn btn-primary mt-2" type="submit">Calculate</button>
          </form>
        </body>
      </html>
    `);
  });

app.post('/calculate', (req, res) => {
  const question =  req.body.question;
  
  if (!question) {
    res.end('Please provide a question.');
    return;
  }

  const parsedDate = chrono.parseDate(question);

  if (parsedDate) {
    const responseDate = moment(parsedDate);
    const formattedDate = responseDate.format('YYYY-MM-DD');
    res.send(`Response: ${formattedDate}<br><a href="/">Back to Input</a>`);
  } else {
    res.send('I cannot answer that question.');
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
