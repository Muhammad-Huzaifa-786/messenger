import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, updateDoc, serverTimestamp, query, where, getDocs, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
// import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging.js";


const firebaseConfig = {
    apiKey: "AIzaSyDhg0FtYlmP6L-NRAJG0SRcQseb4KB_xcU",
    authDomain: "message-fa9a7.firebaseapp.com",
    projectId: "message-fa9a7",
    storageBucket: "message-fa9a7.appspot.com",
    messagingSenderId: "29022335407",
    appId: "1:29022335407:web:e0522efadda09c2f523f5a",
    measurementId: "G-65294GXY92"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// const messaging = getMessaging(app);
let imglocal = localStorage.getItem('uploadedFileURL')

window.delchat = delchat
async function delchat(userIdToDelete) {
    // Retrieve users from localStorage

    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "delete your chat!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Delete it!'
    });

    if (result.isConfirmed) {


        let users = localStorage.getItem('users');
        if (users) {
            let alluser = JSON.parse(users);

            // Find the index of the user to delete
            const userIndex = alluser.findIndex(user => user.idofuser === userIdToDelete);

            // Check if user exists
            if (userIndex !== -1) {
                // Remove the user from the array
                alluser.splice(userIndex, 1);

                // Update localStorage
                localStorage.setItem('users', JSON.stringify(alluser));

                // Optionally, you can reload the UI or update the displayed users
                location.reload();
            } else {
                console.error('User not found');
            }
        } else {
            console.error('No users found in localStorage');
        }
    }
}

let currentuserid = '1421895918'


let collectionidofuser = document.getElementById('collectionidofuser')

window.copycollectionid = copycollectionid
function copycollectionid() {
    // Create a range to select the text
    const range = document.createRange();
    const collectionIdElement = document.getElementById("collectionidofuser");

    // Select the collection ID text
    range.selectNode(collectionIdElement);
    window.getSelection().removeAllRanges(); // Clear current selection
    window.getSelection().addRange(range); // Select text
    document.execCommand("copy"); // Copy the selected text
    window.getSelection().removeAllRanges(); // Clear selection

    // Show confirmation dialog
    Swal.fire({
        title: 'Also Copied',
        text: "Do you want to share the ID?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Share it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            // Check if the browser supports the Web Share API
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Sharing Collection ID',
                        text: `${collectionIdElement.innerText}`,
                        // No URL provided here
                    });
                    console.log('ID shared successfully');
                } catch (error) {
                    console.error('Error sharing the ID:', error);
                }
            } else {
                alert('Your browser does not support the Web Share API.');
            }
        }
    });
}


let currentUser = localStorage.getItem('currentUsers')
window.go = go
function go() {
    document.getElementById('chat-history').style.display = 'block'
    document.getElementById('all-chat').style.display = 'none'
}
window.gotoback = gotoback
function gotoback() {
    document.getElementById('chat-history').style.display = 'none'
    document.getElementById('all-chat').style.display = 'block'
}
window.addEventListener('click', function (event) {
    if (event.target.id === 'backButton') {
        gotoback();
    }
    if (event.target.classList.contains('mobile-back-button')) {
        gotoback();
    }
});

window.addNew = addNew
window.addExist = addExist



let alluser = []

let users = localStorage.getItem('users')

if (users !== null) {
    alluser = JSON.parse(users)
}
let div = document.getElementById('all-chat-div');
div.innerHTML = alluser.map(all => {
    return `<div onclick="chooseChat('${all.idofuser}','${all.nameofuser}')" class="styleofdiv">
                ${all.nameofuser}
                <button id='delchat' onclick="delchat('${all.idofuser}'); event.stopPropagation();">Delete</button>
            </div>`;
}).join('');



window.chooseChat = chooseChat
async function addNew() {

    let name = prompt('Enter Name');


    // Check if the name is not null and not empty
    if (name !== null && name.trim() !== '') {
        let id = '';
        for (let i = 0; i < 10; i++) {
            id += Math.floor(Math.random() * 10); // Generates a random digit from 0 to 9
        }


        let arr = {
            nameofuser: name,
            idofuser: id,
        };

        alluser.push(arr);
        localStorage.setItem('users', JSON.stringify(alluser));

        await addDoc(collection(db, id), {
            text: 'Thank You For Start Chating...',
            user: currentUser,
            img: imglocal,
            timestamp: serverTimestamp()
        }).then(() => {
            location.reload();
        });
    } else {
        // Optional: Alert the user that the name cannot be empty
        alert('Name cannot be empty. Please enter a valid name.');
    }
}

console.log(alluser);

function addExist() {
    let name = prompt('Enter Name');
    let collection = prompt('Enter Id');

    // Check if both name and collection are not null or empty
    if (name && collection) {
        let arr = {
            nameofuser: name,
            idofuser: collection
        };

        // Assuming alluser is defined and is an array
        alluser.push(arr);

        // Save to localStorage and then reload
        localStorage.setItem('users', JSON.stringify(alluser));
        location.reload();
    } else {
        alert('Both Name and Id are required.');
    }
}



