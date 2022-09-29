import '../auth/user.js';
import '../auth/auth.js';

import { getUser } from '../fetch-utils.js';

const user = getUser();
if (!user) {
    location.replace(`../auth`);
}
