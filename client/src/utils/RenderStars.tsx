import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const RenderStars = (rating: number) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      stars.push(<BsStarFill key={i} style={{ color: 'orange' }} />);
    } else if (rating > i) {
      stars.push(<BsStarHalf key={i} style={{ color: 'orange' }} />);
    } else {
      stars.push(<BsStar key={i} style={{ color: 'orange' }} />);
    }
  }

  return stars;
};

export default RenderStars;
