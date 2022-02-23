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
  Typography,
} from '@mui/material';
import { TWord } from '../types/TWord.type';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { COLOR_DARK, COLOR_MID } from '../themes/default';

type Props = {
  word: TWord;
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
    <Card aria-label='word-card' sx={{ maxWidth: '100%' }}>
      <CardHeader
        lang='ja'
        titleTypographyProps={{
          fontFamily: 'Hiragino Kaku Pro, Meiryo',
          fontWeight: 400,
          fontSize: '24pt',
        }}
        title={props.word.word}
      />
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
      <CardActions sx={{ paddingX: 2, paddingBottom: 2 }}>
        <Link
          href={`https://jisho.org/search/${props.word.word}`}
          underline='none'
        >
          <Button
            size='medium'
            variant='outlined'
            sx={{
              backgroundColor: COLOR_DARK,
              color: COLOR_MID,
            }}
          >
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <Chip
              label={
                props.word.jlpt && props.word.jlpt.length !== 0
                  ? `JLPT: ${props.word.jlpt.map((item) => item[1]).join(', ')}`
                  : 'Not in JLPT List'
              }
              color='default'
              variant='outlined'
            />
            {props.word.animeJDrama && (
              <Chip
                label={`Anime & J-Drama: ${props.word.animeJDrama}`}
                color='default'
                variant='outlined'
              />
            )}
            {props.word.bccwj && (
              <Chip
                label={`BCCWJ: ${props.word.bccwj}`}
                color='default'
                variant='outlined'
              />
            )}
            {props.word.innocent && (
              <Chip
                label={`Innocent: ${props.word.innocent}`}
                color='default'
                variant='outlined'
              />
            )}
            {props.word.kokugojiten && (
              <Chip
                lang='ja'
                label={`国語辞典: ${props.word.kokugojiten}`}
                color='default'
                variant='outlined'
              />
            )}
            {props.word.narou && (
              <Chip
                label={`Narou: ${props.word.narou}`}
                color='default'
                variant='outlined'
              />
            )}
            {props.word.netflix && (
              <Chip
                label={`Netflix: ${props.word.netflix}`}
                color='default'
                variant='outlined'
              />
            )}
            {props.word.novels && (
              <Chip
                label={`Novels: ${props.word.novels}`}
                color='default'
                variant='outlined'
              />
            )}
            {props.word.vn && (
              <Chip
                label={`Visual Novels: ${props.word.vn}`}
                color='default'
                variant='outlined'
              />
            )}
            {props.word.wikipedia && (
              <Chip
                label={`Wikipedia: ${props.word.wikipedia}`}
                color='default'
                variant='outlined'
              />
            )}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default WordCard;
