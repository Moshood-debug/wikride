const PageHeader = ({
    title,
    description,
}) => {
    return (
        <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-blue">
                Wikride control
            </p>
            <h1 className="text-[28px] leading-tight font-semibold tracking-tight text-primary-accent">
                {title}
            </h1>
            <p className="text-sm text-text-gray">{description}</p>
        </div>
    );
};

export default PageHeader;
