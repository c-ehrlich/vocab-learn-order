import { styled } from '@mui/material/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  IconButton,
  IconButtonProps,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { IWord } from '../interfaces/IWord';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  word: IWord;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  // TODO the thing below doesn't actually do anything
  // can i put some numbers in my theme to make the card open faster?
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const WordCard = (props: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card sx={{ maxWidth: '100%' }}>
        <CardHeader title={props.word.word} />
        <CardContent>
          <Typography variant='body1' color='text.secondary'>
            {
              props.word.jmdict.join(
                ', '
              ) /* the DB only has words that are in JMDict */
            }
          </Typography>
        </CardContent>
        {/* vvv can add disableSpacing */}
        <CardActions>
          <Link
            href={`https://jisho.org/search/${props.word.word}`}
            underline='none'
          >
            <Button size='medium' variant='contained'>
              Jisho
            </Button>
          </Link>
          <Link
            href={`https://youglish.com/pronounce/${props.word.word}/japanese`}
            color='inherit'
            underline='none'
          >
            <Button size='medium' variant='contained'>
              YouGlish
            </Button>
          </Link>
          <Link
            href={`https://www.immersionkit.com/dictionary?keyword=${props.word.word}`}
            color='inherit'
            underline='none'
          >
            <Button size='medium' variant='contained'>
              ImmersionKit
            </Button>
          </Link>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            {props.word.jlpt && props.word.jlpt.length !== 0 ? (
              <Typography>
                JLPT: {props.word.jlpt.map((item) => item[1]).join(', ')}
              </Typography>
            ) : (
              // TODO make this nicer
              <div>not in JLPT List</div>
            )}
            <Stack direction='row' spacing={1} flexWrap="wrap" justifyContent="flex-start">
              {props.word.animeJDrama && (
                <Chip
                  label={`Anime & J-Drama: ${props.word.animeJDrama}`}
                  color='primary'
                  variant='outlined'
                />
              )}
              {props.word.bccwj && (
                <Chip
                  label={`BCCWJ: ${props.word.bccwj}`}
                  color='primary'
                  variant='outlined'
                />
              )}
              {props.word.innocent && (
                <Chip
                label={`Innocent: ${props.word.innocent}`}
                color='primary'
                variant='outlined'
              />
              )}
              {props.word.kokugojiten && (
                <Chip
                label={`国語辞典: ${props.word.kokugojiten}`}
                color='primary'
                variant='outlined'
              />
              )}
              {props.word.narou && (
                <Chip
                label={`Narou: ${props.word.narou}`}
                color='primary'
                variant='outlined'
              />
              )}
              {props.word.netflix && (
                <Chip
                label={`Netflix: ${props.word.netflix}`}
                color='primary'
                variant='outlined'
              />
              )}
              {props.word.novels && (
                <Chip
                label={`Novels: ${props.word.novels}`}
                color='primary'
                variant='outlined'
              />
              )}
              {props.word.vn && (
                <Chip
                label={`Visual Novels: ${props.word.vn}`}
                color='primary'
                variant='outlined'
              />
              )}
              {props.word.wikipedia && (
                <Chip
                label={`Wikipedia: ${props.word.wikipedia}`}
                color='primary'
                variant='outlined'
              />
              )}
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default WordCard;
