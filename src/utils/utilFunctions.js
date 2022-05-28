import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export default function userToNickname(userId) {
    const config  = {
        dictionaries: [adjectives, colors, animals],
        separator: ' ',
        style: 'capital',
        seed: userId,
      };
      
    const nameFromSeed = uniqueNamesGenerator(config);

    return nameFromSeed;
}