function chooseChat(usercollection, n) {
    currentuserid = usercollection
    loadMessages();
    go();
    collectionidofuser.innerText = currentuserid
    document.getElementById('nameoftop').innerHTML = n
}



const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');

uploadButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {

        document.getElementById('loader').style.display = 'block';



        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        await addDoc(collection(db, currentuserid), {
            text: messageInput.value.trim(),
            user: currentUser,
            img: imglocal,
            image: imageUrl,
            timestamp: serverTimestamp()
        });

        messageInput.value = '';
        fileInput.value = ''; // Reset file input

        messageInput.style.height = 'auto';

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });

        document.getElementById('loader').style.display = 'none';

        // showCustomNotification()
    }
});

const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const searchInput = document.getElementById('searchInput');
const menuButton = document.getElementById('menuButton');
const menuContainer = document.getElementById('menu');
const searchContainer = document.getElementById('searchContainer');


// Allowed users
window.selectUser = selectUser
function selectUser() {
    let abc = document.getElementById('nameOfUser').value
    if (!abc) {
        Swal.fire('Error', 'Please enter your name.', 'warning');
        return;
    }
    else {

        localStorage.setItem('currentUsers', abc)
        abc = '';
        location.reload()
    }
}

document.getElementById('file--Input').addEventListener('change', handleFileUpload);

async function handleFileUpload(event) {
    const file = event.target.files[0];



    if (!file) {
        Swal.fire('Error', 'No file selected. Please select a file to upload.', 'warning');
        return;
    }

    try {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);

        const imageUrl = await getDownloadURL(storageRef);

        // Save the download URL to local storage
        localStorage.setItem('uploadedFileURL', imageUrl);

    } catch (error) {
        console.error('Upload failed:', error);
        Swal.fire('Error', 'File upload failed.', 'error');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    if (currentUser) {
        if (currentUser) {
            document.getElementById('show').style.display = 'none';
            document.getElementById('none').style.display = 'block';
        } else {
            document.getElementById('show').style.display = 'none';
            document.getElementById('none').style.display = 'none'; // Hide chat UI
            Swal.fire('Access Denied', 'You are not authorized to access this chat.', 'error');
        }
    }
});// Search input event listener
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const messages = document.querySelectorAll('.message');

    messages.forEach(message => {
        const messageText = message.querySelector('.message-text').textContent.toLowerCase();
        // Show messages if the search input is empty or if the message includes the search text
        message.style.display = searchText === '' || messageText.includes(searchText) ? 'block' : 'none';
    });
});

// Menu button event listener
menuButton.addEventListener('click', () => {
    let isVisible = searchContainer.style.display === 'block';

    // Toggle the display of the search container
    searchContainer.style.display = isVisible ? 'none' : 'block';

    // Show or hide the clear button based on visibility
    document.getElementById('clearAllButton').style.display = isVisible ? 'none' : 'block';

    // Ensure the menu container remains visible
    menuContainer.style.display = 'block';

    // Clear the input field if hiding the search container
    if (isVisible) {
        document.getElementById('searchInput').value = ''; // Clear the input field
        // Show all messages since the search is cleared
        const messages = document.querySelectorAll('.message');
        messages.forEach(message => {
            message.style.display = 'block'; // Show all messages
        });
    }
});


// Clear all messages sent by the current user
document.getElementById('clearAllButton').addEventListener('click', async () => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This will delete all your messages!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, clear All !'
    });

    if (result.isConfirmed) {
        const messagesQuery = query(collection(db, currentuserid), where('user', '==', currentUser));
        const querySnapshot = await getDocs(messagesQuery);

        // Delete each message from Firestore
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

    }
});


messageInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = `${Math.min(this.scrollHeight, 100)}px`;
});

messageInput.addEventListener('keydown', async (e) => {
    if (e.key === "Enter") {
        const messageText = messageInput.value.trim();
        if (messageText) {
            await addDoc(collection(db, currentuserid), {
                text: messageText,
                user: currentUser,
                img: imglocal,
                timestamp: serverTimestamp()
            });
            messageInput.value = '';
            messageInput.style.height = 'auto';

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
            // showCustomNotification()
        }
    }
});

sendButton.addEventListener('click', async () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        await addDoc(collection(db, currentuserid), {
            text: messageText,
            user: currentUser,
            img: imglocal,
            timestamp: serverTimestamp()
        });
        messageInput.value = '';
        messageInput.style.height = 'auto';

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
        // showCustomNotification()

    }
});

