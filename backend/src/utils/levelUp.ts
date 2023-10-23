export function getLevel (level: number, exp: number, expToLevelUp: number){
	if(exp >= expToLevelUp){
		level += 1;
		exp = exp - expToLevelUp;
		expToLevelUp = expToLevelUp * 2;
	}
	return {level, exp, expToLevelUp};
}
