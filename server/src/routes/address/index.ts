import { Router } from 'express';

import { addAddress, getAddress, removeAddress } from 'controllers/address';
import validateToken from 'middlewares/validateToken';
import { addAddressValidation, removeAddressValidation } from 'validation/address';

const router = Router();

router.get('/', validateToken, getAddress);
router.post('/', validateToken, addAddressValidation, addAddress);
router.delete('/', validateToken, removeAddressValidation, removeAddress);

export default router;
