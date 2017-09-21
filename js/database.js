//Access to database service
var database = firebase.database();

//Access to reference
var ref = database.ref('poll');

ref.on('value', function(snap) {
    var poll = snap.val();
    getId('b-title').innerHTML = poll.title;
    getId('poll-desc').innerHTML = poll.description;
});

var img = database.ref('Imagenes')
shuffleImg();
function shuffleImg() {
    img.on('value', function(snap) {
        var i = 0;
        var rand = Math.floor(Math.random() * snap.numChildren());
        var rand2 = Math.floor(Math.random() * snap.numChildren());
        while (rand == rand2) {
            rand2 = Math.floor(Math.random() * snap.numChildren());
        }
        snap.forEach(function(e) {
            var icon = e.val();
                if (i == rand) {
                    var label1 = document.createElement('label');
                    label1.innerHTML = '<input type="radio" name="images" value="'+icon.name+'"/><img src="'+icon.url+'">';
                    getId('img1').appendChild(label1);
                }
                if (i == rand2) {
                    var label2 = document.createElement('label');
                    label2.innerHTML = '<input type="radio" name="images" value="'+icon.name+'"/><img src="'+icon.url+'">';
                    console.log(icon.url + 'j = 1');
                    getId('img2').appendChild(label2);
                }
            i++;
        });
    });
}

//Send information to Firebase
getId('vote').addEventListener('click', function() {
    var user = auth.currentUser;
    if (!user) {
        showMessage('You must sign in for vote.', 'log');
        return false;
    }
    var res = getRadioValue('images');
    if (!res) {
        showMessage('You must select your favorite character.', 'log');
        return false;
    }
    var objResult = {
        user: user.displayName,
        answer: res
    };
    var refResult = database.ref('results').child(user.uid);
    refResult.set(objResult)
    .then(function(resp) {
        showMessage('Successful Vote', 'success');
        getId('img1').innerHTML = '';
        getId('img2').innerHTML = '';
        shuffleImg();
    })
    .catch(function(err) {
        showMessage('An error occurred while voting: '+ err, 'error');
    });
});

var results = database.ref('results');
results.on('child_added', function(snap) {
    var entity = snap.val();
    var element = document.createElement('article');
    element.innerHTML = '<b>' + entity.user + '<span> has chosen: </span> </b> <i>' + entity.answer + '</i>';
    preppend(element);
});

results.on('child_changed', function(snap) {
    var entity = snap.val();
    var element = document.createElement('article');
    element.innerHTML = '<b>' + entity.user + '<span> has chosen: </span> </b> <i>' + entity.answer + '</i>';
    preppend(element);
});
