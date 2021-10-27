import { DocumentChangeAction } from "@angular/fire/firestore";

interface Item {
  id?: string;
  [key: string]: any;
}

export const extractDocumentChangeActionData = (x: DocumentChangeAction<any>, addId = true): Item | any=> {
  // data proveniente de firebase
  const data = x.payload.doc.data();

  // si viene un id de documento
  if(addId) {
    data.id = x.payload.doc.id;
  }

  return data;
}
