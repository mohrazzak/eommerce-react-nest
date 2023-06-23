import BagIcon from './BagIcon';
import CartIcon from './CartIcon';
import HeartIcon from './HeartIcon';
import MenuIcon from './MenuIcon';
import UserIcon from './UserIcon';
import HomeIcon from './HomeIcon';
import QuestionIcon from './QuestionIcon';
import SearchIcon from './SearchIcon';
import CloseIcon from './CloseIcon';

interface Icon {
  icon: JSX.Element;
  id: string;
}
interface Icons {
  [key: string]: Icon;
}

const icons: Icons = {
  BAG: {
    icon: <BagIcon />,
    id: 'BAG',
  },
  CART: {
    icon: <CartIcon />,
    id: 'CART',
  },
  HEART: {
    icon: <HeartIcon />,
    id: 'HEART',
  },
  MENU: {
    icon: <MenuIcon />,
    id: 'MENU',
  },
  USER: {
    icon: <UserIcon />,
    id: 'USER',
  },
  HOME: {
    icon: <HomeIcon />,
    id: 'HOME',
  },
  QUESTION: {
    icon: <QuestionIcon />,
    id: 'QUESTION',
  },
  CLOSE: {
    icon: <CloseIcon />,
    id: 'CLOSE',
  },
  SEARCH: {
    icon: <SearchIcon />,
    id: 'SEARCH',
  },
};
export default icons;
