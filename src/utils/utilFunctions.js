import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const userToNickname = (userId) => {
    const config  = {
        dictionaries: [adjectives, colors, animals],
        separator: ' ',
        style: 'capital',
        seed: userId,
      };
      
    const nameFromSeed = uniqueNamesGenerator(config);

    return nameFromSeed;
}

const getUserVote = (voteStatus, ratingId) => {
  let v = voteStatus.find(vote => (vote.ratingId === ratingId));
  if (v === undefined) return 0;
  else return v.score;
}

export {
  userToNickname,
  getUserVote
}