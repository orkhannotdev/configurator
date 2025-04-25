import { Icon } from '@iconify/react';
import iconStyles from './icon-button.module.css';
import { TIconButton } from './types';

const IconButton = ({ info, isActive, onClick }: TIconButton) => {
  const activeClassName = isActive ? `${iconStyles.iconContainer} ${iconStyles.active}` : iconStyles.iconContainer;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={iconStyles.body} onClick={handleClick}>
      <div className={activeClassName}>
        <Icon icon={info.icon} className={iconStyles.icon} />
      </div>
      <div className={iconStyles.iconLabel}>{info.label}</div>
    </div>
  );
};

export default IconButton;
