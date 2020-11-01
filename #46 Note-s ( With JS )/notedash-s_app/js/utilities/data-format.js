const noteToObject = (baseId = 0, inputNote, storyNote) => {
   return { id: baseId, title: inputNote, story: storyNote };
};

export default noteToObject;
