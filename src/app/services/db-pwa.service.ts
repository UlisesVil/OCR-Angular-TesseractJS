import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser';

@Injectable({
  providedIn: 'root'
})
export class DbPwaService {
  private db: any;

  constructor() {
    this.db = new PouchDB('cacheBase');
  }

  holdData(pendingSave){
    this.db.get(pendingSave._id)
      .then((doc:any)=>{
        console.log('[LOCAL]: Image Found and updated');
        delete pendingSave._id;
        doc = Object.assign(doc, pendingSave);
        this.db.put(doc);
    }).catch((err)=>{
      if(err){
        console.log(err);
      };
      this.db.put(pendingSave)
        .then(function () {
          return console.log('[LOCAL]: New local registry was created');
        }).catch(function (err) {
          return console.log(err);
        })
      ;
    });
  }

  public getAll=()=>new Promise((resolve, reject)=>{
    this.db.allDocs({
      include_docs:true,
      attachments:true
    }).then(({rows})=>{
      resolve(rows);
    }).catch(()=>{
      reject(null);
    });
  });

  public clearImgData=(item)=>{
    var id=item._id;
    var rev=item._rev;
    this.db.remove(id, rev, function(err){
      if (err) {
        return console.log(err);
      }else{
        return console.log("Document deleted successfully");
      }
     })
    ;
  }
}
