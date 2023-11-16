export function getLevel(level: number, XP: number, nextLevelXP: number) {
    if (XP >= nextLevelXP) {
        level += 1;
        XP = XP - nextLevelXP;
        nextLevelXP = nextLevelXP * 2;
    }
    return { level, XP, nextLevelXP };
}

export function getExpToLevelUp(
    nextLevelXP: number,
    level: number,
    XP: number,
    yourScore: number,
    opponentScore: number,
) {
    let newXP = calculateXp(yourScore, opponentScore, 'medium', XP);
    console.log(level, newXP, nextLevelXP);
    console.log(getLevel(level, newXP, nextLevelXP));
    return getLevel(level, newXP, nextLevelXP);
}

function calculateXp(
    yourScore: number,
    opponentScore: number,
    difficulty: string,
    baseXp: number,
): number {
    const scoreDifference: number = yourScore - opponentScore;
    let scoreBonus: number;
    scoreBonus = Math.floor(Math.abs(scoreDifference) / 2) * 5;
    scoreBonus = scoreBonus < 0 ? 1 : scoreBonus;
    if (scoreDifference >= 6) {
        scoreBonus += 5;
    } else if (scoreDifference >= 4) {
        scoreBonus += 3;
    } else if (scoreDifference >= 2) {
        scoreBonus += 1.5;
    } else {
        scoreBonus += 0;
    }

    let difficultyModifier: number = 4;

    let xp: number = baseXp + scoreBonus * difficultyModifier;

    if (Math.abs(yourScore - opponentScore) <= 2) {
        xp += 5;
    }

    return xp;
}
