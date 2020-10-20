import { Client, query as q } from 'faunadb';

const client = new Client({
    secret: 'fnAD4lN6LsACDZCBTVS5LkxWHMSpSTAuDLTImMe7',
});

const handler = async (req, res) => {
    const { handle, password } = req.body;
    // Match user by handle
    const matchedUser = q.Match(q.Index('userByHandle'), handle);
    // Use password to get user secret
    client
        .query(q.Login(matchedUser, { password }))
        .then(({ secret }) => res.send(secret));
};

export default handler;
