fetch('https://ship-site.glitch.me/newestShip')
  .then(response => {
    return response.json()
  })
  .then(data => {
  const recentMessage = data.message
  const image = data.image
  const userName = data.userName
  document.getElementById('root').innerHTML = "<p>" + linkify(recentMessage) +" - " + userName + "</p>" + '<img src="' + image + '"/>'
        
  })
  .catch(err => {
    // Do something for an error here
  })

  function linkify(text) {
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function(url) {
      url = url.split("|")[0]
      return 'a href="' + url + '">' + url + '</a';
    });
}