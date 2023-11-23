export type AchievementProps = {
    title: string;
    description: string;
    type: string;
};

export default function Achievement({
    title,
    description,
    type,
}: AchievementProps) {
    let imagePath = '';
    if (type === 'empty') {
        imagePath = `/images/achievements/empty.svg`;
    } else {
        imagePath = `/images/achievements/${title
            .toLocaleLowerCase()
            .split(' ')
            .join('-')}.svg`;
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 max-w-sm">
                <h2 className="text-xl text-pink font-bold">{title}</h2>
                <p className="text-xs text-gray-400">{description}</p>
            </div>
            <img src={imagePath} alt={title} className="select-none" />
        </div>
    );
}
