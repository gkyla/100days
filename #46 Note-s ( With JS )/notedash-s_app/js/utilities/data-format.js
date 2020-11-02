const noteToObject = (baseId = 0, inputNote, textNote) => {
   return { id: baseId, title: inputNote, text: textNote };
};

export default noteToObject;