function formatTimestamp(timestamp) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(timestamp.toDate());
}
async function loadMessages() {
    const messagesQuery = query(collection(db, currentuserid), orderBy('timestamp'));

    onSnapshot(messagesQuery, (querySnapshot) => {
        let messagesHTML = '';

        querySnapshot.forEach((doc) => {
            const message = doc.data();
            const messageClass = message.user === currentUser ? 'self' : 'other';
            const formattedTime = message.timestamp ? formatTimestamp(message.timestamp) : 'Loading...';
            let userDisplay = message.user === currentUser ? message.user + ' (you)' : message.user;
            let im = 'https://cdn-icons-png.flaticon.com/512/8847/8847419.png'
            let imj = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE98pG0B57l9FJsqhpq4R5craliL8gBQykPw&s'
            messagesHTML += `
                <div class="message ${messageClass}" data-id="${doc.id}">
                <div class="cont" >
                <img id="imgsize" 
                 src="${message.img}?${message.img}" 
                 alt="" 
                 onerror="this.onerror=null; this.src='${im}';" />
                <p class="nameofmember">${userDisplay}</p>
                </div>
                    ${message.audio ? `<audio class="audio-message" src="${message.audio}" controls></audio><br>` : ''}
                     ${message.image ? `
        <img class="message-image" 
             src="${message.image}" 
             alt="Message image" 
             onerror="this.onerror=null; this.src='${imj}';" /><br>`
                    : ''}
                    <div class="message-text">${message.text}</div>
                    <div class="bet">
                        <span class="timestamp">${formattedTime}</span>
                        <span>
                            ${message.user === currentUser ? `
                                <button class="edit-button">Edit</button>
                                <button class="delete-button">Delete</button>
                            ` : ''}
                        </span>
                    </div>
                </div>
            `;
        });

        messagesContainer.innerHTML = messagesHTML;

        // Scroll to the bottom of the messages
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });

        // Add delete and edit functionality here
        addMessageActionHandlers();
    });
}
function addMessageActionHandlers() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    const editButtons = document.querySelectorAll('.edit-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const messageDiv = event.target.closest('.message');
            const messageId = messageDiv.getAttribute('data-id');

            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await deleteDoc(doc(db, currentuserid, messageId));
            }
        });
    });

    editButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const messageDiv = event.target.closest('.message');
            const messageId = messageDiv.getAttribute('data-id');
            const messageText = messageDiv.querySelector('.message-text').textContent;

            const { value: newText } = await Swal.fire({
                title: 'Edit your message',
                input: 'text',
                inputValue: messageText,
                showCancelButton: true, 
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!';
                    }
                }
            });

            if (newText) {
                await updateDoc(doc(db, currentuserid, messageId), { text: newText });
            }
        });
    });
}

// Filter messages based on search input
// 
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.querySelector(".close");

// Event listener to open modal on image click
messagesContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('message-image')) {
        modal.style.display = "block";
        modalImage.src = event.target.src; // Set the modal image source to the clicked image
    }
});

// Event listener to close the modal
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Close the modal when clicking outside of the image
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }

})


const recordButton = document.getElementById('recordButton');
const audioPlayer = document.getElementById('audioPlayer');
let mediaRecorder;
let audioChunks = [];

// Check if the browser supports audio recording
recordButton.addEventListener('click', async () => {
    if (!mediaRecorder) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.start();
            recordButton.innerHTML = `<i class="fa-solid fa-microphone-slash"></i>`
            recordButton.classList.add('recording');

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                audioChunks = [];

                recordButton.innerHTML = `<i class="fa-solid fa-microphone">`;
                document.getElementById('loader').style.display = 'block';


                const storageRef = ref(storage, `audio/${Date.now()}.wav`);
                await uploadBytes(storageRef, audioBlob);
                const audioUrl = await getDownloadURL(storageRef);

                await addDoc(collection(db, currentuserid), {
                    text: messageInput.value.trim(),
                    user: currentUser,
                    img: imglocal,
                    audio: audioUrl,
                    timestamp: serverTimestamp()
                });

                messageInput.value = '';
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });

                document.getElementById('loader').style.display = 'none';

                // showCustomNotification()

                mediaRecorder = null;
            };
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                Swal.fire('Permission Denied', 'Please allow microphone access to record audio.', 'error');
            } else {
                console.error(error);
                Swal.fire('Error', 'An error occurred while accessing the microphone.', 'error');
            }
        }
    } else {
        mediaRecorder.stop();
    }
});
messagesContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('audio-message')) {
        const audioUrl = event.target.getAttribute('data-audio-url');

        if (audioUrl) {
            audioPlayer.src = audioUrl;
            audioPlayer.style.display = 'block';

            audioPlayer.play().catch((error) => {
                console.error('Error playing audio:', error);
                Swal.fire('Playback Error', 'Could not play the audio. Please check the file.', 'error');
            });

            audioPlayer.onended = () => {
                audioPlayer.style.display = 'none';
            };
        } else {
            console.warn('No audio URL found');
        }
    }
})

window.bot = bot
function bot() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}