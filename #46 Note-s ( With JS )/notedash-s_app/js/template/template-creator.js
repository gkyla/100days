const createItemNote = (note, index) => `
<div class="item">
    <button class="delete-item">X</button>
   <div class="title-item">
      <h1>${note.title}</h1>
   </div>
   <div class="note-item">
      <p>
         ${note.story}
      </p>
   </div>
   <button class="open-edit">Open</button>

   <div class="modal">
      <div class="modal-content">
         <nav class="nav-modal">
            <ul class="nav-modal-links">
               <li class="nav-item-link">
                  <button class="close-modal">&times;</button>
               </li>
               <i class="current-status">Read-Only</i>
               <li class="nav-item-link edit-link">
                  <button class="edit-modal">Edit</button>
               </li>
               <li class="nav-item-link">
                  <button class="save-modal">Save</button>
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
            <div class="edit-box">
               <label for="textarea-modal">Note</label>
               <textarea
                  name="edit-${index}"
                  id="edit-${index}"
                  rows="20"
                  cols="30"
                  wrap="hard"
                  class="edit-text-modal"
                  disabled
               >${note.story}</textarea>
            </div>
         </div>
      </div>
   </div>
</div>
    
`;

export { createItemNote };
