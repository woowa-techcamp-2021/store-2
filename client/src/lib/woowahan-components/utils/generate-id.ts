import { customAlphabet } from 'nanoid';

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const size = 8;
const nanoid = customAlphabet(alphabet, size);

const generateId = (): string => nanoid();

export default generateId;
