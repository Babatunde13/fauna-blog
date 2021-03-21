import path from 'path'
import multer from 'multer'

let storage = multer.diskStorage({ 
  destination: function (req, file, cb) { 

      // Uploads is the Upload_folder_name 
      cb(null, "uploads") 
  }, 
  filename:  (req, file, cb) => { 
    cb(null, file.fieldname + "-" + Date.now()+".jpg") 
  } 
}) 
     
// Define the maximum size for uploading 
// picture i.e. 1 MB. it is optional 
const maxSize = 1 * 1000 * 1000; 
  
let upload = multer({  
  storage: storage, 
  limits: { fileSize: maxSize }, 
  fileFilter: (req, file, cb) => { 
  
      // Set the filetypes, it is optional 
      let filetypes = /jpeg|jpg|png/; 
      let mimetype = filetypes.test(file.mimetype); 

      let extname = filetypes.test(path.extname( 
                  file.originalname).toLowerCase()); 
      
      if (mimetype && extname) { 
          return cb(null, true); 
      } 
    
      cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes); 
    }  

// mypic is the name of file attribute 
}).single("mypic");        
