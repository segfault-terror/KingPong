/*

Calculate expected score:
    Input: ratingA, ratingB
    Output: expectedScore

Get K factor depending on league, there are 3 leagues: Bronze, Silver and Gold
    Bronze: K = 32
    Silver: K = 16
    Gold: K = 8

Calculate new rating for a player, 
    Input: rating, expectedScore, score, K factor
    Output: newRating

*/

export function getExpectedScore(ratingA: number, ratingB: number) {
    return Math.ceil(1 / (1 + Math.pow(10, (ratingB - ratingA) / 400)));
}

export function getKFactor(league: string) {
    switch (league) {
        case 'BRONZE':
            return 32;
        case 'SILVER':
            return 16;
        case 'GOLD':
            return 8;
        default:
            throw new Error('Invalid league');
    }
}

export function getNewRating(
    rating: number,
    expectedScore: number,
    score: 0 | 1,
    kFactor: number,
) {
    return Math.ceil(rating + kFactor * (score - expectedScore));
}
