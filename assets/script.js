
function saveLink() {
    var linkInput = document.getElementById('linkInput').value;
    
    if (linkInput.startsWith('https://') ^ linkInput.startsWith('www')) {
        var shortLink = generateShortLink(linkInput);
        var links = JSON.parse(localStorage.getItem('savedLocalStg')) || [];
        links.push({ NameInLocalStr: linkInput, NameShortLocalStr: shortLink, id: new Date().getTime() });
        localStorage.setItem('savedLocalStg', JSON.stringify(links));

        console.log(linkInput,shortLink);
        
        displayLinks();

        document.getElementById('linkInput').value = '';
    } else {
        alert('Please enter a valid link starting with https:// or www');
    }
}

function generateShortLink(NameInLocalStr, length = 5) {
    var characters = 'abcdefghijkl12346';
    var randomString = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.random() * characters.length;
        randomString += characters.charAt(randomIndex);
    }
    return NameInLocalStr.substring(0, 25) + randomString;
}
  

function displayLinks(){
    var timeSelect = document.getElementById('timeSelect');
    var selectedTime = parseInt(timeSelect.value);
    var links = JSON.parse(localStorage.getItem('savedLocalStg')) || [];
    var linkList = document.getElementById('linkList');

    linkList.innerHTML = '';

    var now = new Date().getTime();
    links.forEach(linkObj => {
        var timeDifference = (now - linkObj.id) / (1000 * 60);
        if (selectedTime === 0 || timeDifference <= selectedTime) {
            var listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `<a href="${linkObj.NameInLocalStr}" target="_blank">${linkObj.NameShortLocalStr}</a>
            <button class="btn btn-danger btn-sm float-right" onclick="deleteLink(${linkObj.id})">Delete</button>`;
            linkList.appendChild(listItem);
        }
    });
}

function deleteLink(id) {
    var links = JSON.parse(localStorage.getItem('savedLocalStg')) || [];
    links = links.filter(linkObj => linkObj.id !== id);
    localStorage.setItem('savedLocalStg', JSON.stringify(links));
    displayLinks();
}


document.getElementById('timeSelect').addEventListener('change', displayLinks);
displayLinks();
