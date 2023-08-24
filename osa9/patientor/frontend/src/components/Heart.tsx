import { styled } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';

type HeartProps = 0 | 1 | 2 | 3;

const GreenHeart = styled(FavoriteIcon)({
  color: 'green',
});

const YellowHeart = styled(FavoriteIcon)({
  color: 'yellow',
});

const OrangeHeart = styled(FavoriteIcon)({
  color: 'orange',
});

const RedHeart = styled(FavoriteIcon)({
  color: 'red',
});

const Heart = (props: {num: HeartProps}) => {
  const num = props.num;
  return (
  (() => {
        switch (num) {
          case 0:
            return <GreenHeart />;
          case 1:
            return <YellowHeart />;
          case 2:
            return <OrangeHeart />;
          case 3:
            return <RedHeart />;
          default:
            return <></>;
        }
        }
      )()
      )
};

export default Heart;