import React from 'react';

const Card = ({
    children,
    className = '',
    hover = false,
    glass = false,
    onClick,
    ...props
}) => {
    const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-300';

    const glassStyles = glass
        ? 'glass-card'
        : 'bg-white shadow-soft';

    const hoverStyles = hover
        ? 'hover:shadow-medium transform hover:-translate-y-1 cursor-pointer'
        : '';

    const combinedClassName = `${baseStyles} ${glassStyles} ${hoverStyles} ${className}`;

    return (
        <div className={combinedClassName} onClick={onClick} {...props}>
            {children}
        </div>
    );
};

export default Card;
