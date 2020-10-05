const UserHistory = require('../model/userhistory.model')

exports.saveUserAction = (body, callback) => {
  console.log('saving user action');
    UserHistory.create(body, (error, data)=>{
      if(error) {
        callback({'status': 0 , 'obj': error })
      } else {
        callback({'status': 200 , 'obj': data })
      }
    })
  }


  exports.updateUserAction = (body, callback) => {
    console.log('updaing user action for ', body.id);
    UserHistory.findOneAndUpdate({_id: body.id},{
        $set: body
      }, (error, data)=>{
        if(error) {
            callback({'status': 0 , 'obj': error })
          } else {
            callback({'status': 200 , 'obj': data })
          }
      })
  }

  exports.getUserHisotry = (body, callback) => {
   
    UserHistory.find({}, (error, data)=>{
        if(error) {
            callback({'status': 0 , 'obj': error })
          } else {
            callback({'status': 200 , 'obj': data })
          }
      })
  }

  exports.downloadFile = (attachUrl, pathToStore, payload) => {
    const axios = require('axios')
    return axios.get(attachUrl, {
      method: 'GET',
      responseType: 'stream'
    }).then(response => new Promise((resolve, reject)=>{
      console.log("called download file function to save file into the database");
      let headerLine = response.data.headers['content-disposition']
      headerLine = headerLine.replace(/\"/g, "")
      let filename = headerLine.substring(headerLine.indexOf('=')+1, headerLine.length)
      let ext = headerLine.substring(headerLine.indexOf("\.")+1, headerLine.length)
      payload.filename = filename
      payload.ext = ext
      const fs = require('fs')
      let dir = pathToStore+'/'+ ext
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      console.log("is Directory exist ", fs.existsSync(dir));
      
      const finalPath = dir+'/'+filename
      let writer = fs.createWriteStream(finalPath)
      
      response.data.pipe(writer);
      
      let error = null
      writer.on('error', err=>{
        error = err
        writer.close()
        console.log('got an error')
        resolve({payload: payload, path: null, error: err});
      })

      writer.on('close', () => {
        if (!error) {
          console.log('success')
          resolve({payload: payload, path: finalPath});
        }
      });
    })
   )
  }