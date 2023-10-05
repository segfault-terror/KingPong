export type AchievementProps = {
    title: string;
    description: string;
    image: string;
};

export default function Achievement({
    title,
    description,
    image,
}: AchievementProps) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 max-w-sm">
                <h2 className="text-xl text-pink font-bold">{title}</h2>
                <p className="text-xs text-gray-400">{description}</p>
            </div>
            <img src={image} alt={title} />
        </div>
    );
}
