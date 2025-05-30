
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBHLbduPITV4s50N6ujzBMpzKumCFlqg",
  authDomain: "agentdashvendormodule.firebaseapp.com",
  databaseURL: "https://agentdashvendormodule-default-rtdb.firebaseio.com",
  projectId: "agentdashvendormodule",
  storageBucket: "agentdashvendormodule.appspot.com",
  messagingSenderId: "169676413407",
  appId: "1:169676413407:web:ea2a12a59198f3a63806ca"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card').forEach(card => {
    const vendorName = card.querySelector('h3').textContent.replace('Vendor: ', '');
    const form = card.querySelector('form');
    const textarea = form.querySelector('textarea');
    const commentContainer = document.createElement('div');
    commentContainer.className = 'posted-comments';
    card.querySelector('.agent-feedback').appendChild(commentContainer);

    // Load existing comments
    db.ref('comments/' + vendorName).on('value', snapshot => {
      const data = snapshot.val();
      commentContainer.innerHTML = '';
      if (data) {
        Object.values(data).forEach(comment => {
          const p = document.createElement('p');
          p.textContent = comment;
          commentContainer.appendChild(p);
        });
      }
    });

    // Submit new comment
    form.addEventListener('submit', e => {
      e.preventDefault();
      const newComment = textarea.value.trim();
      if (newComment) {
        db.ref('comments/' + vendorName).push(newComment);
        textarea.value = '';
      }
    });
  });
});
