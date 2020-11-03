const noteToObject = (baseId = 0, inputNote, textNote) => {
   return {
      id: baseId,
      createOn: new Date().toDateString(),
      title: inputNote,
      text: textNote,
   };
};

export default noteToObject;
