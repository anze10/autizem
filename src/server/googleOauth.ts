import { Google } from 'arctic'
import { getBaseUrl } from './Url';
const url = getBaseUrl();
export const google = new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    url + '/login/google/callback'
)

