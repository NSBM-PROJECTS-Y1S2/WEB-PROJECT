document.getElementById('profileImage').addEventListener('click', function() {
    document.getElementById('imgInput').click();
});

document.getElementById('imgInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});


document.getElementById('editbtn').addEventListener('click', function() {
    var popupForm = document.getElementById('popupForm');
    var close = document.getElementById('closeButton');
    popupForm.style.display = 'block';
    close.onclick = function() {
        popupForm.style.display = 'none';
    }
});
// document.getElementById('editbtn').addEventListener('click', function() {
//     var popupForm = document.getElementById('popupForm');
//     var close = document.getElementById('closeButton');
//     popupForm.style.display = 'block';
//     close.onclick = function() {
//         popupForm.style.display = 'none';
//     }
// });
