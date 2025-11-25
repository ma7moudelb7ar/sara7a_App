import multer from "multer"
import fs from "node:fs"


export const allowExtension = {
  Image:['application/octet-stream' ,'image/jpeg','image/png','image/jpg','image/gif','image/webp' , "image/x-icon" , "image/bmp"],
  pdf:['application/pdf' , "application/x-pdf"  , "application/pdf"  ],
  video : ["video/mp4" , "video/quicktime"]
  
} 

export const MulterLocal = (customPath , customExtension) => {

  const fullPath =`uploads/${customPath}`
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath , {recursive: true} )
  }
    const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,fullPath )
  },
  filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix + " " + file.originalname	 )
  }
})
function fileFilter (req, file, cb) {

  if (!customExtension.includes(file.mimetype)) {
    
    cb(new Error('Invalid extension'))
  }
   else{
     
     cb(null, true)
   }
}

const upload = multer( {storage,fileFilter} )
    return upload
}
export const MulterHost = (customExtension) => {


    const storage = multer.diskStorage({})
    
function fileFilter (req, file, cb) {

  if (!customExtension.includes(file.mimetype)) {
    
    cb(new Error('Invalid extension'))
  }
   else{
     
     cb(null, true)
   }
}

const upload = multer( {storage,fileFilter} )
    return upload
}