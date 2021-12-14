const CustomImage = ({ src, alt, className, ...props }) => <img {...props} src={src} alt={alt} className={className} />;

export default CustomImage;
