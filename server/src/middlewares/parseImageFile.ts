import multer from 'multer';

const parseImageFile = multer({}).single('image');

export default parseImageFile;
