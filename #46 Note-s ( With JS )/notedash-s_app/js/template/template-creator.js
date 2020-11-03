const createItemNote = (note, index) => `
<div class="item" data-id-note="${note.id}">
    <button class="delete-item">X</button>
   <div class="title-item">
      <h1>${note.title}</h1>
   </div>
   <div class="note-item">
      <p>
         ${note.text}
      </p>
   </div>
   <div class="date-item">
      <i>
         ${note.createOn}
      </i>
   </div>
   <button class="open-edit" id="open-edit">Open</button>

   <div class="modal">
      <div class="modal-content">
         <nav class="nav-modal">
            <ul class="nav-modal-links">
               <li class="nav-item-link">
                  <button class="close-modal" id="close-modal">&times;</button>
               </li>
               <i class="current-status">Read-Only</i>
               <li class="nav-item-link edit-link">
                  <button class="edit-modal" id="edit-modal">Edit</button>
               </li>
               <li class="nav-item-link">
                  <button class="save-modal" id="save-modal">Save</button>
               </li>
            </ul>
         </nav>
         <div class="user-note">
            <div class="edit-box">
               <label for="title-modal1">Title</label>
               <input
                  type="text"
                  id="title-modal-${index}"
                  value="${note.title}"
                  class="edit-text-modal"
                  disabled
               />
            </div>
            <div class="edit-box area">
               <label for="textarea-modal">Note</label>
               <textarea
                  name="edit-${index}"
                  id="edit-${index}"
                  rows="12"
                  cols="30"
                  wrap="hard"
                  class="edit-text-modal"
                  disabled
               >${note.text}</textarea>
            </div>
         </div>
      </div>
   </div>
</div>
`;

const CreateEmptyDataTemplate = () => `
   <div class="no-item"> <h1>No Note available 😭</h1> </div>
`;

export { createItemNote, CreateEmptyDataTemplate };
