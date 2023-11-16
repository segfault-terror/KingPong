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
    if (scoreDifference >= 6) {
        scoreBonus = 25;
    } else if (scoreDifference >= 4) {
        scoreBonus = 20;
    } else if (scoreDifference >= 2) {
        scoreBonus = 15;
    } else {
        scoreBonus = 0;
    }

    let difficultyModifier: number;
    switch (difficulty) {
        case 'easy':
            difficultyModifier = 0.5;
            break;
        case 'medium':
            difficultyModifier = 1.0;
            break;
        case 'hard':
            difficultyModifier = 1.5;
            break;
        default:
            difficultyModifier = 1.0;
            break;
    }

    let xp: number = baseXp + scoreBonus * difficultyModifier;

    if (Math.abs(yourScore - opponentScore) <= 2) {
        xp += 5;
    }

    return xp;
}
