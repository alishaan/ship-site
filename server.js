// server.js
// where your node app starts

// init project
const express = require('express')
const cache = require('apicache').middleware
const cors = require('cors')
const app = express()
const fetch = require('node-fetch');

app.use(cors())

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/newestShip', cache('30 seconds'), (req, res) => {
  const channel = 'C0M8PUPU6'
  const apikey = process.env.SLACK_KEY

  fetch(
    'https://slack.com/api/conversations.history?token=' +
      apikey +
      '&channel=' +
      channel
  )
    .then(response => {
      return response.json()
    })
    .then(data => {
      for (let i = 0; i < data.messages.length; i++) {
        if (data.messages[i].client_msg_id) {
          const recentMessage = data.messages[i].text

          const userCoded = data.messages[i].user
          const messageCoded = data.messages[i].ts

          fetch(
            'https://slack.com/api/users.info?token=' +
              apikey +
              '&user=' +
              userCoded
          )
            .then(response => {
              return response.json()
            })
            .then(data => {
              // data finalized here
              const userName = data.user.profile.display_name
              const image = data.user.profile.image_original
              
              res.json({message: recentMessage, userName: userName, image: image})
            })
            .catch(err => {
              // Do something for an error here
            })
          break
        }
      }
    })
    .catch(err => {
      // Do something for an error here
    })
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port)
})
